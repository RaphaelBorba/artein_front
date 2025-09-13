export const COMMON_LABELS = {
  fullName: "Nome Completo",
  profession: "Profissão",
  birthDate: "Data de Nascimento",
  cep: "CEP",
  address: "Endereço",
  city: "Cidade",
  district: "Bairro",
  state: "Estado",
  phone: "Telefone",
  email: "E-mail",
  indication: "Indicação de",
  payment: "Valor e Forma de Pagamento",
  otherPayment: "Outra Forma de Pagamento",
  paymentMedium: "Meio de Pagamento",
  discount: "Desconto",
  otherDiscounts: "Outros Descontos",
  bankAndInitialDepositDate:
    "Se Possível, Informe-nos o BANCO e a DATA DO DEPÓSITO INICIAL, Assim Como a Data Para Pagamento Das DEMAIS PARCELAS:",
  depositData: "Dados para depósito ou transferência",
  bankAndInitialDepositDateAndInstallments: "Banco e Data do Depósito Inicial / Parcelas",
  alreadyParticipatedInCourse: "Curso Programa de 8 semanas Mindfulness anteriormente realizado em:",
  alreadyParticipatedInCourseIntrodutorio: "Curso Introdutório Mindfulness anteriormente realizado em:",
  paymentChosen: "SELECIONE SUA OPÇÃO DE VALOR E FORMA DE PAGAMENTO ESCOLHIDA:",
  paymentBankAndDate: "Formas de Pagamento (Banco escolhido e data de depósito):",
  paymentMediumLabel: "Meio de Pagamento",
  paymentInstructions: "Instruções de Pagamento e Inscrição:",
  alreadyParticipatedInCourseArtin: "Curso em Mindfulness anteriormente realizado no Arte-in?",
  alreadyParticipatedInCourseOther: "Curso em Mindfulness anteriormente realizado em outra Instituição? Qual?"
};

export const YES_NO_NULL_OPTIONS = [
  { value: "null", label: "---" },
  { value: "Sim", label: "Sim" },
  { value: "Não", label: "Não" },
];

export const PAYMENT_OPTIONS_CURSO_INTRODUTORIO_EM_MINDFULLNESS = [
  { value: "null", label: "---" },
  { value: "R$950 à vista", label: "R$950 à vista" },
  { value: "R$1000,00 em 2 vezes de R$500,00", label: "R$1000,00 em 2 vezes de R$500,00" },
  { value: "R$1005,00 em 3 vezes de R$335,00", label: "R$1005,00 em 3 vezes de R$335,00" },
  { value: "R$1008,00 em 4 vezes de R$252,00", label: "R$1008,00 em 4 vezes de R$252,00" },
  { value: "R$1010,00 em 5 vezes de R$202,00", label: "R$1010,00 em 5 vezes de R$202,00" },
  { value: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$410,00", label: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$410,00" },
];

export const PAYMENT_MEDIUM_OPTIONS_GLOBAL = [
  { value: "null", label: "---" },
  { value: "Cartão de Crédito", label: "Cartão de Crédito" },
  { value: "Cartão de Débito", label: "Cartão de Débito" },
  { value: "Cheque", label: "Cheque" },
  { value: "Depósito Bancário", label: "Depósito Bancário" },
  { value: "Dinheiro", label: "Dinheiro" },
  { value: "Pix", label: "Pix" },
  { value: "Transferência Bancária", label: "Transferência Bancária" },
];

export const DISCOUNT_OPTIONS_GLOBAL = [
  { value: "null", label: "---" },
  {
    value: "Desconto de 10% para sócios da ATC, FBTC e ABRAMIND",
    label: "Desconto de 10% para sócios da ATC, FBTC e ABRAMIND",
  },
  {
    value:
      "Desconto de R$100,00 em qualquer forma de pagamento, caso o participante traga um parete ou amigo para fazer o mesmo curso",
    label:
      "Desconto de R$100,00 em qualquer forma de pagamento, caso o participante traga um parete ou amigo para fazer o mesmo curso",
  },
  { value: "Outra Opção. Qual?", label: "Outra Opção. Qual?" },
];

export const QUESTIONS_PS8_EM_MINDFULLNESS = {
  whyMindfulnessProgram:
    "1. Em poucas palavras, por que você deseja fazer um Programa de Mindfulness (Atenção Plena ou Consciência Plena)?",
  motivationForProgram:
    "2. O que te mobilizou a ingressar especificamente em nosso Programa de Treinamento em Mindfulness?",
  meditationExperience:
    "3. Você possui alguma experiência em práticas de meditação? Caso sim, qual(is)?",
  mindfulnessContact:
    "4. Já teve algum contato com o tema ou experiências Mindfulness (leitura, palestras, vivências etc)? Descreva quais:",
  psychotherapyTreatment:
    "5. Você já realizou algum tipo de tratamento psicoterapêutico ou está atualmente sob os cuidados de algum psicólogo/psiquiatra?Descreva em poucas palavras o que houve ou o que está havendo:",
  specialNeeds:
    "6. Tem alguma necessidade ou cuidado especial? Qual? (Exemplo: cadeirante, dificuldade auditiva, visual etc).",
  expectations:
    "7. Diga-nos suas expectativas em relação a este curso. O que espera?",
};

