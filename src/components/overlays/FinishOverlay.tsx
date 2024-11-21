"use client";

import { useEffect, useState } from "react";
import { SecondaryButton, TextInput } from "../";
// import { Close, DeleteForever } from "@mui/icons-material";
import toast from "react-hot-toast";
// import { deleteAllStatus } from "../../utils";
import { Tooltip } from "@mui/material";
import { useGeneralStore } from "../../stores/general";
import { MdClose } from "react-icons/md";

const FinishOverlay = () => {
  const [passkey, setPasskey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setIsDoneWithBatch = useGeneralStore(
    (state) => state.setIsDoneWithBatch
  );

  const handleFinish = async () => {
    try {
      // setIsLoading(true);
      if (
        passkey === "salary" ||
        passkey === "sanyadare" ||
        passkey === "Giddison"
      ) {
        // const response = await deleteAllStatus();
        // if (response.status) {
        //   toast.success(response.message);
        //   setIsDoneWithBatch(false);
        //   window.location.reload();
        // } else {
        //   toast.error(response.message);
        // }
      } else {
        setErrorMessage("Wrong Credential");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [passkey]);

  return (
    <>
      <div
        id="FinishOverlay"
        className="fixed shadow-xl flex justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-20 "
      >
        <div
          className={`
                        relative bg-red-50 w-full max-w-[400px]  h-auto m-auto p-5 rounded-lg
                    `}
        >
          <div className="h-full w-full flex flex-col items-center justify-between">
            <div className="flex flex-row items-center justify-end w-full">
              <Tooltip title={"Close"} placement="bottom">
                <button
                  className="text-primary hover:text-red-600"
                  onClick={() => setIsDoneWithBatch(false)}
                >
                  <MdClose />
                </button>
              </Tooltip>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-2">
              <h2 className="font-bold text-lg text-slate-800">
                Input your passkey to confirm
              </h2>

              <TextInput
                string={passkey}
                isRequired={true}
                onUpdate={setPasskey}
                placeholder="***Passkey***"
                inputType="password"
                error={errorMessage}
                isDisabled={isLoading}
              />
              <div className="w-32">
                <SecondaryButton
                  isLoading={isLoading}
                  title={"Delete"}
                  cusFunc={handleFinish}
                  // icon={<DeleteForever />}

                  isLock={!passkey ? true : false}
                />
              </div>
              <h1 className="text-base italic text-slate-600">
                This Action cannot be undone
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishOverlay;
