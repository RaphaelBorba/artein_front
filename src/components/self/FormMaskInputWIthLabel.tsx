/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormItem,
    FormLabel,
    // FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { format, useMask } from "@react-input/mask";

interface FormInputWithLabelI {
    field: any,
    label: string,
    className?: string,
    labelBold?: boolean,
    mask: string,
    isDisabled?: boolean
}

export default function FormMaskInputWithLabel({ field, label, className, labelBold, mask, isDisabled }: FormInputWithLabelI) {

    const options = {
        mask,
        replacement: { _: /\d/ },
    };
    const inputRef = useMask(options);
    const defaultValue = typeof field.value === 'string' && field.value.length > 0
        ? format(field.value, options)
        : '';

    return (
        <FormItem className={className} >
            <FormLabel className={`pl-1 ${labelBold ? "font-bold" : ""}`}>{label}</FormLabel>
            <FormControl>
                <Input disabled={isDisabled} placeholder={mask} {...field} ref={inputRef} value={defaultValue} />
            </FormControl>
            {/* <FormMessage /> */}
        </FormItem>
    )
}