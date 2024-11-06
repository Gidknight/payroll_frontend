"use client";

import { useEffect, useState } from "react";

import { PrimaryButton, TextInputWithLabel } from "..";

import { GrClose } from "react-icons/gr";
import { useGeneralStore } from "../../stores/general";
import toast from "react-hot-toast";

import DatalistComponent from "../DatalistComponent";
import { axiosInstance } from "../../libs";
import { TitleTypes } from "../../types";
import { useParams } from "react-router-dom";
import { BiTrendingUp } from "react-icons/bi";

const AddAllowanceOverlay = ({ user_id }: { user_id?: string }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [allowance, setAllowance] = useState<TitleTypes | null>(null);
  const [allowances, setAllowances] = useState<TitleTypes[] | []>([]);
  // general store

  const setIsAddingAllowance = useGeneralStore(
    (state) => state.setIsAddingAllowance
  );

  const setActiveStaff = useGeneralStore((state) => state.setActiveStaff);
  const activeStaff = useGeneralStore((state) => state.activeStaff);

  const closeTab = () => {
    setIsAddingAllowance(false);
    setActiveStaff(null);
    window.location.reload();
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axiosInstance.post("/individualAllowances", {
        amount,
        individual_id: activeStaff?.id,
        name_id: allowance?.id,
      });
      if (response.status == 201) {
        toast.success(response.data.message);
        setAllowance(null);
        setAmount(0);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Adding Allowance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllowances = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/allowanceNames");
        if (response.status == 200) {
          setAllowances(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllowances();
  }, []);

  return (
    <>
      <div
        id="ProcessSalesOverlay"
        className="fixed flex justify-center  md:pt-[20px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
      >
        <div
          className={`
                        relative bg-white w-full max-w-[400px]  h-auto mx-3 p-4 rounded-lg 
                        my-auto
                    `}
        >
          <div className="w-full flex flex-row items-center justify-between px-2 ">
            <div className="flex flex-row items-center justify-start gap-3">
              <span className="text-[30px]">{<BiTrendingUp />}</span>
              <h2 className="header-text whitespace-nowrap">Add Allowance</h2>
            </div>
            <button
              onClick={closeTab}
              className="rounded-full p-1 border border-gray2 text-gray2 hover:text-error hover:border-error hover:shadow-md transition-all duration-200"
            >
              <GrClose />
            </button>
          </div>
          {loading ? (
            <div>Fetching Allowances</div>
          ) : (
            <form
              onSubmit={(e) => submitForm(e)}
              className="px-5 flex flex-col items-start justify-normal gap-2 py-5"
            >
              {/* <div className="w-full flex flex-row items-center justify-evenly gap-4"> */}
              <DatalistComponent
                options={allowances}
                label="Allowance Name"
                placeholder="Select Allowance Name"
                setSelection={setAllowance}
                isDisabled={loading}
                id="allowance-options"
                selection={allowance}
              />
              <TextInputWithLabel
                inputType="number"
                label="Amount"
                onUpdate={setAmount}
                placeholder={`Amount Is Required`}
                string={amount}
                isRequired={true}
                isDisabled={loading}
                error=""
              />
              {/* </div> */}
              <div className="w-2/6 m-auto mt-5">
                <PrimaryButton
                  type={"submit"}
                  title="submit"
                  cusFunc={() => {}}
                  isLoading={loading}
                  isLock={allowance?.id && amount > 0 ? false : true}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddAllowanceOverlay;
