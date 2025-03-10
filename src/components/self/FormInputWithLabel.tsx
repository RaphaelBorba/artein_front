/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormItem,
    FormLabel,
    // FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"

interface FormInputWithLabelI {
    field:any,
    label:string,
    placeholder?:string,
    className?:string,
    labelBold?: boolean
}

export default function FormInputWithLabel({field, label, placeholder, className, labelBold}:FormInputWithLabelI) {

    return (
        <FormItem className={className} >
            <FormLabel className={labelBold ? "font-bold" : ""}>{label}</FormLabel>
            <FormControl>
                <Input placeholder={placeholder} {...field} />
            </FormControl>
            {/* <FormMessage /> */}
        </FormItem>
    )
}