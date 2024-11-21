import { TextInputCompTypes } from "../types";

export default function TextInput({
  string,
  inputType,
  placeholder,
  error,
  onUpdate,
  isDisabled,
  isRequired = true,
}: TextInputCompTypes) {
  return (
    <>
      <input
        placeholder={placeholder}
        className={`
                block
                w-full
                
                text-gray-800
                border
                border-gray-300
                rounded-md
                py-2.5
                px-3
                focus:outline-none
                   ${isDisabled ? "bg-white" : "bg-slate-200"}
            `}
        value={string || ""}
        onChange={(event) => onUpdate(event.target.value)}
        type={inputType}
        disabled={isDisabled}
        required={isRequired}
        autoComplete="off"
      />

      <div className="text-red-500 text-[14px] font-semibold">
        {error ? error : null}
      </div>
    </>
  );
}