export const PAYMENT_OPTIONS_PS8_EM_MINDFULLNESS = [
  { value: "null", label: "---" },
  { value: "R$1.100 à vista", label: "R$1.100 à vista" },
  { value: "R$1.200 em 2 vezes de R$600,00", label: "R$1.200 em 2 vezes de R$600,00" },
  { value: "R$1.260 em 3 vezes de R$420,00", label: "R$1.260 em 3 vezes de R$420,00" },
  { value: "R$1.280,00 em 4 VEZES DE R$320,00", label: "R$1.280,00 em 4 VEZES DE R$320,00" },
  { value: "R$1.295,00 em 5 VEZES DE R$255,00", label: "R$1.295,00 em 5 VEZES DE R$255,00" },
  { value: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$420,00", label: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$420,00" },
  { value: "Outros", label: "Outros" },
  { value: "Valor Atualizado 2024 - Descrição ao lado, se à vista ou parcelado, em quantas vezes e valores acordados.", label: "Valor Atualizado 2024 - Descrição ao lado, se à vista ou parcelado, em quantas vezes e valores acordados." },
];

export const QUESTIONS_CURSO_INTRODUTORIO_FORM = {
  whyCourse:
    "1. Por que você deseja fazer este CURSO INTRODUTÓRIO de Mindfulness (Consciência Plena)? O que o/a mobilizou a ingressar neste programa de auto-desenvolvimento?",
  meditationExperience:
    "2. Você possui alguma experiência em práticas de meditação? Caso sim, qual(is)?",
  mindfulnessContact:
    "3. Já teve algum contato com o tema ou experiências Mindfulness (leituras, palestras, vivências etc)? Descreva quais:",
  psychotherapyTreatment:
    "4. Você já realizou algum tipo de tratamento psicoterapêutico ou está atualmente sob os cuidados de algum psicólogo/psiquiatra? Descreva em poucas palavras o que houve ou o que está havendo:",
  specialNeeds:
    "5. Tem alguma necessidade ou cuidado especial? Qual? (Exemplo: cadeirante, dificuldade auditiva, etc).",
  expectations:
    "6. Diga suas expectativas em relação a este curso de Mindfulness (Consciência Plena):",
};

export const QUESTIONS_CURSO_APROFUNDAMENTO_FORM = {
  whyCourse: "1. Descreva, em poucas palavras, por que você deseja fazer este Curso de Aprofundamento em Mindfulness (Consciência Plena)? O que mobilizou-o(a) a ingressar nele?",
  keptTraining: "2. Você manteve seu treino em práticas de Mindfulness (Consciência Plena ou Atenção Plena)? ",
  frequentlyPracticed: "3. Caso sim, quais práticas habitualmente exercitou e em qual frequência, aproximadamente?",
  otherContact: "4. Teve algum outro contato com o tema ou experiências Mindfulness (leituras, palestras, vivências etc)? ",
  otherContactDescription: "5. Caso sim, descreva seus contatos com Mindfulness aqui, mencionando qual(is) foi(ram) sua(s) experiência(s) e local(is) de realização, caso exista(m):",
  psychotherapyTreatment: "6. Você está realizando algum tipo de tratamento psicoterapêutico ou está atualmente sob os cuidados de algum psicólogo/psiquiatra? Descreva em poucas palavras o que houve ou o que está havendo:",
  specialNeeds: "7. Tem alguma necessidade ou cuidado especial? Ou alguma situação de saúde em tratamento? Qual?",
  greatestGain: "8. Diga qual foi o seu maior ganho em despertar e treinar a Atitude de Consciência Plena no Presente até este exato momento? O que mudou em sua vida?",
  expectations: "9. Diga suas expectativas em relação a este curso de Aprofundamento em Mindfulness (Consciência Plena):",
}

export const PAYMENT_OPTIONS_CURSO_APROFUNDAMENTO_MINDFULLNESS = [
  { value: "null", label: "---" }
];

