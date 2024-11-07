import { useState } from "react";
import toast from "react-hot-toast";
import TextInputWithLabel from "../TextInputWithLabel";

import PrimaryButton from "../PrimaryButton";
import { axiosInstance } from "../../libs";

const AllowDeductForm = ({ purpose }: { purpose: string }): JSX.Element => {
  const [name, setName] = useState("");
  const [codes, setCodes] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (name.trim() === "") return;
    try {
      setIsLoading(true);
      let response;
      if (purpose == "allowance") {
        response = await axiosInstance.post("/allowanceNames", {
          name: name?.toUpperCase(),
          codes,
          account_name: accountName?.toUpperCase(),
          account_no: accountNumber,
        });
      } else if (purpose === "deduction") {
        response = await axiosInstance.post("/deductionNames", {
          name: name?.toUpperCase(),
          codes,
          account_name: accountName?.toUpperCase(),
          account_no: accountNumber,
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
      toast.error("An error occurred, " + purpose + " not added");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-2 shadow-lg border-t-4 border-live w-full">
      <h2 className="header-text px-5">Add New {purpose}</h2>
      <form
        onSubmit={(e) => submitForm(e)}
        className="px-5 flex flex-col items-start justify-center gap-1 "
      >
        <div className="w-full flex flex-row items-center justify-evenly gap-4">
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
            label="Codes"
            onUpdate={setCodes}
            placeholder={`Code of ${purpose}`}
            string={codes}
            isRequired={false}
            isDisabled={isLoading}
            error=""
          />
        </div>
        <div className="w-full flex flex-row items-center justify-evenly gap-4">
          <TextInputWithLabel
            inputType="text"
            label="Account Name"
            onUpdate={setAccountName}
            placeholder={`Account Name of ${purpose} is required`}
            string={accountName}
            isRequired={true}
            isDisabled={isLoading}
            error=""
          />
          <TextInputWithLabel
            inputType="number"
            label="Account Number"
            onUpdate={setAccountNumber}
            placeholder={`Account Number of ${purpose}`}
            string={accountNumber}
            isRequired={false}
            isDisabled={isLoading}
            error=""
          />
        </div>
        <div className="w-1/6 m-auto my-2">
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

export default AllowDeductForm;
