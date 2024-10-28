"use client";

import { useEffect, useState } from "react";
import { MainButton, TextInput } from "./";
import { Close, DeleteForever } from "@mui/icons-material";
import toast from "react-hot-toast";
import { deleteAllStatus } from "@/utils";
import { Tooltip } from "@mui/material";
import { useGeneralStore } from "@/app/(stores)/general";

const FinishOverlay = () => {
  const [passkey, setPasskey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setIsDoneWithBatch = useGeneralStore(
    (state) => state.setIsDoneWithBatch
  );

  const handleFinish = async () => {
    if (
      passkey === "salary" ||
      passkey === "sanyadare" ||
      passkey === "Giddison"
    ) {
      try {
        setIsLoading(true);
        const response = await deleteAllStatus();

        if (response.status) {
          toast.success(response.message);
          setIsDoneWithBatch(false);
          window.location.reload();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Occured");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("Wrong Credential");
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
                        relative bg-red-50 w-full max-w-[400px] sm:h-[280px] h-[400px] m-auto  rounded-lg
                    `}
        >
          <div className="h-full w-full flex flex-col items-center justify-between">
            <div className="flex flex-row items-center justify-end w-full">
              <Tooltip title={"Close"} placement="bottom">
                <button
                  className="text-primary hover:text-red-600"
                  onClick={() => setIsDoneWithBatch(false)}
                >
                  <Close />
                </button>
              </Tooltip>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-2">
              <h2 className="font-bold text-lg text-slate-800">
                Input your passkey to confirm
              </h2>

              <TextInput
                value={passkey}
                onUpdate={setPasskey}
                placeholder="***Passkey***"
                inputType="password"
                error={errorMessage}
              />
              <MainButton
                isLoading={isLoading}
                text={"confirm"}
                customFunc={handleFinish}
                icon={<DeleteForever />}
                isDisabled={!passkey ? true : false}
              />
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
