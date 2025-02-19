import { CommunicationMethod, EducationLevel, MaritalStatus, ReferralSource } from "./smallModels";

export interface GeneralRegister {
    id: number;
    fullName: string;
    photo?: string | null;
    personType: string; // "pf" or "pj"
    birthDate?: Date | null;
    nationality?: string | null;
    placeOfBirth?: string | null;

    maritalStatusId?: number | null;
    maritalStatus?: MaritalStatus | null; // Define MaritalStatus interface separately

    cpf?: string | null;        // Expected to be 11 characters
    cnpj?: string | null;       // Expected to be 14 characters
    companyName?: string | null;

    educationLevelId?: number | null;
    educationLevel?: EducationLevel | null; // Define EducationLevel interface separately

    profession?: string | null;
    workplace?: string | null;
    currentJob?: string | null;

    phoneNumber?: string | null; // Different formats possible
    email?: string | null;
    firstContactDate?: Date | null;

    cep?: string | null;         // Expected to be 8 characters
    address?: string | null;
    city?: string | null;
    neighborhood?: string | null;
    state?: string | null;
    complement?: string | null;
    country?: string | null;
    countryCode?: number | null;

    religion?: string | null;

    genderId?: number | null;
    gender?: Gender | null; // Define Gender interface separately

    status: boolean;
    isPatient: boolean;
    isStudent: boolean;
    interestedInCourses: boolean;

    receiveInfoMethodId?: number | null;
    receiveInfoMethod?: CommunicationMethod | null; // Define CommunicationMethod interface separately

    additionalInfo?: string | null;

    referralSourceId?: number | null;
    referralSource?: ReferralSource | null; // Define ReferralSource interface separately

    otherReferral?: string | null;
    referredByName?: string | null;

    createdAt: Date;
    updatedAt: Date;
}
