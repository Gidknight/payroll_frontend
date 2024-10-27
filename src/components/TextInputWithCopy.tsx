"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const TextInputWithCopy = ({
  value,
  inputType,

  label,
}: {
  value: string;
  inputType: string;
  label: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied To Clipboard");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col items-start  md:justify-start w-full p-1">
      <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
        {label}:
      </label>
      <div className="w-full">
        <div
          className={`flex flex-row items-center justify-between rounded-xl bg-gray-300 shadow-none  text-gray2
            
          `}
        >
          <input
            disabled={true}
            className={`
                block
                w-10/12
                bg-transparent
                text-gray-800
            py-3            
                px-3
               
            `}
            value={value}
            type={inputType}
            autoComplete="off"
          />
          <button
            onClick={handleCopy}
            disabled={copied}
            className={`text-live bg-slate-400 w-2/12 font-bold p-2 m-auto text-center text-lg rounded-r-xl hover:bg-white hover:shadow-md transition-all duration-300 ${
              copied && "cursor-not-allowed"
            }`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInputWithCopy;
