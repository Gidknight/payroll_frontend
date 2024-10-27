import { TextAreaCompTypes } from "@/app/types";
import { FaIcons } from "react-icons/fa";
import { IconBase } from "react-icons/lib";

const TextArea = ({
  string,
  placeholder,
  error,
  isDisabled = false,
  onUpdate,
  rows = 2,
  isRequired = true,
}: TextAreaCompTypes) => (
  <div className="flex flex-col items-start  md:justify-start w-full p-1">
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
                text-gray-800
               rounded-xl
                py-3
                px-3
                focus:outline-primary
                ${error && "focus:outline-error"}
                ${isDisabled ? "bg-white" : "bg-slate-200"}
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

export default TextArea;
