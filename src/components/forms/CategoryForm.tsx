import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { TextInputWithLabel, PrimaryButton, SecondaryButton } from "..";
import { MdEditDocument } from "react-icons/md";
import { ShowErrorObject } from "../../types";

import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";
import { createCategory } from "@renderer/utils/requests";

const CategoryForm = (): JSX.Element => {
  const user = useAuthStore((state) => state.userAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  // const [hasError, setHasError] = useState(false)

  const [error] = useState<ShowErrorObject | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const cancelAdd = () => {
    setCategoryName("");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await createCategory({
        name: categoryName,
        user_id: user.id,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        cancelAdd();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Creating Category");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px] pl-5">{<BiCategory />}</span>
          <h2 className="header-text truncate w-full">Add New Category</h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start justify-normal gap-1 p-5"
      >
        <TextInputWithLabel
          label="Category name"
          icon={<MdEditDocument />}
          inputType="text"
          onUpdate={setCategoryName}
          placeholder="Category Name"
          string={categoryName}
          isDisabled={false}
          error={showError("categoryName")}
        />

        <div className="w-full flex flex-row items-center justify-end pt-5">
          <div className="flex flex-row items-center justify-end gap-5">
            <PrimaryButton
              title="submit"
              isLoading={isLoading}
              cusFunc={() => {}}
              type={"submit"}
              isLock={categoryName ? false : true}
            />
            <SecondaryButton
              title="cancel"
              isLoading={isLoading}
              cusFunc={cancelAdd}
              isLock={categoryName ? false : true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
