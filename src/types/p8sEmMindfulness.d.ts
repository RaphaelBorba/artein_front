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


