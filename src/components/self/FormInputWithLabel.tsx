/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormItem,
    FormLabel,
    // FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { HTMLInputTypeAttribute } from "react"

interface FormInputWithLabelI {
    field: any,
    label: string,
    placeholder?: string,
    className?: string,
    labelBold?: boolean,
    isDisabled?: boolean,
    type?: HTMLInputTypeAttribute
}

export default function FormInputWithLabel({ field, label, placeholder, className, labelBold, isDisabled, type }: FormInputWithLabelI) {

    return (
        <FormItem className={className} >
            <FormLabel className={`pl-1 ${labelBold ? "font-bold" : ""}`}>{label}</FormLabel>
            <FormControl>
                <Input type={type} placeholder={placeholder} {...field} disabled={isDisabled} />
            </FormControl>
            {/* <FormMessage /> */}
        </FormItem>
    )
}