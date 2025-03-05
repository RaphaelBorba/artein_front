import * as z from "zod";

export const generalRegisterSchema = z.object({
  fullName: z.string().min(1, "O nome completo é obrigatório"),
  photo: z.string().optional(),

  personType: z.string().optional(),

  birthDate: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "Data de nascimento inválida" }
  ),

  nationality: z.string().optional(),
  placeOfBirth: z.string().optional(),

  maritalStatusId: z.number().int().positive().optional(),

  cpf: z.string().length(11, "CPF deve ter 11 dígitos").optional(),
  cnpj: z.string().length(14, "CNPJ deve ter 14 dígitos").optional(),
  companyName: z.string().optional(),

  educationLevelId: z.number().int().positive().optional(),

  profession: z.string().optional(),
  workplace: z.string().optional(),
  currentJob: z.string().optional(),

  phoneNumber: z.string().max(15, "Número de telefone inválido").optional(),
  email: z.string().email("E-mail inválido").optional(),

  firstContactDate: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "Data do primeiro contato inválida" }
  ),

  cep: z.string().length(8, "CEP deve ter 8 dígitos").optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  state: z.string().optional(),
  complement: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.number().int().positive().optional(),

  religion: z.string().optional(),

  genderId: z.number().int().positive().optional(),

  status: z.boolean(),
  isPatient: z.boolean(),
  isStudent: z.boolean(),
  interestedInCourses: z.boolean(),

  receiveInfoMethodId: z.number().int().positive().optional(),
  additionalInfo: z.string().optional(),

  referralSourceId: z.number().int().positive().optional(),
  otherReferral: z.string().optional(),
  referredByName: z.string().optional(),
});

export type GeneralRegisterSchemaType = z.infer<typeof generalRegisterSchema>;
