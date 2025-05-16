import { PsychologicalDisorders } from "./smallModels"

export interface Patient {
    id: number

    attendanceType?: string
    attendanceLocation?: string
    familyOfOrigin?: string
    currentFamily?: string
    peopleInHousehold?: number

    previousPsychotherapyTreatment?: boolean
    psychotherapyTreatmentDetails?: string

    pastPsychiatricTreatment?: boolean
    pastPsychiatricTreatmentDate?: Date

    currentPsychiatricTreatment?: boolean
    currentPsychiatricTreatmentStartDate?: Date

    psychiatrist?: string
    psychiatristPhone?: string

    currentMedications?: string
    medicationDiagnosis?: string

    generalMedicalTreatment?: boolean
    generalMedicalTreatmentDetails?: string

    nonPsychiatricMedications?: string

    ongoingLegalProcess?: boolean
    legalProcessDetails?: string

    reasonForSeekingHelp?: string

    psychologicalDisorders: PsychologicalDisorders[]

    observations?: string
    physicalAndMentalDevelopment?: string
    educationalAndProfessionalHistory?: string
    familyAndAffectiveHistory?: string
    patientComplaintHistory?: string
    therapyExpectations?: string
    medicalRecord?: string

    createdAt: Date
    updatedAt: Date
}