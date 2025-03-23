/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

interface FormDatePickerProps {
  labelText: string;
  field: any;
  labelBold?: boolean;
  isDisabled?:boolean
}

export default function FormDatePicker({
  labelText,
  field,
  labelBold,
  isDisabled
}: FormDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormItem className="flex w-full flex-col justify-end">
      <FormLabel className={`pl-1 ${labelBold ? 'font-bold' : ''}`}>{labelText}</FormLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen} >
        <PopoverTrigger asChild disabled={isDisabled}>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                `${format(field.value, "dd/MM/yyyy")}`
              ) : (
                <span>__/__/____</span>
              )}
              <CalendarIcon className="ml-auto size-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={field.value}
            onSelect={(selectedDate) => {
              field.onChange(selectedDate);
            }}
            onDayClick={() => setIsOpen(false)}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            // disabled={(date) =>
            //   Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
            //   Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
            // }
            defaultMonth={field.value}
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
