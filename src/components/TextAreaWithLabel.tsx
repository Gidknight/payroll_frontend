import { TextAreaCompTypes } from "@/app/types";
import { FaIcons } from "react-icons/fa";
import { IconBase } from "react-icons/lib";

const TextAreaWithLabel = ({
  string,
  placeholder,
  error,
  label,
  isDisabled = false,
  onUpdate,
  rows = 2,
  isRequired = true,
}: TextAreaCompTypes) => (
  <div className="flex flex-col items-start  md:justify-start w-full p-1">
    <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
      {label}:
    </label>
    <div className="w-full">
      <div
        className={`flex flex-row items-center justify-center rounded-xl ${
          isDisabled
            ? "bg-transparent shadow-none border text-gray2 placeholder:text-gray2"
            : "bg-gray1 shadow-md"
        }`}
      >
        <textarea
          placeholder={placeholder}
          disabled={isDisabled}
          className={`
                block
                w-full
                bg-transparent
                text-gray-800
               rounded-xl
               
                py-3
                px-3
                focus:outline-primary
                ${error && "focus:outline-error"}
            `}
          value={string}
          onChange={(event) => onUpdate(event.target.value)}
          autoComplete="off"
          required={isRequired}
          rows={rows}
        ></textarea>
      </div>
      <div className="text-error text-[14px] font-semibold">
        {error ? error : null}
      </div>
    </div>
  </div>
);

export default TextAreaWithLabel;
