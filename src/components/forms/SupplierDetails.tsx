import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import {
  TextInputWithLabel,
  ComboBox,
  PrimaryButton,
  SecondaryButton,
  TextInputWithCopy,
  TextAreaWithLabel,
} from "..";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";

import { FaTruckMoving } from "react-icons/fa";
import { updateSupplier } from "../../utils/requests";
import { useAuthStore } from "@renderer/stores/authStore";

interface SupplierType {
  name: string;
  id: string;
  email: string;
  contact: number;
  status: boolean;
  address: string;
  Product: any[];
}
const SupplierDetails = ({ detail }: { detail: SupplierType }) => {
  // const { user } = useUser();
  const user = useAuthStore((state) => state.userAuth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(detail?.name);
  const [email, setEmail] = useState(detail?.email);
  const [contact, setContact] = useState(detail?.contact);
  const [address, setAddress] = useState(detail?.address);
  const [status, setStatus] = useState(detail?.status);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleCancel = () => {
    setName(detail.name);
    setEdit(false);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const response = await updateSupplier({
        name: name,
        status: status,
        contact: String(contact),
        address: address,
        email: email,
        user_id: user.id,
        id: detail.id,
      });
      if (response.status == 201) {
        toast.success(response?.data?.message);
        setEdit(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.data?.message);
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
          <span className="header-icon">{<FaTruckMoving />}</span>
          <h2 className="header-text whitespace-nowrap">Supplier Details</h2>
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
          <TextInputWithCopy
            inputType="text"
            label="Supplier ID"
            value={detail?.id}
          />
        </div>

        <div className="w-full flex flex-row items-start justify-center gap-2">
          <TextInputWithLabel
            inputType="text"
            isDisabled={!edit}
            label="Supplier Name"
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
            label={"Supplier Status"}
            onSelect={setStatus}
            options={[
              { id: true, name: "Active" },
              { id: false, name: "Not Active" },
            ]}
            error={""}
            subLabel={""}
          />
        </div>
        <div className="w-full flex flex-row items-start justify-center gap-2">
          <TextInputWithLabel
            inputType="number"
            isDisabled={!edit}
            label="Supplier Contact"
            string={contact}
            onUpdate={setContact}
            placeholder={`(Old Contact: ${detail?.contact}), A Contact Is Required`}
            isRequired={true}
          />
          <TextInputWithLabel
            inputType="email"
            isDisabled={!edit}
            label="Supplier Email"
            string={email}
            onUpdate={setEmail}
            placeholder={`(Old Email: ${detail?.email}`}
            isRequired={true}
          />
        </div>

        <div className="w-full flex flex-row items-start justify-between gap-2">
          <div className="w-1/2">
            <TextAreaWithLabel
              error=""
              rows={4}
              isDisabled={!edit}
              label="Supplier Address"
              string={address}
              onUpdate={setAddress}
              placeholder={`(Old Address: ${detail?.address}`}
              isRequired={true}
            />
          </div>
          {edit && (
            <div className="w-1/2 flex flex-row items-center justify-center gap-5 p-5">
              <PrimaryButton
                isLoading={isUpdating}
                title="Update"
                cusFunc={handleUpdate}
                type={"button"}
                isLock={!edit}
              />

              <SecondaryButton
                cusFunc={handleCancel}
                isLoading={false}
                title="Cancel"
                isLock={!edit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
