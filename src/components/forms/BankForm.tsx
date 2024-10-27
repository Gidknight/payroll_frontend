import { useState } from "react";
import toast from "react-hot-toast";
import TextInputWithLabel from "../TextInputWithLabel";

import PrimaryButton from "../PrimaryButton";
import { axiosInstance } from "../../libs";

const TitleForm = ({ purpose }: { purpose: string }): JSX.Element => {
  const [name, setName] = useState("");
  const [sortCode, setSortcode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (name.trim() === "") return;
    try {
      setIsLoading(true);
      let response;
      if (purpose == "bank") {
        response = await axiosInstance.post("/bankNames", {
          Name: name?.toUpperCase(),
          Sortcode: sortCode,
        });
      } else if (purpose === "pension bank") {
        response = await axiosInstance.post("/pensionBank", {
          Name: name?.toUpperCase(),
          Sortcode: sortCode,
        });
      }
      if (response?.status == 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
      toast.error("An error occurred, Bank not added");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-2 shadow-lg border-t-4 border-live w-full">
      <h2 className="header-text px-5">Add New {purpose}</h2>
      <form
        onSubmit={(e) => submitForm(e)}
        className="px-5 flex flex-row items-start justify-normal gap-5 "
      >
        <div className="w-5/6 flex flex-row items-center justify-evenly gap-4">
          <TextInputWithLabel
            inputType="text"
            label="Name"
            onUpdate={setName}
            placeholder={`Name of ${purpose} is required`}
            string={name}
            isRequired={true}
            isDisabled={isLoading}
            error=""
          />
          <TextInputWithLabel
            inputType="text"
            label="Sort Code"
            onUpdate={setSortcode}
            placeholder={`Sort code of ${purpose}`}
            string={sortCode}
            isRequired={false}
            isDisabled={isLoading}
            error=""
          />
        </div>
        <div className="w-1/6 m-auto">
          <PrimaryButton
            type={"submit"}
            title="submit"
            cusFunc={() => {}}
            isLoading={isLoading}
            isLock={name ? false : true}
          />
        </div>
      </form>
    </div>
  );
};

export default TitleForm;
