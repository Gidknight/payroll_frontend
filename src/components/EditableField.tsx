import { useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const EditableField = ({
  text = "not provided",
  label,
  cap = true,
  bold = false,
  textsize = "text-lg",
  onSubmit,
  inputType = text,
  loading = false,
}: {
  text: string | number | null;
  label: string;
  cap?: boolean;
  bold?: boolean;
  textsize?: string;
  onSubmit: () => void;
  inputType: any;
  loading: boolean;
}) => {
  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState(text || "");

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
          type={inputType}
          className={`
            text-gray2 w-full px-2 py-1 text-right outline-none 
            ${edit && " border-b-2 border-live bg-slate-100"}
            ${cap && "capitalize"} 
            ${textsize}      
            `}
          disabled={!edit || loading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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
export default EditableField;
