/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectWithLabelProps {
  labelText: string;
  idLabel: string;
  options: Option[];
  placeholder?: string;
  field: any;
  labelBold?: boolean
  isDisabled?:boolean
}

export default function FormSelectWithLabel({
  idLabel,
  labelText,
  options,
  placeholder = "Selecione uma opção",
  field,
  labelBold,
  isDisabled
}: FormSelectWithLabelProps) {
  return (
    <FormItem>
      <FormLabel className={`pl-1 ${labelBold ? 'font-bold' : ''}`} htmlFor={idLabel}>
        {labelText}
      </FormLabel>
      <Select disabled={isDisabled} defaultValue={field.value} onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
}
