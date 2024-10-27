import { useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { DatalistOptionsTypes } from "../types";
import toast from "react-hot-toast";

const EditableDatalist = ({
  text = "not provided",
  label,
  cap = true,
  bold = false,
  textsize = "text-lg",
  onSubmit,

  loading = false,
  placeholder,
  options,
  id,
}: {
  id: string;
  text: string | number | null;
  label: string;
  cap?: boolean;
  bold?: boolean;
  textsize?: string;
  onSubmit: () => void;

  loading: boolean;
  placeholder: string;
  options: DatalistOptionsTypes[];
}) => {
  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState(text || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = options.find(
      (option) => String(option.Name) === e.target.value
    );
    if (selectedOption) {
      toast.success(selectedOption.id);
      setValue(selectedOption.Name);
    }
  };

  return (
    <div
      className={`flex flex-row items-center justify-between w-full ${
        bold && "font-semibold"
      }`}
    >
      <span className="text-base capitalize whitespace-nowrap text-primary w-1/2">
        {label}:
      </span>

      <div className="flex flex-row items-center justify-end gap-2 w-1/2">
        <input
          list={id}
          value={value}
          disabled={!edit || loading}
          onChange={handleInputChange}
          // onClick={(e) => handleOptionSelect(e)}
          onBlur={handleOptionSelect}
          placeholder={placeholder}
          className={`
            relative text-gray2 w-full px-2 py-1 text-right outline-none 
            ${edit && " border-b-2 border-live bg-slate-100"}
            ${cap && "capitalize"} 
            ${textsize}      
            `}
          // className={`w-full bg-gray1 text-gray-800 rounded-xl border py-3 px-3 focus:outline-primary`}
        />
        <datalist id={id}>
          {options.map((option) => (
            <option key={option.id} value={option.Name}>
              {option.Name}
            </option>
          ))}
        </datalist>
      </div>

      <div className="flex flex-roe items-center justify-center gap-2">
        {edit && (
          <button
            onClick={onSubmit}
            disabled={loading || !edit}
            className="flex flex-row items-center justify-center gap-2 ml-5 p-1 rounded-lg text-primary hover:text-live border hover:border-live transition-all duration-300"
          >
            <BiSave /> <span>Save</span>
          </button>
        )}
        <button
          onClick={() => setEdit((prev) => !prev)}
          className="text-[20px] hover:text-live transition-all duration-300 hover:shadow-md ml-5"
        >
          {edit ? <MdClose /> : <BiEdit />}
        </button>
      </div>
    </div>
  );
};
export default EditableDatalist;
