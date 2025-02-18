import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputWithLabelI {
  labelText: string;
  idLabel: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputType?: string;
  value:string;
}

export default function InputWithLabel({
  idLabel,
  labelText,
  onChange,
  placeholder = "",
  inputType = "text",
  value
}: InputWithLabelI) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="pl-1 font-bold" htmlFor={idLabel}>
        {labelText}
      </Label>
        <Input
          type={inputType}
          id={idLabel}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
    </div>
  );
}
