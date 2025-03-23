
export interface GeneralRegister {
    id: string;
    fullName: string;
    photo?: string | undefined;
    personType: string; // "pf" or "pj"
    birthDate?: Date | undefined;
    nationality?: string | undefined;
    placeOfBirth?: string | undefined;

    maritalStatusId?: string | undefined;
    maritalStatus?: MaritalStatus | undefined; // Define MaritalStatus interface separately

    cpf?: string | undefined;        // Expected to be 11 characters
    cnpj?: string | undefined;       // Expected to be 14 characters
    companyName?: string | undefined;

    educationLevelId?: string | undefined;
    educationLevel?: EducationLevel | undefined; // Define EducationLevel interface separately

    profession?: string | undefined;
    workplace?: string | undefined;
    currentJob?: string | undefined;

    phoneNumber?: string | undefined; // Different formats possible
    email?: string | undefined;
    firstContactDate?: Date | undefined;

    cep?: string | undefined;         // Expected to be 8 characters
    address?: string | undefined;
    city?: string | undefined;
    neighborhood?: string | undefined;
    state?: string | undefined;
    complement?: string | undefined;
    country?: string | undefined;
    countryCode?: number | undefined;

    religion?: string | undefined;

    genderId?: string | undefined;
    gender?: Gender | undefined; // Define Gender interface separately

    status: boolean;
    isPatient: boolean;
    isStudent: boolean;
    interestedInCourses: boolean;

    receiveInfoMethodId?: string | undefined;
    receiveInfoMethod?: CommunicationMethod | undefined; // Define CommunicationMethod interface separately

    additionalInfo?: string | undefined;

    referralSourceId?: string | undefined;
    referralSource?: ReferralSource | undefined; // Define ReferralSource interface separately

    otherReferral?: string | undefined;
    referredByName?: string | undefined;

    createdAt: Date;
    updatedAt: Date;
}
