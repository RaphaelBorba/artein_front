"use client"
import { ChangeEvent } from "react";
import { format, useMask } from '@react-input/mask';
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface InputWithLabelI {
    labelText: string;
    idLabel: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    inputType?: string;
    mask: string;
    value: string;
}

export default function MaskInputWithLabel({
    idLabel,
    labelText,
    onChange,
    mask,
    value
}: InputWithLabelI) {

    const options = {
        mask,
        replacement: { _: /\d/ },
    };
    const inputRef = useMask(options);
    const defaultValue = format(value, options);

    return (
        <div className="flex flex-col gap-2">
            <Label className="pl-1 font-bold" htmlFor={idLabel}>
                {labelText}
            </Label>
            <Input
                ref={inputRef}
                value={defaultValue}
                placeholder={mask}
                onChange={onChange}
            />
        </div>
    );
}
