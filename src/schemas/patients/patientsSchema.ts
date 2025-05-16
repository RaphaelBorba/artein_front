import * as z from "zod";
import { generalRegisterSchema } from "../generalRegister/generalRegisterSchema";

const patientSchema = z.object({
    attendanceType: z.string().optional(),
    attendanceLocation: z.string().optional(),
    familyOfOrigin: z.string().optional(),
    currentFamily: z.string().optional(),

    peopleInHousehold: z.string().optional(),

    previousPsychotherapyTreatment: z.string().optional(),
    psychotherapyTreatmentDetails: z.string().optional(),

    pastPsychiatricTreatment: z.string().optional(),
    pastPsychiatricTreatmentDate: z.date().optional(),

    currentPsychiatricTreatment: z.string().optional(),
    currentPsychiatricTreatmentStartDate: z.date().optional(),

    psychiatrist: z.string().optional(),
    psychiatristPhone: z.string().optional(),

    currentMedications: z.string().optional(),
    medicationDiagnosis: z.string().optional(),

    generalMedicalTreatment: z.string().optional(),
    generalMedicalTreatmentDetails: z.string().optional(),

    nonPsychiatricMedications: z.string().optional(),

    ongoingLegalProcess: z.string().optional(),
    legalProcessDetails: z.string().optional(),

    reasonForSeekingHelp: z.string().optional(),

    psychologicalDisorders: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })).optional(),

    observations: z.string().optional(),
    physicalAndMentalDevelopment: z.string().optional(),
    educationalAndProfessionalHistory: z.string().optional(),
    familyAndAffectiveHistory: z.string().optional(),
    patientComplaintHistory: z.string().optional(),
    therapyExpectations: z.string().optional(),
    medicalRecord: z.string().optional(),
});

export const patientWithGeneralSchema = generalRegisterSchema.merge(patientSchema)

export type PatientWithGeneralSchemaType = z.infer<typeof patientWithGeneralSchema>;
