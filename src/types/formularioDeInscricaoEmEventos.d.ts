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


