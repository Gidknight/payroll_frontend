import { useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface DeletorType {
  label: string;
  // from: string;
  question: string;
  answer: string;
  placeholder: string;
  user_id: string;
  deleteFunction: () => void;
}

const Deletor = ({
  label,
  // from,
  question,
  answer,
  placeholder,
  user_id,
  deleteFunction,
}: DeletorType) => {
  const [paper, setPaper] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  // const [iscorrect, setIscorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlechange = () => {
    setShowQuestion(true);
    // inputRef.current.focus();
  };
  const clearForm = () => {
    setErrorMessage("");
    setShowQuestion(false);
  };
  const navigate = useNavigate();
  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`/api/category/${answer}`, {
        method: "DELETE",
        body: JSON.stringify({ user_id: user_id }),
      });
      if (response.ok) {
        toast.success("Deleted successfully");
        navigate("/maintenance/category", { replace: true });
      }
    } catch (error) {
      toast.error("Not Deleted");
      console.log(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`/api/product/${answer}`, {
        method: "DELETE",
        body: JSON.stringify({ user_id: user_id }),
      });
      const response = await res.json();
      if (response.status) {
        toast.success(response.messgae);
        clearForm();
        navigate("/maintenance/product", { replace: true });
      }
    } catch (error) {
      toast.error("Not Deleted");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (paper === answer) {
        setErrorMessage("");
        // if (from === "category") {
        //   await handleDeleteCategory();
        // } else if (from === "product") {
        //   await handleDeleteProduct();
        // }
        deleteFunction();
      } else {
        setErrorMessage("ID does not match");
      }
    } catch (error) {
      setErrorMessage("An Error Occured");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-red-100 p-5 rounded-xl flex flex-col items-center shadow-md justify-center gap-2">
      <h1 className="header-danger">Danger Zone</h1>
      <p className="italic text-red-700">This cannot be undone!!!</p>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        {!showQuestion ? (
          <button
            onClick={handlechange}
            className="flex flex-row items-center justify-center gap-2 font-bold capitalize p-2 bg-red-700 rounded-xl text-white hover:bg-red-900 hover:shadow-md hover:scale-105 transition-all duration-300 "
          >
            <span className="text-[18px]">
              <MdDelete />
            </span>
            <span>{label}</span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-100">
            <fieldset>
              <label className="text-lg font-semibold text-black px-5">
                {question}?
              </label>
              <input
                type="text"
                value={paper}
                onChange={(e) => setPaper(e.target.value)}
                className={`
                block
                w-full
                bg-white
                text-gray-800
               rounded-xl
               shadow-md
                py-3
                px-3
                focus:outline-red-500
                
            `}
                placeholder={placeholder}
              />
            </fieldset>

            {errorMessage && (
              <p className="text-lg font-semibold text-error ">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-row items-center justify-evenly w-full">
              <button
                disabled={!paper || isLoading ? true : false}
                className={`flex flex-row items-center justify-center gap-2 font-bold capitalize p-2 rounded-xl transition-all duration-300 w-24 ${
                  !paper
                    ? "bg-slate-300 text-white cursor-not-allowed"
                    : "bg-red-700  text-white cursor-pointer hover:bg-red-900 hover:shadow-md hover:scale-105"
                }`}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="animate-spin text-[22px]">
                    <BiLoaderCircle />
                  </span>
                ) : (
                  "confirm"
                )}
              </button>
              <button
                onClick={() => {
                  setPaper("");
                  setShowQuestion(false);
                }}
                className="flex flex-row items-center justify-center gap-2 font-bold capitalize p-2 text-red-700 rounded-xl bg-transparent border border-red-800 hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300 w-24"
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deletor;
