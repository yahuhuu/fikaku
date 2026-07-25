"use client";

import { useState } from "react";
import { formatRupiahInput, parseRupiahInput } from "@/shared/utils/rupiah-input-format";

type RupiahAmountInputProps = {
  id: string;
  label: string;
  name: string;
  defaultValue?: number | string;
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export function RupiahAmountInput({
  id,
  label,
  name,
  defaultValue = "",
  placeholder = "Rp. 125.000",
  required,
  containerClassName = "lg:col-span-1",
  labelClassName = "text-sm font-medium text-[#000000]",
  inputClassName = "mt-2 w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]",
}: RupiahAmountInputProps) {
  const [digits, setDigits] = useState(parseRupiahInput(String(defaultValue)));
  const formatted = formatRupiahInput(digits);

  return (
    <div className={containerClassName}>
      <label className={labelClassName} htmlFor={id}>{label}</label>
      <input name={name} type="hidden" value={digits} />
      <input
        className={inputClassName}
        id={id}
        inputMode="numeric"
        minLength={required ? 1 : undefined}
        onChange={(event) => setDigits(parseRupiahInput(event.target.value))}
        placeholder={placeholder}
        required={required}
        type="text"
        value={formatted}
      />
    </div>
  );
}
