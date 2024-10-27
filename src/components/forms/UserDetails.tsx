import { useEffect, useState } from "react";
import { BiDish, BiEdit } from "react-icons/bi";
import {
  TextInputWithLabel,
  ComboBox,
  PrimaryButton,
  SecondaryButton,
  TextInputWithCopy,
} from "..";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";

import { User } from "../../types";
import {
  getSingleUser,
  updateEntry,
  updatePrivileges,
} from "../../utils/requests";
import { useParams } from "react-router-dom";

const userRoles = [
  { id: "user", name: "user" },
  { id: "admin", name: "admin" },
];
const UserDetails = ({ user_id }: { user_id: string }) => {
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [, setLastname] = useState("");
  const [, setFirstname] = useState("");
  const [, setOthername] = useState("");
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("");
  const [, setContact] = useState("");
  const [, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [contactStatus, setContactStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const [selectedUnit, setSelectedUnit] = useState(detail.role);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleCancel = () => {
    if (user) {
      setUsername(user?.user_name);
      setLastname(user?.last_name);
      setFirstname(user?.first_name);
      setOthername(String(user?.other_name));
      setStatus(user?.status);
      setRole(user?.role);
      setContact(user?.contact);
      setEmail(user?.email);
      setEmailStatus(Boolean(user?.email_status));
      setContactStatus(Boolean(user?.contact_status));
      setPassword("");
    }
    setEdit(false);
  };

  const handleUpdate = async () => {
    if (!user) return;
    setError("");
    try {
      setIsUpdating(true);
      if (!username) {
        setError("Username is required");
        return;
      }
      const response = await updatePrivileges({
        id: user?.id,
        role,
        status,
        user_id,
        contact_status: contactStatus,
        email_status: emailStatus,
        user_name: username,
        password,
      });
      if (response?.data.status) {
        toast.success(response?.data?.message);
        handleCancel();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error Occured, User is not updated");
    } finally {
      setIsUpdating(false);
    }
  };
  const goOff = async () => {
    if (!user) return;
    try {
      setIsUpdating(true);
      const response = await updateEntry(user?.id);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const _user = await getSingleUser(id);
        // console.log(_user.data)
        const response = _user.data?.data;
        setUser(response);
        setRole(response?.role);
        setUsername(response?.user_name);
        setStatus(response?.status);
      } catch (error) {
        console.log(error);
      }
    };
    if (params?.id) {
      fetchData(params.id);
    }
  }, []);

  return (
    <div className={status ? "holder-active" : "holder-not-active"}>
      <div className="w-full flex flex-row items-center justify-between gap-3 pl-5">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="header-icon">{<BiDish />}</span>
          <h2 className="header-text whitespace-nowrap">User Details</h2>
        </div>
        <div className="flex flex-row items-center justify-between gap-10 ">
          <button
            className="border-b-2 p-2 hover:text-red-400 hover:border-red-400 hover:shadow-md transition-all duration-300"
            onClick={goOff}
          >
            {/* <span>{!edit ? <BiEdit /> : <GiCancel />}</span> */}
            {isUpdating ? "Updating..." : "Go Offline"}
          </button>
          <button
            className="edit-btn"
            onClick={edit ? handleCancel : () => setEdit(true)}
          >
            <span>{!edit ? <BiEdit /> : <GiCancel />}</span>
            {!edit ? "edit" : "cancel"}
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-start gap-5">
        <div className="w-1/2 pt-5">
          <TextInputWithCopy
            inputType="text"
            label="User ID"
            value={user?.id}
          />
        </div>
        <div className="w-full flex flex-row items-start justify-center p-5 gap-5">
          <div className="flex flex-col items-center justify-between w-1/2 gap-5">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <TextInputWithLabel
                inputType="text"
                isDisabled={!edit}
                label="User Name"
                string={username}
                onUpdate={setUsername}
                placeholder={`(Old Name: ${user?.user_name}), A New Name Is Required`}
                isRequired={true}
                error={error}
              />

              <ComboBox
                defaultMessage={status ? "Active" : "Not Active"}
                value={status}
                showDefault={true}
                id={"status"}
                isDisabled={!edit}
                label={"User Status"}
                onSelect={setStatus}
                options={[
                  { id: true, name: "Active" },
                  { id: false, name: "Not Active" },
                ]}
                error={""}
                subLabel={""}
              />

              <ComboBox
                defaultMessage={user?.role}
                value={role}
                showDefault={true}
                id={"role"}
                isDisabled={!edit}
                label={"User Role"}
                onSelect={setRole}
                options={userRoles}
                error={""}
                subLabel={""}
              />

              {/* <ComboBox
                defaultMessage={detail.category.name}
                value={category}
                showDefault={true}
                id={"category"}
                isDisabled={!edit}
                label={"Product Category"}
                onSelect={setCategory}
                options={categories}
                error={""}
                subLabel={""}
              /> */}
              <TextInputWithLabel
                inputType="password"
                isDisabled={!edit}
                label="Change Password"
                string={password}
                onUpdate={setPassword}
                placeholder={`Give the user a new password`}
                isRequired={false}
              />
            </div>
          </div>
        </div>
        {edit && (
          <div className=" flex flex-row items-center justify-center gap-5 p-5">
            <PrimaryButton
              isLoading={isUpdating}
              title="Update"
              cusFunc={handleUpdate}
              type={"button"}
              isLock={!status || !role ? true : false}
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

export default UserDetails;
