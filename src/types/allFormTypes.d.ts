export interface FormularioDeAvaI {
  /** Auto-incrementing primary key */
  id: number;

  createdAt?: string;

  fullName?: string;
  birthDate?: string;
  satisfactionLevel?: string;

  likedMostAndHighlights?: string;
  likedLeastDiscomfort?: string;
  personalChange?: string;
  takeHomeCare?: string;
  tellAFriend?: string;
  praiseOrComplaint?: string;
  improvementSuggestions?: string;
  nextTopics?: string;
  wantsInfo?: string;
  preferredMedia?: string;
  authorizeUse?: string;
}

export interface FormularioDeAvaImersaoEmMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  createdAt?: string;

  fullName?: string;
  birthDate?: string;
  satisfactionLevel?: string;

  likedMostAndHighlights?: string;
  likedLeastSuggestions?: string;
  personalChange?: string;
  selfDifference?: string;
  knowledgeMomentsImportance?: string;
  tellAFriend?: string;
  benefitsBeyondPrevious?: string;
  personalPracticeStimulation?: string;
  authorizeUse?: string;
}

export interface FormularioDeAvaliacaoCursoAprofundamentoMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  createdAt?: string;

  fullName?: string;
  birthDate?: string;
  satisfactionLevel?: string;

  likedMostAndHighlights?: string;
  likedLeastSuggestions?: string;
  personalChange?: string;
  selfDifference?: string;
  knowledgeMomentsImportance?: string;
  tellAFriend?: string;
  benefitsBeyondPrevious?: string;
  personalPracticeStimulation?: string;
  authorizeUse?: string;
}

export interface FormularioDeAvaliacaoCursoIntrodutorioMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  createdAt?: string;

  fullName?: string;
  birthDate?: string;
  satisfactionLevel?: string;

  likedMostAndHighlights?: string;
  likedLeastSuggestions?: string;
  personalChange?: string;
  selfDifference?: string;
  knowledgeMomentsImportance?: string;
  tellAFriend?: string;
  benefits?: string;
  authorizeUse?: string;
}

export interface FormularioDeAvaliacaoP8sMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  createdAt?: string;

  fullName?: string;
  birthDate?: string;
  satisfactionLevel?: string;

  likedMostAndTakeaways?: string;
  likedLeastSuggestions?: string;
  personalChange?: string;
  selfDifference?: string;
  knowledgeMomentsImportance?: string;
  tellAFriend?: string;
  benefits?: string;
  authorizeUse?: string;
}

export interface FormularioDeInscricaoEmEventosI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  eventName?: string;
  fullName?: string;
  phone?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  email?: string;
  payment?: string;
  paymentMedium?: string;
  otherPayment?: string;

  previousActivityArtin?: string;
  inspiration?: string;
  expectations?: string;
  personalDevelopmentInterests?: string;
  wantsToReceiveInfo?: string;
  suggestions?: string;
  wouldRecommend?: string;
}

export interface FormularioAulasRegularesI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  regularClasses?: { date: string }[];

  fullName?: string;
  birthDate?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  phone?: string;
  email?: string;
  payment?: string;
  otherPayment?: string;
  paymentMedium?: string;

  specialNeeds?: string;
  underMedicalCare?: string;
  whichMedicalCare?: string;
  underPsychologicalCare?: string;
  whichPsychologicalCare?: string;
  underPsychiatricCare?: string;
  whichPsychiatricCare?: string;

  healthImportantInfo?: string;
  previousActivityArtin?: string;
  inspiration?: string;
  otherRegularClassInterest?: string;
  wantsCourseInfo?: string;
  suggestions?: string;
  wouldRecommend?: string;
}

export interface InscricaoImersaoEmMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  fullName?: string;
  phone?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  email?: string;

  alreadyParticipatedInCourseArtin?: string;
  alreadyParticipatedInCourseOther?: string;

  payment?: string;
  bankAndInitialDepositDate?: string;
  paymentMedium?: string;
  paymentInstructions?: string;
  depositData?: string;

  whyCourse?: string;
  keptTraining?: string;
  frequentlyPracticed?: string;
  otherContact?: string;
  otherContactDescription?: string;
  psychotherapyTreatment?: string;
  specialNeeds?: string;
  greatestGain?: string;
  expectations?: string;
}

export interface CursoAprofundamentoMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  fullName?: string;
  phone?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  email?: string;

  alreadyParticipatedInCourse?: string;
  alreadyParticipatedInCourseIntrodutorio?: string;

  payment?: string;
  paymentMedium?: string;
  bankAndInitialDepositDate?: string;
  paymentInstructions?: string;
  depositData?: string;

  // Questions
  whyCourse?: string;
  keptTraining?: string;
  frequentlyPracticed?: string;
  otherContact?: string;
  otherContactDescription?: string;
  psychotherapyTreatment?: string;
  specialNeeds?: string;
  greatestGain?: string;
  expectations?: string;
}

export interface CursoIntrodutorioMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  fullName?: string;
  profession?: string;
  birthDate?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  phone?: string;
  email?: string;
  indication?: string;
  payment?: string;
  otherPayment?: string;
  paymentMedium?: string;
  discount?: string;
  otherDiscounts?: string;
  bankAndInitialDepositDate?: string;
  depositData?: string;
  whyCourse?: string;
  meditationExperience?: string;
  mindfulnessContact?: string;
  psychotherapyTreatment?: string;
  specialNeeds?: string;
  expectations?: string;
}

export interface P8sEmMindfulnessI {
  /** Auto-incrementing primary key */
  id: number;

  /** ISO date string */
  createdAt?: string;

  fullName?: string;
  profession?: string;
  birthDate?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  phone?: string;
  email?: string;
  indication?: string;

  payment?: string;
  otherPayment?: string;
  paymentMedium?: string;
  discount?: string;
  otherDiscounts?: string;
  bankAndInitialDepositDate?: string;
  depositData?: string;

  whyMindfulnessProgram?: string;
  motivationForProgram?: string;
  meditationExperience?: string;
  mindfulnessContact?: string;
  psychotherapyTreatment?: string;
  specialNeeds?: string;
  expectations?: string;
}

// Slug aliases for easier imports in other apps
export type formulario_de_ava = FormularioDeAvaI;
export type formulario_de_ava_imersao_em_mindfulness = FormularioDeAvaImersaoEmMindfulnessI;
export type formulario_de_avaliacao_curso_aprofundamento_em_mindfulness = FormularioDeAvaliacaoCursoAprofundamentoMindfulnessI;
export type formulario_de_avaliacao_curso_introdutorio_mindfulness = FormularioDeAvaliacaoCursoIntrodutorioMindfulnessI;
export type formulario_de_avaliacao_p8s_mindfulness = FormularioDeAvaliacaoP8sMindfulnessI;
export type formulario_de_inscricao_em_eventos = FormularioDeInscricaoEmEventosI;
export type formulario_aulas_regulares = FormularioAulasRegularesI;
export type inscricao_imersao_em_mindfulness = InscricaoImersaoEmMindfulnessI;
export type curso_aprofundamento_mindfulness = CursoAprofundamentoMindfulnessI;
export type curso_introdutorio_mindfulness = CursoIntrodutorioMindfulnessI;
export type p8s_em_mindfulness = P8sEmMindfulnessI;


