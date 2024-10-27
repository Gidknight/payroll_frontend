interface TextInputCompTypes {
  string: number | string | any;
  inputType: string;
  placeholder: string;
  onUpdate: (newValue: number | string | any) => void;
  error?: string;
  label?: string;
  isDisabled?: boolean;
  second_text?: string;
  isRequired?: boolean;
}

const TextInputWithLabel = ({
  string,
  inputType,
  placeholder,
  error,
  label,
  isDisabled = false,
  onUpdate,
  second_text,
  isRequired = true,
}: TextInputCompTypes) => (
  <div className="flex flex-col items-start  md:justify-start w-full p-1">
    <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
      {label}: {second_text && `(${second_text})`}
    </label>
    <div className="w-full">
      <div
        className={`flex flex-row items-center justify-center rounded-xl ${
          isDisabled
            ? "bg-transparent shadow-none border text-gray2 placeholder:text-gray2"
            : "bg-gray1 shadow-md"
        }`}
      >
        <input
          placeholder={placeholder}
          disabled={isDisabled}
          className={`
                block
                w-[100%]
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
          type={inputType}
          autoComplete="off"
          required={isRequired}
        />
      </div>
      <div className="text-error text-[14px] font-semibold">
        {error ? error : null}
      </div>
    </div>
  </div>
);

export default TextInputWithLabel;
