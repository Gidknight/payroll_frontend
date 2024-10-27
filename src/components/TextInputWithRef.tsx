"use client";

import React, { useEffect, useRef } from "react";

interface RefInputTypes {
  type: string;
  placeholder: string;
  customFunc: () => void;
  label: string;
  subLabel: string;
  id: string;
  value: string | number;
}

const TextInputWithRef = ({
  type,
  placeholder,
  customFunc,
  label,
  subLabel,
  id,
  value,
}: RefInputTypes) => {
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.focus();
  }, []);
  return (
    <fieldset className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="capitalize text-lg text-slate-800 font-semibold"
      >
        {label} <span className="text-sm italic font-thin">{subLabel}</span>
      </label>
      <input
        ref={textRef}
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={customFunc}
        autoComplete="false"
        autoCorrect="false"
        autoCapitalize="true"
        required
        className="border-2 rounded-[12px] p-2 w-80 placeholder:capitalize"
      />
    </fieldset>
  );
};

export default TextInputWithRef;
