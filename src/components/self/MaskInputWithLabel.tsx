"use client"
import { ChangeEvent } from "react";
import { InputMask } from '@react-input/mask';
import { Label } from "../ui/label";

interface InputWithLabelI {
    labelText: string;
    idLabel: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    inputType?: string;
    mask?: string;
}

export default function MaskInputWithLabel({
    idLabel,
    labelText,
    onChange,
    placeholder = "",
    mask,
}: InputWithLabelI) {
    
    return (
        <div className="flex flex-col gap-2">
            <Label className="pl-1 font-bold" htmlFor={idLabel}>
                {labelText}
            </Label>
            <InputMask 
            mask={mask} 
            showMask 
            onChange={onChange} 
            placeholder={placeholder} 
            replacement={{ _: /\d/ }} 
            className="flex h-10 
            rounded-md border border-input bg-background 
            px-3 py-2 text-base ring-offset-background file:border-0 
            file:bg-transparent file:text-sm file:font-medium file:text-foreground 
            placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
        </div>
    );
}
