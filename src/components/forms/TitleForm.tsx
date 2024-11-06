import { useState } from "react";
import toast from "react-hot-toast";
import TextInputWithLabel from "../TextInputWithLabel";

import PrimaryButton from "../PrimaryButton";
import { axiosInstance } from "../../libs";

const TitleForm = ({ purpose }: { purpose: string }): JSX.Element => {
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (name?.trim() === "") return;

    try {
      setIsLoading(true);
      let response;
      if (purpose === "title") {
        response = await axiosInstance.post("/titles", {
          Name: name,
        });
      } else if (purpose === "designation") {
        response = await axiosInstance.post("/designations", {
          Name: name.toUpperCase(),
        });
      } else if (purpose === "unit") {
        response = await axiosInstance.post("/units", {
          Name: name.toUpperCase(),
        });
      } else if (purpose === "division") {
        response = await axiosInstance.post("/divisions", {
          Name: name.toUpperCase(),
        });
      } else if (purpose === "job classification") {
        response = await axiosInstance.post("/classifications", {
          Name: name.toUpperCase(),
        });
      }

      if (response?.status == 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, Not added");
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
        <div className="w-3/6 flex flex-row items-center justify-evenly gap-4">
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
