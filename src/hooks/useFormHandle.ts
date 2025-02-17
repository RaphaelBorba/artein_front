// src/hooks/useFormHandler.ts
import { unformat } from "@react-input/mask";
import { useState, ChangeEvent } from "react";

export function useFormHandler<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (field: keyof T, mask?: string) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (mask) {
      value = unformat(value, { mask, replacement: { _: /\d/ } });
    }
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const setValue = (field: keyof T, newValue: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: newValue }));
  };

  return { values, handleChange, setValue };
}
