"use client";

import { useEffect, useState } from "react";

import { ComboBox, SecondaryButton, ETA, WebButton } from ".";

import toast from "react-hot-toast";
import {
  prepareQueue,
  sendBatchEmail,
  sendFailedBatchEmail,
} from "../utils/requests";

import { Tooltip } from "@mui/material";
import { BATCH_LIMIT } from "../constants";
import { GrRefresh } from "react-icons/gr";
import { MdEmail, MdTry } from "react-icons/md";
import { GiReloadGunBarrel } from "react-icons/gi";
import { axiosInstance } from "../libs";

interface QueueTypes {
  awaiting: StaffTypes[];
  sent: StaffTypes[];
  failed_emails: StaffTypes[];
  total_emails: number;
}

export interface StaffTypes {
  id: number;
  Name: string;
}
const SendBatchComponent = () => {
  // const setIsSendingBatch = useGeneralStore((state) => state.setIsSendingBatch);
  // const setIsDoneWithBatch = useGeneralStore(
  //   (state) => state.setIsDoneWithBatch
  // );

  const [totalQueue, setTotalQueue] = useState<QueueTypes>({
    awaiting: [],
    failed_emails: [],
    sent: [],
    total_emails: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [whatsGoingOn, setWhatsGoingOn] = useState("");
  const [initialSeconds, setInitialSeconds] = useState(0);

  const closeTab = () => {
    setIsSendingBatch(false);
  };

  const handleRefresh = () => {
    try {
      setIsLoading(true);
      setWhatsGoingOn("Refreshing");

      toast.loading("Refreshing");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setWhatsGoingOn("");
    }
  };

  const prepare = async () => {
    try {
      setIsLoading(true);
      setWhatsGoingOn("Queuing the recipients");
      const response = await axiosInstance.get("/payslip");
      if (response.status == 200) {
        setTotalQueue(response.data);
        // console.log(response);
        setPrepared(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Queuing");
    } finally {
      setWhatsGoingOn("");
      setIsLoading(false);
    }
  };

  const toggleFinish = () => {
    // toast.success("clicked");
    setIsDoneWithBatch(true);
  };

  const sendBatch = async () => {
    if (!totalQueue?.awaiting?.length) return;
    else {
      try {
        setIsSending(true);
        setWhatsGoingOn(`Sending Batch Email`);
        // setInitialSeconds(totalQueue?.awaiting?.length * 2);
        setInitialSeconds(
          totalQueue?.awaiting?.length > BATCH_LIMIT
            ? BATCH_LIMIT * 2
            : totalQueue?.awaiting?.length * 2
        );
        const response = await sendBatchEmail();
        if (response.status) {
          toast.success(response.message);
          setWhatsGoingOn("Done, Refreshing...");
        }
      } catch (error) {
        console.log(error);
        //  setWhatsGoingOn(`Sending Batch Email`);
        toast.error("Error making batch send");
      } finally {
        setIsSending(false);
        // prepare();
        window.location.reload();
      }
    }
  };

  const retryFailed = async () => {
    if (!totalQueue?.failed_emails?.length) return;
    else {
      try {
        setRetrying(true);
        setWhatsGoingOn(`Retrying Falied Emails`);
        setInitialSeconds(
          totalQueue?.failed_emails?.length > BATCH_LIMIT
            ? BATCH_LIMIT * 2
            : totalQueue?.failed_emails?.length * 2
        );
        const response = await sendFailedBatchEmail();
        if (response.status) {
          toast.success(response.message);
          setWhatsGoingOn("Done, Refreshing...");
        }
      } catch (error) {
        // console.log(error);
        //  setWhatsGoingOn(`Sending Batch Email`);
        toast.error("Error making batch send");
      } finally {
        setRetrying(false);
        window.location.reload();
      }
    }
  };
  useEffect(() => {
    prepare();
  }, []);

  return (
    <>
      <div
        className={`
                        relative bg-white w-full mx-3  mb-10
                        
                    `}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <Tooltip title="Refresh" placement="bottom">
            <button
              onClick={handleRefresh}
              disabled={retrying || isSending}
              className=" text-primary border hover:border-primary hover:shadow-md duration-200 transition-all p-2"
            >
              <GrRefresh />
            </button>
          </Tooltip>
          {retrying || isSending ? <ETA initialSeconds={initialSeconds} /> : ""}
          {/* <Tooltip title="Close Tab" placement="bottom">
              <button
                onClick={closeTab}
                disabled={isSending}
                className="text-primary border hover:text-red-600 hover:border-red-500 transition-all duration-200"
              >
                <CloseRounded />
              </button>
            </Tooltip> */}
        </div>
        <div className=" relative w-full h-[500px] flex flex-col items-center justify-between">
          <div className=" w-full bg-slate-50">
            {totalQueue && (
              <div className="w-full flex flex-row items-start justify-between px-5 py-2">
                <div className="flex flex-col w-1/2 items-start justify-start">
                  <div className="flex flex-row items-center justify-start">
                    <h3 className="whitespace-nowrap">
                      Sent Emails:{" "}
                      <span className="font-semibold ">
                        {totalQueue?.sent?.length}
                      </span>
                    </h3>
                    {/* 
                    {totalQueue?.sent?.length > 0 && (
                      <ComboBox
                        options={totalQueue.sent}
                        isDisabled={false}
                        id="sent_emails"
                        // isError={false}
                        label="Sent Emails"
                        subLabel={totalQueue?.sent?.length?.toLocaleString(
                          "use-EN"
                        )}
                        onSelect={() => {}}
                      />
                    )} */}
                  </div>
                  <div className="flex flex-row items-center justify-start">
                    {/* <h3 className="whitespace-nowrap">
                      Emails Remaining:{" "}
                      <span className="font-semibold ">
                        {totalQueue?.awaiting?.length}
                      </span>
                    </h3> */}
                    {totalQueue?.awaiting?.length > 0 && (
                      <ComboBox
                        options={totalQueue.awaiting}
                        isDisabled={false}
                        id="not_sent_emails"
                        label={`Emails Remaining`}
                        subLabel={
                          totalQueue?.awaiting?.length?.toLocaleString(
                            "us-EN"
                          ) + " Emails"
                        }
                        onSelect={() => {}}
                        showDefault={false}
                      />
                    )}
                  </div>
                  <h3>
                    Total Staff Emails:{" "}
                    <span className="font-semibold ">
                      {totalQueue?.total_emails}
                    </span>
                  </h3>
                </div>
                <div className=" w-1/2 flex flex-col items-end justify-start">
                  <div className="flex flex-row-reverse w-full items-center justify-start">
                    <h3 className="whitespace-nowrap text-red-500">
                      Failed Emails:{" "}
                      <span className="font-semibold ">
                        {totalQueue?.failed_emails?.length}
                      </span>
                    </h3>
                    {totalQueue?.failed_emails?.length > 0 && (
                      <ComboBox
                        options={totalQueue.failed_emails}
                        isDisabled={false}
                        id="failed_emails"
                        // isError={true}
                        label=""
                        onSelect={() => {}}
                      />
                    )}
                  </div>
                  {totalQueue?.failed_emails?.length > 0 && (
                    <WebButton
                      isLoading={retrying}
                      text={"Retry Failures"}
                      sendFunction={retryFailed}
                      icon={<MdTry />}
                      // isDisabled={
                      //   totalQueue?.sent?.length === totalQueue?.total_emails ||
                      //   totalQueue?.total_emails === totalQueue?.failed_emails.length
                      //     ? true
                      //     : false
                      // }
                      staff_id={""}
                    />
                  )}
                </div>
              </div>
            )}
            <h1 className="text-xl font-bold animate-pulse py-2 px-5 text-center border-2 border-red-100 border-dashed text-primary uppercase">
              {whatsGoingOn}
            </h1>
          </div>
          <div className=" w-full p-5 flex flex-col">
            {isSending || retrying ? (
              <div className="m-auto  bg-slate-200 p-5 ">
                <p className="text-lg font-semibold text-red-600 capitalize italic">
                  Please be patient this will take a while
                </p>
                <p className="text-lg font-semibold text-red-600 capitalize animate-pulse">
                  {">"} Keep this tap open
                </p>
                <p className="text-lg font-semibold text-red-600 capitalize animate-pulse">
                  {">"} Do Not Turn Off Your System
                </p>
                <p className="text-lg font-semibold text-red-600 capitalize animate-pulse">
                  {">"} Do Not turn off the internet
                </p>
                <p className="text-lg font-semibold text-red-600 capitalize animate-pulse">
                  {">"} Do Not Refresh the page
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" bg-slate-200 w-full p-5 flex flex-row items-center justify-between">
            {!isSending || !retrying ? (
              <div>
                <SecondaryButton
                  isLoading={isLoading}
                  title={"Finish"}
                  cusFunc={toggleFinish}
                  // isDisabled={
                  //   totalQueue?.sent?.length == totalQueue?.total_emails
                  //     ? false
                  //     : true
                  // }
                  isLock={false}
                />
              </div>
            ) : (
              <p></p>
            )}
            {!retrying && (
              <WebButton
                isLoading={isSending}
                text={"Send Batch"}
                sendFunction={sendBatch}
                icon={<MdEmail />}
                staff_id={""}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendBatchComponent;
