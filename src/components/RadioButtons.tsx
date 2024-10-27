"use client";

import React from "react";
import { SmallUnitTypes } from "../types";

interface RadioButtonsTypes {
  title: string;
  secondLabel: string;
  options: SmallUnitTypes[];
  selected: { id: number; price: number } | null; // Only one selected item at a time
  setSelected: (value: { id: number; price: number } | null) => void;
}

const RadioButtons = ({
  title,
  options,
  selected,
  secondLabel,
  setSelected,
}: RadioButtonsTypes) => {
  // Handles selecting the radio button
  const handleSelect = (optionId: number) => {
    const isSelected = selected?.id === optionId;

    if (isSelected) {
      // Unselect if the same option is clicked again (optional behavior)
      setSelected(null);
    } else {
      // Select the new option and set price to 0
      setSelected({ id: optionId, price: 0 });
    }
  };

  // Handles setting price for selected items
  const handleSetPrice = (optionId: number, price: number) => {
    if (selected?.id === optionId) {
      setSelected({ ...selected, price });
    }
  };

  return (
    <div className="flex flex-col items-start md:justify-start w-full p-1 rounded-xl shadow-lg">
      <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
        {title}
      </label>
      {options?.length > 0 &&
        options.map((option) => {
          const isSelected = selected?.id === option.id;
          return (
            <div
              key={option.id}
              className="w-full flex flex-row items-center justify-start gap-5 py-1 px-2 bg-slate-100"
            >
              <label
                htmlFor={`radio-${option.id}`}
                className="text-primary capitalize"
              >
                {option.name}:{" "}
              </label>
              <input
                type="radio"
                id={`radio-${option.id}`} // Unique ID for each radio button
                checked={isSelected} // Control checked state
                onChange={() => handleSelect(option.id)} // Toggle selected state
              />
              {isSelected && (
                <div className="space-x-3 flex flex-row">
                  <p>{"==>"}</p>
                  <label className="text-primary capitalize">
                    {secondLabel}:
                  </label>
                  <input
                    type="number"
                    className="p-2 rounded-xl shadow-xl w-[100px]"
                    value={selected?.price || 0} // Show current price
                    onChange={(e) =>
                      handleSetPrice(option.id, parseFloat(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RadioButtons;