export const QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS = {
  whyCourse: "1. Descreva, em poucas palavras, por que você deseja fazer esta Imersão em Mindfulness (Consciência Plena)? O que mobilizou-o(a) a ingressar nela?",
  keptTraining: "2. Você realiza práticas de Mindfulness (Consciência Plena ou Atenção Plena)? ",
  frequentlyPracticed: "3. Caso sim, quais práticas habitualmente exercitou e em qual frequência, aproximadamente?",
  otherContact: "4. Teve algum outro contato com o tema ou experiências Mindfulness (leituras, palestras, vivências etc)? ",
  otherContactDescription: "5. Caso sim, descreva seus contatos com Mindfulness aqui, mencionando qual(is) foi(ram) sua(s) experiência(s) e local(is) de realização, caso exista(m):",
  psychotherapyTreatment: "6. Você está realizando algum tipo de tratamento psicoterapêutico ou está atualmente sob os cuidados de algum psicólogo/psiquiatra? Descreva em poucas palavras o que houve ou o que está havendo:",
  specialNeeds: "7. Tem alguma necessidade ou cuidado especial? Ou alguma situação de saúde em tratamento? Qual?",
  greatestGain: "8. Diga qual foi o seu maior ganho em despertar e treinar a Atitude de Consciência Plena no Presente até este exato momento? O que mudou em sua vida?",
  expectations: "9. Diga suas expectativas em relação a esta Imersão em Mindfulness (Consciência Plena):",
}

export const QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS = {
  previousActivityArtin: "1. Já participou de alguma atividade no Centro ARTE-In? Se sim, qual atividade e quando?",
  inspiration: "2. O que te inspirou a buscar este Evento?",
  expectations: "3. Qual a sua Expectativa em Relação ao Evento?",
  personalDevelopmentInterests: "4. Tem interesse em frequentar atividades que apoiem o seu desenvolvimento pessoal? Caso sim, quais já realizou em sua vida e quais gostaria de realizar? Por quê?",
  wantsToReceiveInfo: "5. Tem interesse em receber informações sobre nossos cursos de Mindfulness, Alongamento Orgânico, Dança Terapêutica, Manejo Emocional etc.?",
  suggestions: "6. Deseja sugerir algo visando o aprimoramento de nossos serviços e espaço físico?",
  wouldRecommend: "7. Indicaria nossas atividades para alguém? Quem?",
}

export const QUESTIONS_FORMULARIO_AULAS_REGULARES = {
  healthImportantInfo: "1. O que mais considera importante sabermos sobre sua saúde?",
  previousActivityArtin: "2. Já participou de alguma atividade no ARTE-In? Se sim, qual atividade e quando?",
  inspiration: "3. O que te inspirou a buscar essa [s] atividade [s] na qual você se inscreveu como aluno?",
  otherRegularClassInterest: "4. Tem interesse em frequentar alguma outra aula regular? Caso sim, qual? Por que?",
  wantsCourseInfo: "5. Quer receber informações sobre nossos cursos: ",
  suggestions: "6. Deseja sugerir algo visando o aprimoramento de nossos serviços e espaço físico?",
  wouldRecommend: "7. Indicaria nossas atividades para alguém? Quem?",
}

export const QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES = {
  specialNeeds: "Você tem alguma necessidade ou cuidado especial? Qual? (ex.: cadeirante etc):",
  underMedicalCare: "Atualmente, você se encontra sob cuidado Médico?",
  whichMedicalCare: "Quais?",
  underPsychologicalCare: "Atualmente, você se encontra sob cuidado Psicológico?",
  whichPsychologicalCare: "Quais?",
  underPsychiatricCare: "Atualmente, você se encontra sob cuidado Psiquiátrico?",
  whichPsychiatricCare: "Quais?",
}

export const QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS = {
  satisfactionLevel: "Qual Seu Nível de Satisfação Com O Programa De 8 Semanas em Mindfulness?",
  likedMostAndTakeaways: "1. O que você mais gostou e se destacou do programa para você? E o que levará para sua vida?",
  likedLeastSuggestions: "2. O que você menos gostou? E ou não sentiu como útil para você? Sugestões?",
  personalChange: "3. Você experienciou alguma mudança pessoal? Qual(is)?",
  selfDifference: "4. Como você se vê diferente? Como você se sente diferente? O que você está fazendo que seja diferente a partir de seus entendimentos e práticas advindos deste programa?",
  knowledgeMomentsImportance: "5. De que forma você percebe os momentos de conhecimento como favorecedores de seu entendimento acerca de mindfulness? E qual a importância deles para a prática de sua atitude de estar presente na vida?",
  tellAFriend: "6. O que você diria sobre esse programa para um grande amigo?",
  benefits: "7. Quais os benefícios que você obtém ou acredita poder obter a partir de seu exercício da atitude mindfulness na vida?",
  authorizeUse: "8. Você gostaria de autorizar o uso de trechos de sua avaliação para divulgação do curso?",
}

export const SATISFACTION_LEVEL_OPTIONS = [ 
  { value: "null", label: "---" },
  { value: "(1-2) Muito insatisfeito", label: "(1-2) Muito insatisfeito" },
  { value: "(3-4) Insatisfeito", label: "(3-4) Insatisfeito" },
  { value: "(5-6) Meio satisfeito", label: "(5-6) Meio satisfeito" },
  { value: "(7-8) Satisfeito", label: "(7-8) Satisfeito" },
  { value: "(9-10) Muito satisfeito", label: "(9-10) Muito satisfeito" },
]