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

}

export default function FormInputWithLabel({field, label, placeholder}:FormInputWithLabelI) {

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input placeholder={placeholder} {...field} />
            </FormControl>
            {/* <FormMessage /> */}
        </FormItem>
    )
}