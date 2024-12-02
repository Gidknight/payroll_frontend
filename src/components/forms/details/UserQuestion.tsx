import { useState } from "react";
import SecondaryButton from "../../SecondaryButton";
import PrimaryButton from "../../PrimaryButton";
import toast from "react-hot-toast";
// import { updateUserDetail } from '../../../utils/requests'
import { TextArea } from "../..";
import { axiosInstance } from "../../../libs";

const UserQuestion = ({
  user_id,
  value,
  title,
  subText,
}: {
  user_id: string;
  value?: string;
  title: string;
  subText?: string;
}) => {
  const [detail, setDetail] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);
  const [updateDetail, setUpdateDetail] = useState(false);
  const [error, setError] = useState("");
  const cancelUpdate = () => {
    setError("");
    setUpdateDetail(false);
    setDetail(value || "");
  };

  const handleChange = async () => {
    setError("");
    if (!detail) {
      setError(title + " is Required");
      return;
    }
    try {
      setIsLoading(true);
      setIsLoading(true);
      // const response = await axiosInstance.put(`/user/${user_id}`, {
      //   id: user_id,
      //   value: detail,
      //   type: title,
      // });
      // if (response?.status == 201) {
      //   toast.success(response?.data?.message);
      //   setUpdateDetail(false);

      //   // window.location.reload()
      const response = await axiosInstance.put(`/user/${user_id}`, {
        id: user_id,
        value: detail,
        type: title,
      });
      if (response?.status == 201) {
        toast.success(response?.data?.message);
        setUpdateDetail(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server errror");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" p-5 w-full flex flex-col md:flex-row items-center justify-between border-2 border-slate-400 rounded-2xl shadow-md">
      <div className="w-1/2 flex flex-col items-start justify-start gap-2">
        <h2 className="text-primary font-bold text-xl capitalize">{title} </h2>
        <p className="font-normal text-pretty text-base text-error">
          {subText}
        </p>
        {/* <p>This Cannot be changed later</p> */}
      </div>
      <div className="w-1/2 flex flex-col items-end justify-start gap-1">
        <TextArea
          rows={3}
          onUpdate={setDetail}
          placeholder={title}
          string={detail}
          isDisabled={!updateDetail}
          error={error}
          isRequired={true}
        />

        {updateDetail ? (
          <div className="w-1/4 flex items-center justify-end gap-2">
            <PrimaryButton
              title="submit"
              isLoading={isLoading}
              cusFunc={handleChange}
              type={"submit"}
              isLock={false}
            />
            <SecondaryButton
              title="cancel"
              isLoading={isLoading}
              cusFunc={cancelUpdate}
              isLock={false}
            />
          </div>
        ) : (
          <div className="w-1/5">
            <SecondaryButton
              title="change"
              isLoading={isLoading}
              cusFunc={() => setUpdateDetail(true)}
              isLock={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuestion;
