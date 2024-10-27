import { useState } from "react";
import { BiCategory, BiEdit } from "react-icons/bi";
import {
  TextInputWithLabel,
  ComboBox,
  PrimaryButton,
  SecondaryButton,
} from "..";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";

import { useAuthStore } from "@renderer/stores/authStore";
import { updateCategory } from "@renderer/utils/requests";

interface CategoryTypes {
  name: string;
  id: string;
  createdAt: string;
  quantity: number;
  status: boolean;
  num_of_suppliers: number;
}
const CategoryDetails = ({ detail }: { detail: CategoryTypes }) => {
  console.log(detail);

  const user = useAuthStore((state) => state.userAuth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>(detail?.name || "Bugging");
  const [status, setStatus] = useState(detail?.status);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleCancel = () => {
    setName(detail.name);
    setEdit(false);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);

      const response = await updateCategory({
        id: detail.id,
        name,
        user_id: user.id,
        status,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        setEdit(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Error Occured, Product is not updated");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={
        edit
          ? "holder-active"
          : detail?.status == false
          ? "holder-not-active "
          : "holder-null"
      }
    >
      <div className="w-full flex flex-row items-center justify-between gap-3 pl-5">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="header-icon">{<BiCategory />}</span>
          <h2 className="header-text whitespace-nowrap">Category Details</h2>
        </div>

        <button
          className="edit-btn"
          onClick={edit ? handleCancel : () => setEdit(true)}
        >
          <span>{!edit ? <BiEdit /> : <GiCancel />}</span>
          {!edit ? "edit" : "cancel"}
        </button>
      </div>

      <div className="w-full flex flex-col items-start justify-center p-5">
        <div className="flex flex-row items-center justify-between w-full gap-5">
          {/* <TextInputWithCopy inputType="text" label="Category ID" value={detail?.id}  /> */}
        </div>

        <div className="w-full flex flex-row items-start justify-center gap-2">
          <TextInputWithLabel
            inputType="text"
            isDisabled={!edit}
            label="Category Name"
            string={name}
            onUpdate={setName}
            placeholder={`(Old Name: ${detail?.name}), A New Name Is Required`}
            isRequired={true}
          />
          <ComboBox
            defaultMessage={status ? "Available" : "Not Available"}
            value={status}
            showDefault={false}
            id={"status"}
            isDisabled={!edit}
            label={"Product Status"}
            onSelect={setStatus}
            options={[
              { id: true, name: "Active" },
              { id: false, name: "Not Active" },
            ]}
            error={""}
            subLabel={""}
          />
        </div>
        {edit && (
          <div className=" flex flex-row items-center justify-center gap-5 p-5">
            <PrimaryButton
              isLoading={isUpdating}
              title="Update"
              cusFunc={handleUpdate}
              type={"button"}
              isLock={!name || !status ? true : false}
            />

            <SecondaryButton
              cusFunc={handleCancel}
              isLoading={false}
              title="Cancel"
              isLock={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
