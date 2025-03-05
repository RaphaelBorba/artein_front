"use client"
import Section from "@/components/self/Section";
import { generalRegisterSchema, GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";

export default function GeneralRegisterForm() {
    
    const form = useForm<GeneralRegisterSchemaType>({
        resolver: zodResolver(generalRegisterSchema),
        defaultValues: {
            photo: "",
            fullName: "",
            personType: "",
            birthDate: "",
            nationality: "",
            placeOfBirth: "",
            maritalStatusId: undefined,
            cpf: "",
            cnpj: "",
            companyName: "",
            educationLevelId: undefined,
            profession: "",
            workplace: "",
            currentJob: "",
            phoneNumber: "",
            email: "",
            firstContactDate: "",
            cep: "",
            address: "",
            complement: "",
            city: "",
            neighborhood: "",
            state: "",
            country: "",
            countryCode: undefined,
            religion: "",
            genderId: undefined,
            status: false,
            isPatient: false,
            isStudent: false,
            interestedInCourses: false,
            receiveInfoMethodId: undefined,
            additionalInfo: "",
            referralSourceId: undefined,
            otherReferral: "",
            referredByName: ""
        },
    })

    console.log(form.formState.errors)

    function onSubmita(values: GeneralRegisterSchemaType) {
        console.log(values)
    }

    return (
        <Section title="Cadastro Geral">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmita)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormInputWithLabel
                            field={field}
                            label="Nome Completo"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                            <FormInputWithLabel
                            field={field}
                            label="Nome Completo"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormInputWithLabel
                            field={field}
                            label="Nome Completo"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormInputWithLabel
                            field={field}
                            label="Nome Completo"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                            <FormInputWithLabel
                            field={field}
                            label="Nome Completo"
                            />
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Section>
    )
}

