"use client";
import { Label } from "../ui/label";
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

interface SelectWithLabelProps {
  labelText: string;
  idLabel: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  value?: string;
}

export default function SelectWithLabel({
  idLabel,
  labelText,
  onValueChange,
  options,
  placeholder = "Selecione uma opção",
  value,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="pl-1 font-bold" htmlFor={idLabel}>
        {labelText}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
