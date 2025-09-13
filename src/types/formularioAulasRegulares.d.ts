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


