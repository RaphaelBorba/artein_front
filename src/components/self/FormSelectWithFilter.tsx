/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Option } from "@/types/smallModels";

interface FormSelectWithFilterProps {
  labelText: string;
  idLabel: string;
  options: Option[];
  placeholder?: string;
  field: any;
  labelBold?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export default function FormSelectWithFilter({
  idLabel,
  labelText,
  options,
  placeholder = "Selecione uma opção",
  field,
  labelBold,
  isDisabled,
  className,
}: FormSelectWithFilterProps) {
  const [filter, setFilter] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <FormItem className={className}>
      <FormLabel
        className={`pl-1 ${labelBold ? "font-bold" : ""}`}
        htmlFor={idLabel}
      >
        {labelText}
      </FormLabel>
      <Select
        disabled={isDisabled}
        value={field.value}
        onValueChange={field.onChange}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder="Buscar..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              className="w-full"
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="null">
              Sem resultados
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </FormItem>
  );
}
