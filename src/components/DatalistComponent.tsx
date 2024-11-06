"use client";
import React, { useEffect, useState } from "react";
import { TitleTypes } from "../types";

interface SearchTypes {
  options: TitleTypes[];
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  setSelection: (option: TitleTypes) => void;
  id: string;
  selection: TitleTypes | null;
}

const DatalistComponent = ({
  options,
  label,
  placeholder,
  setSelection,
  isDisabled,
  id,
  selection,
}: SearchTypes) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = options.find(
      (option) => option.Name === e.target.value
      // || option.id === e.target.value
    );
    if (selectedOption) {
      setSelection(selectedOption);
    }
  };

  useEffect(() => {
    if (selection?.Name) {
      setSelection(selection);
      setSearchTerm(selection?.Name);
    }
  }, []);
  return (
    <div className="flex flex-col items-start w-full p-1">
      <div className="relative w-full">
        <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full">
          {label}:
        </label>
        <input
          list={id}
          value={searchTerm}
          disabled={isDisabled || options.length == 0}
          onChange={handleInputChange}
          onBlur={handleOptionSelect}
          placeholder={placeholder}
          className={`w-full bg-gray1 text-gray-800 rounded-xl border py-3 px-3 focus:outline-primary`}
        />
        <datalist id={id}>
          {options.map((option) => (
            <option key={option.id} value={option.Name || option?.GradeCode}>
              {option.Name || option?.GradeCode}
              {/* {selection?.Name} */}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default DatalistComponent;
