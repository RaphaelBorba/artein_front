/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormItem,
    FormLabel,
    // FormMessage,
} from "@/components/ui/form"
import { HTMLInputTypeAttribute } from "react"
import { Textarea } from "../ui/textarea"

interface FormTextAreaWithLabelI {
    field: any,
    label: string,
    placeholder?: string,
    className?: string,
    labelBold?: boolean,
    isDisabled?: boolean,
    type?: HTMLInputTypeAttribute
}

export default function FormTextAreaWithLabel({ field, label, placeholder, className, labelBold, isDisabled, type }: FormTextAreaWithLabelI) {

    return (
        <FormItem className={className} >
            <FormLabel className={`pl-1 ${labelBold ? "font-bold" : ""}`}>{label}</FormLabel>
            <FormControl>
                <Textarea type={type} placeholder={placeholder} {...field} disabled={isDisabled} />
            </FormControl>
            {/* <FormMessage /> */}
        </FormItem>
    )
}