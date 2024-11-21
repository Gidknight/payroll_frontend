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

import { BiTrendingDown } from "react-icons/bi";
import { AUTOMATED_DEDUCTIONS } from "../../constants";

const AddDeductionOverlay = ({ user_id }: { user_id?: string }) => {
  const params = useParams();
  const staff_id = params.id;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [deduction, setDeduction] = useState<TitleTypes | null>(null);
  const [deductions, setDeductions] = useState<TitleTypes[] | []>([]);
  // general store

  const setIsAddingDeduction = useGeneralStore(
    (state) => state.setIsAddingDeduction
  );
  const setActiveStaff = useGeneralStore((state) => state.setActiveStaff);
  const activeStaff = useGeneralStore((state) => state.activeStaff);
  const closeTab = () => {
    setIsAddingDeduction(false);
    setActiveStaff(null);
    window.location.reload();
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axiosInstance.post("/individualDeductions", {
        amount,
        individual_id: activeStaff?.id,
        name_id: deduction?.id,
        name: deduction?.Name,
      });
      if (response.status == 201) {
        toast.success(response.data.message);
        setDeduction(null);
        setAmount(0);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllowances = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/deductionNames");
        if (response.status == 200) {
          setDeductions(response.data);
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
              <span className="text-[30px]">{<BiTrendingDown />}</span>
              <h2 className="header-text whitespace-nowrap">Add Deduction</h2>
            </div>
            <button
              onClick={closeTab}
              className="rounded-full p-1 border border-gray2 text-gray2 hover:text-error hover:border-error hover:shadow-md transition-all duration-200"
            >
              <GrClose />
            </button>
          </div>
          {loading ? (
            <div>Fetching Deductions</div>
          ) : (
            <form
              onSubmit={(e) => submitForm(e)}
              className="px-5 flex flex-col items-start justify-normal gap-2 py-5"
            >
              {/* <div className="w-full flex flex-row items-center justify-evenly gap-4"> */}
              <DatalistComponent
                options={deductions}
                label="Deduction Name"
                placeholder="Select Deduction Name"
                setSelection={setDeduction}
                isDisabled={loading}
                id="deduction-options"
                selection={deduction}
              />
              <TextInputWithLabel
                inputType="number"
                label="Amount"
                onUpdate={setAmount}
                placeholder={`Amount Is Required`}
                string={amount}
                isRequired={true}
                isDisabled={
                  (deduction &&
                    AUTOMATED_DEDUCTIONS.includes(deduction?.Name)) ||
                  loading
                }
                error=""
              />
              {/* </div> */}
              <div className="w-2/6 m-auto mt-5">
                <PrimaryButton
                  type={"submit"}
                  title="submit"
                  cusFunc={() => {}}
                  isLoading={loading}
                  isLock={deduction?.id ? false : true}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddDeductionOverlay;
