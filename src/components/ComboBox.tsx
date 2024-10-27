"use client";

import React, { useState } from "react";
import { ComboOptionsTypes } from "../types";

interface ComboTypes {
  options: ComboOptionsTypes[];
  onSelect: (value: any) => void;
  defaultMessage?: string;
  id?: string;
  label: string;
  subLabel?: string;
  isDisabled: boolean;
  error?: string;
  showDefault?: boolean;
  value?: any;
  showLabel?: boolean;
}

const ComboBox = ({
  options,
  onSelect,
  defaultMessage = "Select an option",
  id,
  label,
  subLabel,
  isDisabled,
  error,
  showDefault = true,
  value,
  showLabel = true,
}: ComboTypes) => {
  const [selectedOption, setSelectedOption] = useState(value || "");

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const optionStyle = `capitalize bg-white px-2 py-2 hover:bg-primary hover:text-white font-semibold`;

  return (
    <div className="flex flex-col w-full  p-2 rounded-lg">
      {showLabel && (
        <label htmlFor={id} className="text-lg font-semibold text-primary mb-2">
          {label}:{" "}
          {subLabel && (
            <span className="text-sm text-gray-500 ml-1">{subLabel}</span>
          )}
        </label>
      )}
      <div className="relative w-full">
        <select
          value={selectedOption}
          onChange={(e) => handleOptionSelect(e.target.value)}
          className={`
            w-full
            bg-gray-100
            text-gray-800
            rounded-lg
            py-3
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            ${isDisabled ? "bg-gray-200 cursor-not-allowed" : ""}
          `}
          id={id}
          disabled={isDisabled}
        >
          {showDefault && !isDisabled && !value && (
            <option value="" className="text-gray-500">
              {defaultMessage}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={index}
              value={String(option.id)}
              className={optionStyle}
            >
              {option.Name}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
