/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import { HTMLInputTypeAttribute } from "react";

type FieldType = "input" | "mask" | "select" | "textarea" | "date";

interface OptionItem {
    value: string;
    label: string;
}

interface BaseFieldConfig<TValues> {
    name: keyof TValues & string;
    label: string;
    className?: string;
    labelBold?: boolean;
    alwaysDisabled?: boolean;
}

interface InputFieldConfig<TValues> extends BaseFieldConfig<TValues> {
    type: "input";
    inputType?: HTMLInputTypeAttribute;
    placeholder?: string;
}

interface MaskFieldConfig<TValues> extends BaseFieldConfig<TValues> {
    type: "mask";
    mask: string;
    placeholder?: string;
}

interface SelectFieldConfig<TValues> extends BaseFieldConfig<TValues> {
    type: "select";
    options: OptionItem[];
    idLabel?: string;
    placeholder?: string;
    observation?: string;
}

interface TextAreaFieldConfig<TValues> extends BaseFieldConfig<TValues> {
    type: "textarea";
    placeholder?: string;
    startHeight?: number | string;
}

interface DateFieldConfig<TValues> extends BaseFieldConfig<TValues> {
    type: "date";
    isNextToTextarea?: boolean;
}

export type FieldConfig<TValues> =
    | InputFieldConfig<TValues>
    | MaskFieldConfig<TValues>
    | SelectFieldConfig<TValues>
    | TextAreaFieldConfig<TValues>
    | DateFieldConfig<TValues>;

interface FormBuilderProps<TValues extends FieldValues> {
    form: UseFormReturn<TValues>;
    fields: FieldConfig<TValues>[];
    readOnly?: boolean;
}

// Helper to check if a field value is empty
const isFieldEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "" || value === "null";
    if (value instanceof Date) return false;
    if (Array.isArray(value)) return value.length === 0;
    return false;
};

const FormBuilder = <TValues extends FieldValues>({ form, fields, readOnly = false }: FormBuilderProps<TValues>) => {
    return (
        <>
            {fields.map((fieldConfig) => (
                <FormField
                    key={fieldConfig.name}
                    control={form.control as any}
                    name={fieldConfig.name as any}
                    render={({ field }) => {
                        const isDisabled = readOnly || fieldConfig.alwaysDisabled === true;
                        const labelBold = fieldConfig.labelBold ?? true;
                        const isEmpty = isFieldEmpty(field.value);

                        // Wrapper div with data-empty attribute for print styling
                        const wrapperClass = `print-field ${fieldConfig.className || ""} ${isEmpty ? "print-empty" : ""}`.trim();

                        if (fieldConfig.type === "input") {
                            return (
                                <div className={wrapperClass} data-empty={isEmpty}>
                                    <FormInputWithLabel
                                        field={field}
                                        label={fieldConfig.label}
                                        labelBold={labelBold}
                                        isDisabled={isDisabled}
                                        type={fieldConfig.inputType}
                                        placeholder={fieldConfig.placeholder}
                                    />
                                </div>
                            );
                        }

                        if (fieldConfig.type === "mask") {
                            return (
                                <div className={wrapperClass} data-empty={isEmpty}>
                                    <FormMaskInputWithLabel
                                        field={field}
                                        label={fieldConfig.label}
                                        labelBold={labelBold}
                                        isDisabled={isDisabled}
                                        mask={(fieldConfig as MaskFieldConfig<TValues>).mask}
                                    />
                                </div>
                            );
                        }

                        if (fieldConfig.type === "select") {
                            const cfg = fieldConfig as SelectFieldConfig<TValues>;
                            return (
                                <div className={wrapperClass} data-empty={isEmpty}>
                                    <FormSelectWithLabel
                                        field={field}
                                        labelText={cfg.label}
                                        labelBold={labelBold}
                                        isDisabled={isDisabled}
                                        idLabel={cfg.idLabel ?? ""}
                                        options={cfg.options}
                                        observation={cfg.observation}
                                    />
                                </div>
                            );
                        }

                        // textarea
                        if (fieldConfig.type === "textarea") {
                            const cfg = fieldConfig as TextAreaFieldConfig<TValues>;
                            return (
                                <div className={wrapperClass} data-empty={isEmpty}>
                                    <FormTextAreaWithLabel
                                        field={field}
                                        label={cfg.label}
                                        labelBold={labelBold}
                                        isDisabled={isDisabled}
                                        placeholder={cfg.placeholder}
                                        startHeight={cfg.startHeight}
                                    />
                                </div>
                            );
                        }

                        // date
                        if (fieldConfig.type === "date") {
                        }
                        const cfg = fieldConfig as DateFieldConfig<TValues>;
                        return (
                            <div className={`print-field flex ${wrapperClass}`} data-empty={isEmpty}>
                                <FormDatePicker
                                    labelText={cfg.label}
                                    field={field}
                                    labelBold={labelBold}
                                    isDisabled={isDisabled}
                                    isNextToTextarea={(cfg as DateFieldConfig<TValues>).isNextToTextarea}
                                />
                            </div>
                        );
                    }}
                />
            ))}
        </>
    );
};

export default FormBuilder;


