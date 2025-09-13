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


