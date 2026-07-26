import { CourseI } from "./courses";

export interface Lead {
    id: number;
    name: string;
    email?: string | undefined;
    phone?: string | undefined;
    location?: string | undefined;
    shift?: "MANHA" | "TARDE" | "NOITE" | undefined;
    observations?: string | undefined;
    courses?: CourseI[] | undefined;

    createdAt: Date;
    updatedAt: Date;
}
