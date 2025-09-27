// components/CustomSelect.tsx
import React, { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { Check, ChevronDown } from "lucide-react";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string; // required when using Formik
  options: Option[];
  placeholder?: string;
  radius?: "sm" | "md" | "lg" | string;
  className?: string;
  disabled?: boolean;
};

const radiusClass = (r?: string) => {
  switch (r) {
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    default:
      return typeof r === "string" ? r : "rounded-md";
  }
};

export default function CustomSelect({
  name,
  options,
  placeholder = "Select...",
  radius = "md",
  className = "",
  disabled = false,
}: Props) {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((o) => o.value === field.value);

  const setValue = (v: string) => {
    setFieldValue(name, v);
    helpers.setTouched(true);
    setOpen(false);
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((s) => !s);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div className="w-full">
      <div className={`relative inline-block w-full ${className}`} ref={rootRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((s) => !s)}
          onKeyDown={onKeyDown}
          className={`flex items-center justify-between w-full px-3 h-[54px] bg-white border border-[#37137F33] ${radiusClass(
            radius
          )} focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <div className="text-left truncate">
            {selectedOption ? (
              <span className="text-sm">{selectedOption.label}</span>
            ) : (
              <span className="text-sm text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown size={16} />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label={name ?? "custom-select"}
            tabIndex={-1}
            className={`absolute left-0 right-0 mt-2 max-h-56 overflow-auto bg-white border border-[#EAEBED] shadow-md z-50 p-2 ${radiusClass(
              radius
            )}`}
          >
            {options.map((opt) => {
              const active = opt.value === field.value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={active}
                  onClick={() => setValue(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setValue(opt.value);
                    }
                  }}
                  tabIndex={0}
                  className={`flex items-center justify-between gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-md ${
                    active ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 border rounded-full ${
                        active
                          ? "bg-indigo-600 border-indigo-600"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {active && <Check size={12} className="text-white" />}
                    </span>
                    <div className="text-sm">{opt.label}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
} 