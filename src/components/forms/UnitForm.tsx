import { useState } from "react";
import { TextInputWithLabel, PrimaryButton, SecondaryButton } from "..";
import { MdEditDocument } from "react-icons/md";
import { ShowErrorObject } from "../../types";
import toast from "react-hot-toast";

import { FaBalanceScale } from "react-icons/fa";
import { createUnit } from "@renderer/utils/requests";

const UnitForm = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isFetching, setIsFetching] = useState(false)
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [shortHand, setShortHand] = useState("");
  // const [hasError, setHasError] = useState(false)

  const [error] = useState<ShowErrorObject | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const cancelAdd = () => {
    setUnitName("");
    setDescription("");
    setShortHand("");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await createUnit({
        name: unitName,
        description: description,
        shortHand: shortHand,
        user_id: user_id,
      });

      if (response?.status == 201) {
        toast.success(response?.data?.message);
        cancelAdd();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px] pl-5">{<FaBalanceScale />}</span>
          <h2 className="header-text truncate w-full">Add New Unit Metric</h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start justify-normal gap-1 p-5"
      >
        <TextInputWithLabel
          label="Unit name"
          icon={<MdEditDocument />}
          inputType="text"
          onUpdate={setUnitName}
          placeholder="Unit Name"
          string={unitName}
          isDisabled={false}
          error={showError("name")}
        />
        <TextInputWithLabel
          label="Description"
          icon={<MdEditDocument />}
          inputType="text"
          onUpdate={setDescription}
          placeholder="Description"
          string={description}
          isDisabled={false}
          error={showError("description")}
        />
        <TextInputWithLabel
          label="Short Hand"
          icon={<MdEditDocument />}
          inputType="text"
          onUpdate={setShortHand}
          placeholder="Short Hand"
          string={shortHand}
          isDisabled={false}
          error={showError("shortHand")}
        />

        <div className="w-full flex flex-row items-center justify-end pt-5">
          <div className="flex flex-row items-center justify-end gap-5">
            <PrimaryButton
              title="submit"
              isLoading={isLoading}
              cusFunc={() => {}}
              type={"submit"}
              isLock={unitName && description && shortHand ? false : true}
            />
            <SecondaryButton
              title="cancel"
              isLoading={isLoading}
              cusFunc={cancelAdd}
              isLock={unitName || description || shortHand ? false : true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UnitForm;
