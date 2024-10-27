"use client";

import React from "react";
import { SmallUnitTypes } from "../types";

interface CheckboxesTypes {
  title: string;
  secondLabel: string;
  options: SmallUnitTypes[];
  selected: { id: number; price: number }[];
  setSelected: (value: { id: number; price: number }[]) => void;
}

const Checkboxes = ({
  title,
  options,
  selected,
  secondLabel,
  setSelected,
}: CheckboxesTypes) => {
  // Handles checking/unchecking
  const handleCheck = (optionId: number) => {
    const isSelected = selected.find((item) => item.id === optionId);

    if (isSelected) {
      // Uncheck: remove the item from selected array
      setSelected(selected.filter((item) => item.id !== optionId));
    } else {
      // Check: add the item with default price 0
      setSelected([...selected, { id: optionId, price: 0 }]);
    }
  };

  // Handles setting price for selected items
  const handleSetPrice = (optionId: number, price: number) => {
    const updatedSelected = selected.map((item) =>
      item.id === optionId ? { ...item, price } : item
    );
    setSelected(updatedSelected);
  };

  return (
    <div className="flex flex-col items-start md:justify-start w-full p-1 rounded-xl shadow-lg">
      <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
        {title}
      </label>
      {options?.length > 0 &&
        options.map((option) => {
          const isSelected = selected.find((item) => item.id === option.id);
          return (
            <div
              key={option.id}
              className="w-full flex flex-row items-center justify-start gap-5 py-1 px-2 bg-slate-100"
            >
              <label
                htmlFor={`checkbox-${option.id}`}
                className="text-primary capitalize"
              >
                {option.name}:{" "}
              </label>
              <input
                type="checkbox"
                id={`checkbox-${option.id}`} // Unique ID for each checkbox
                checked={!!isSelected} // Control checked state
                onChange={() => handleCheck(option.id)} // Toggle selected state
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
                    value={isSelected.price} // Show current price
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

export default Checkboxes;
