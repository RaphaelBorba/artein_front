#!/usr/bin/env bash
# Deploy do frontend (Next.js).
#
# Executado pelo GitHub Actions como o usuário DONO do site, via
#   sudo -n -u angelicaborba-artein /usr/local/sbin/artein-deploy-front.sh
# Nenhuma etapa roda como root: npm e pm2 usam o mesmo usuário que já roda o front.
#
# Instalar em /usr/local/sbin (dono root, modo 755) -- ver CICD_SETUP.md.
# O usuário de deploy consegue executar este arquivo, mas não alterá-lo.
#
# O build acontece no GitHub; aqui só se troca o .next e reinicia o PM2,
# o que evita estourar a memória da VPS com `next build`.
set -euo pipefail

APP_USER=angelicaborba-artein
STAGE=/srv/artein-deploy/front
APP=/home/angelicaborba-artein/htdocs/artein.angelicaborba.com
PM2_NAME=nextjs-front
HEALTH_URL=http://127.0.0.1:3000/login

export HOME=/home/angelicaborba-artein
export PATH=/usr/local/bin:/usr/bin:/bin

[ "$(id -un)" = "$APP_USER" ] || { echo "Este script deve rodar como $APP_USER" >&2; exit 1; }
[ -f "$STAGE/.next/BUILD_ID" ] || { echo "Release incompleta em $STAGE" >&2; exit 1; }

exec 9>/tmp/artein-deploy-front.lock
flock -n 9 || { echo "Outro deploy do frontend em andamento" >&2; exit 1; }

# Falha cedo, antes de alterar qualquer arquivo, se o processo não estiver no PM2 deste usuário.
if ! pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  echo "Processo '$PM2_NAME' não encontrado no PM2 de $APP_USER. Nada foi alterado." >&2
  exit 1
fi

cd "$APP"

echo "==> Atualizando manifestos, config e public"
need_install=1
if cmp -s "$STAGE/package-lock.json" "$APP/package-lock.json" && [ -f "$APP/node_modules/.deploy-ok" ]; then
  need_install=0
fi
install -m 644 "$STAGE/package.json" "$STAGE/package-lock.json" "$STAGE/next.config.ts" "$APP/"
if [ -d "$STAGE/public" ]; then
  rsync -rlt --delete "$STAGE/public/" "$APP/public/"
fi

echo "==> Dependências"
if [ "$need_install" = 1 ]; then
  rm -f "$APP/node_modules/.deploy-ok"
  # Instala também as devDependencies: o next.config.ts precisa de typescript.
  # --ignore-scripts: scripts de instalação de terceiros não rodam.
  npm ci --no-audit --no-fund --ignore-scripts
  touch "$APP/node_modules/.deploy-ok"
else
  echo "package-lock.json inalterado, pulando npm ci"
fi

echo "==> Trocando .next (backup em .next.prev)"
rm -rf "$APP/.next.prev"
if [ -d "$APP/.next" ]; then mv "$APP/.next" "$APP/.next.prev"; fi
rsync -rlt "$STAGE/.next/" "$APP/.next/"

echo "==> Reiniciando $PM2_NAME"
pm2 restart "$PM2_NAME" --update-env
pm2 save

echo "==> Health check ($HEALTH_URL)"
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null "$HEALTH_URL"; then
    echo "Deploy OK"
    exit 0
  fi
  sleep 3
done

echo "!! Health check falhou, revertendo .next" >&2
if [ -d "$APP/.next.prev" ]; then
  rm -rf "$APP/.next"
  mv "$APP/.next.prev" "$APP/.next"
  pm2 restart "$PM2_NAME" --update-env
fi
exit 1
