#!/usr/bin/env bash
# Deploy do frontend (Next.js). Executado como root via `sudo` pelo GitHub Actions.
#
# Instalar em /usr/local/sbin (dono root, modo 755) -- ver CICD_SETUP.md.
# Este arquivo NÃO deve ser editável pelo usuário de deploy: ele é a fronteira
# entre "quem faz upload da release" e "quem tem permissão de root".
#
# O build acontece no GitHub; aqui só se troca o .next e reinicia o PM2,
# o que evita estourar a memória da VPS com `next build`.
set -euo pipefail

STAGE=/home/artein-deploy/releases/front
APP=/home/angelicaborba-artein/htdocs/artein.angelicaborba.com
PM2_NAME=nextjs-front
HEALTH_URL=http://127.0.0.1:3000/login
STATE_DIR=/var/lib/artein-deploy

export HOME=/root
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[ -f "$STAGE/.next/BUILD_ID" ] || { echo "Release incompleta em $STAGE" >&2; exit 1; }

mkdir -p "$STATE_DIR"
exec 9>/var/lock/artein-deploy-front.lock
flock -n 9 || { echo "Outro deploy do frontend em andamento" >&2; exit 1; }

cd "$APP"

echo "==> Atualizando manifestos, config e public"
install -m 644 -o root -g root \
  "$STAGE/package.json" "$STAGE/package-lock.json" "$STAGE/next.config.ts" "$APP/"
if [ -d "$STAGE/public" ]; then
  rsync -rlt --delete --chown=root:root "$STAGE/public/" "$APP/public/"
fi

echo "==> Dependências"
new_hash=$(sha256sum "$APP/package-lock.json" | cut -d' ' -f1)
old_hash=$(cat "$STATE_DIR/front.lock.sha256" 2>/dev/null || true)
if [ "$new_hash" != "$old_hash" ] || [ ! -d "$APP/node_modules" ]; then
  # Instala também as devDependencies: o next.config.ts precisa de typescript.
  # --ignore-scripts: scripts de instalação de terceiros não rodam como root.
  npm ci --no-audit --no-fund --ignore-scripts
  echo "$new_hash" > "$STATE_DIR/front.lock.sha256"
else
  echo "package-lock.json inalterado, pulando npm ci"
fi

echo "==> Trocando .next (backup em .next.prev)"
rm -rf "$APP/.next.prev"
if [ -d "$APP/.next" ]; then mv "$APP/.next" "$APP/.next.prev"; fi
rsync -rlt --chown=root:root "$STAGE/.next/" "$APP/.next/"

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
