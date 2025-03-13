import * as z from "zod";

export const generalRegisterSchema = z.object({
  fullName: z.string().min(1, "O nome completo é obrigatório"),
  photo: z.string().optional(),

  personType: z.string().optional(),

  birthDate: z.date().optional(),

  age: z.string().optional(),

  nationality: z.string().optional(),
  placeOfBirth: z.string().optional(),

  maritalStatusId: z.string().optional(),

  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  companyName: z.string().optional(),

  educationLevelId: z.number().int().positive().optional(),

  profession: z.string().optional(),
  workplace: z.string().optional(),
  currentJob: z.string().optional(),

  phoneNumber: z.string().optional(),
  email: z.string().optional(),

  firstContactDate: z.date().optional(),

  cep: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  state: z.string().optional(),
  complement: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),

  religion: z.string().optional(),

  genderId: z.string().optional(),

  status: z.boolean(),
  isPatient: z.boolean(),
  isStudent: z.boolean(),
  interestedInCourses: z.boolean(),

  receiveInfoMethodId: z.string().optional(),
  additionalInfo: z.string().optional(),

  referralSourceId: z.string().optional(),
  otherReferral: z.string().optional(),
  referredByName: z.string().optional(),
});

export type GeneralRegisterSchemaType = z.infer<typeof generalRegisterSchema>;
