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


