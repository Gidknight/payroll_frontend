import { useState } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { MdClose, MdDelete } from "react-icons/md";
import { axiosInstance } from "../libs";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const ClickableField = ({
  id,
  text = "not provided",
  label,
  cap = true,
  bold = false,
  textsize = "text-lg",
  setLoading,
  inputType = text,
  loading = false,
  type,
}: {
  text: string | number | null;
  label: string;
  cap?: boolean;
  bold?: boolean;
  textsize?: string;
  setLoading: (value: boolean) => void;
  inputType: any;
  loading: boolean;
  id: number;
  type: string;
}) => {
  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState(text || 0);

  const handleSave = async () => {
    try {
      setLoading(true);
      let response;
      if (type === "allowance") {
        response = await axiosInstance.patch("/individualAllowances/" + id, {
          amount: value,
          // individual_id: data?.id
        });
      } else if (type === "deduction") {
        response = await axiosInstance.patch("/individualDeductions/" + id, {
          amount: value,
          // individual_id: data?.id
        });
      }
      if (response?.status == 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      let response;
      if (type == "allowance") {
        response = await axiosInstance.delete("/individualAllowances/" + id);
      } else if (type === "deduction") {
        response = await axiosInstance.delete("/individualDeductions/" + id);
      }
      if (response?.status == 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`flex flex-row items-center justify-between w-full ${
          bold && "font-semibold"
        }`}
      >
        <span
          onClick={() => setEdit((prev) => !prev)}
          className="text-base capitalize whitespace-nowrap text-primary  hover:cursor-pointer"
        >
          {label}:
        </span>
        <div className="w-full" />
        <input
          type={inputType}
          className={`
          text-gray2 w-full px-2 py-1 text-right outline-none bg-transparent 
          ${edit && " border-b-2 border-live bg-slate-100"}
          ${cap && "capitalize"} 
          ${textsize}      
          `}
          disabled={!edit || loading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {edit && (
        <div className="flex flex-row border-b-2 border-x-2 items-center justify-end rounded-b-lg border-gray2 p-2">
          <button
            onClick={handleSave}
            disabled={loading || !edit}
            className="flex flex-row items-center justify-center gap-2 ml-5 p-1 rounded-lg text-primary hover:text-live border hover:border-live transition-all duration-300"
          >
            {loading ? (
              <span className="animate-spin">
                <FaSpinner />
              </span>
            ) : (
              <BiSave />
            )}{" "}
            <span>Save</span>
          </button>
          <button
            onClick={handleRemove}
            disabled={loading || !edit}
            className="flex flex-row items-center justify-center gap-2 ml-5 p-1 rounded-lg text-primary hover:text-error border hover:border-error transition-all duration-300"
          >
            {loading ? (
              <span className="animate-spin">
                <FaSpinner />
              </span>
            ) : (
              <MdDelete />
            )}{" "}
            <span>Remove</span>
          </button>
          <button
            onClick={() => setEdit(false)}
            className="text-[20px] hover:text-live transition-all duration-300 hover:shadow-md ml-5"
          >
            {edit ? <MdClose /> : <BiEdit />}
          </button>
        </div>
      )}
    </div>
  );
};
export default ClickableField;
