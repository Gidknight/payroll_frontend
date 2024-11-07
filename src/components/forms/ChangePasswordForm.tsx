import { useState } from "react";
import { PrimaryButton, TextInput } from "..";
import { BiLock } from "react-icons/bi";
import { ShowErrorObject } from "../../types";
import toast from "react-hot-toast";
import { axiosInstance } from "../../libs";
// import { changePassword } from "@renderer/utils/requests";

const ChangePasswordForm = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [, setEditPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setResMessage] = useState("");

  const [error, setError] = useState<ShowErrorObject | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null);
    let isError = false;

    if (!currentPassword) {
      setError({
        type: "currentPassword",
        message: "Please input your current password",
      });
      isError = true;
    } else if (newPassword.length < 8) {
      setError({
        type: "password",
        message: "The Password needs to be longer",
      });
      isError = true;
    } else if (newPassword != confirmPassword) {
      setError({ type: "password", message: "The Passwords do not match" });
      isError = true;
    }
    // else if (resMessage === "Incorrect Password") {
    //   setError({
    //     type: "currentPassword",
    //     message: "Current password is not correct",
    //   });
    //   isError = true;
    // }
    return isError;
  };
  const updatePassword = async (e: any) => {
    e.preventDefault();
    // showError("");
    setResMessage("");
    const isError = validate();
    if (isError) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/user/security/password", {
        user_id,
        currentPassword,
        newPassword,
      });

      if (response.status === 201) {
        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
        toast.success(response?.data?.message);
      } else {
        if (response?.data?.message === "Incorrect Password") {
          setResMessage(response?.data?.message);
          // validate();
          // showError({type:"currentPassword",message:""});
        }
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCancel = () => {
  //   setCurrentPassword('')
  //   setNewPassword('')
  //   setConfirmPassword('')
  //   setResMessage('')
  //   setEditPassword(false)
  // }

  return (
    <div className="w-full bg-white p-2 shadow-lg border-t-4 border-red-600">
      <div className="flex flex-row items-center justify-start">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px]">{<BiLock />}</span>
          <h2 className="header-text truncate w-full">Security Settings</h2>
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly w-full">
        <div className="w-1/2"></div>
        <form
          onSubmit={updatePassword}
          className="w-1/2 flex flex-col items-start justify-normal gap-1 p-5"
        >
          <TextInput
            inputType="password"
            onUpdate={setCurrentPassword}
            placeholder="Current Password"
            string={currentPassword}
            isDisabled={false}
            error={showError("currentPassword")}
          />
          <TextInput
            inputType="password"
            onUpdate={setNewPassword}
            placeholder="New Password"
            string={newPassword}
            isDisabled={false}
            error={showError("password")}
          />
          <TextInput
            inputType="password"
            onUpdate={setConfirmPassword}
            placeholder="Confirm Password"
            string={confirmPassword}
            isDisabled={false}
            error={showError("password")}
          />

          <div className="w-full flex flex-row items-center justify-end py-5">
            <div className="flex flex-row items-center justify-end gap-5">
              <PrimaryButton
                title="submit"
                isLoading={isLoading}
                cusFunc={() => {}}
                type={"submit"}
                isLock={
                  !currentPassword || !newPassword || !confirmPassword
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
