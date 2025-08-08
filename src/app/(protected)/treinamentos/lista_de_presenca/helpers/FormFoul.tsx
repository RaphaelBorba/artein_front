"use client";
import { FC } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import FormDatePicker from "@/components/self/FormDatePicker";
import { Button } from "@/components/ui/button";
import { PresenceListSchemaType } from "@/schemas/presenceList/presenceListSchema";

interface FormDateArrayProps {
  form: UseFormReturn<PresenceListSchemaType>;
  readOnly?: boolean;
}

const FormFoul: FC<FormDateArrayProps> = ({ form, readOnly = false }) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "foul",
  });

  return (
    <div className="col-span-full space-y-2">
      <label className="block font-bold">Faltas</label>

      {fields.map((item, idx) => (
        <div key={item.id} className="flex items-end space-x-2">
          <Controller
            control={control}
            name={`foul.${idx}.date`}
            defaultValue={item.date}
            render={({ field }) => (
              <FormDatePicker
                labelText={`Sessão ${idx + 1}`}
                field={field}
                isDisabled={readOnly}
              />
            )}
          />
          {!readOnly && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => remove(idx)}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ))}

      {!readOnly && (
        <Button
          type="button"
          variant="outline"
          className="flex items-center"
          onClick={() => append({ date: new Date() })}
        >
          <Plus size={16} className="mr-1" /> Adicionar data
        </Button>
      )}
    </div>
  );
};

export default FormFoul;
