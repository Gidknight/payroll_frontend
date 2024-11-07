import { Link } from "react-router-dom";
import TextWithLabel from "./TextWithLabel";
import { BiPrinter } from "react-icons/bi";
import {
  AllowanceTypes,
  DeductionTypes,
  IndividualAllowanceTypes,
  StaffDetailsTypes,
  SubUnitTypes,
} from "../types";
import WebButton from "./WebButton";
import { MdEmail } from "react-icons/md";
import EditableField from "./EditableField";
import { useEffect, useState } from "react";
import EditableDatalist from "./EditableDatalist";
import { JOB_LEVELS, JOB_STEPS } from "../constants";
import SecondaryButton from "./SecondaryButton";
import ClickableField from "./ClickableField";
import { useGeneralStore } from "../stores/general";
import toast from "react-hot-toast";
import { axiosInstance } from "../libs";

const StaffData = ({
  data,
}: {
  data: StaffDetailsTypes;
  // subUnits: SubUnitTypes[];
}) => {
  const [loading, setLoading] = useState(false);

  const setIsAddingAllowance = useGeneralStore(
    (state) => state.setIsAddingAllowance
  );

  const setIsAddingDeduction = useGeneralStore(
    (state) => state.setIsAddingDeduction
  );

  const setActiveStaff = useGeneralStore((state) => state.setActiveStaff);

  return (
    <div className="space-y-5 mb-20">
      <div className=" w-full flex flex-col gap-4 bg-white p-2 shadow-lg border-t-4 border-live">
        <div className="w-full flex flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex items-center justify-center gap-2 px-3 py-1 bg-white shadow-md rounded-full ">
              <p className="font-bold">Slip Status:</p>
              <p
                className={`text-center text-lg font-bold capitalize ${
                  data?.slip_status === "sent"
                    ? "text-green-700"
                    : data?.slip_status === "failed"
                    ? "text-red-600"
                    : "text-yellow-500"
                }`}
              >
                {data?.slip_status}
              </p>
            </div>
            <WebButton
              icon={<MdEmail />}
              text={
                data?.slip_status === "sent"
                  ? "Send Another"
                  : data?.slip_status === "failed"
                  ? "Try Again"
                  : "Send Payslip"
              }
              staff_id={data?.id}
              purpose="single"
            />
          </div>

          <Link to={`/staffs/payslip/${data?.id}`}>
            <button className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-400 hover:bg-yellow-600 hover:text-white hover:shadow-md transition-all duration-300">
              <span>
                <BiPrinter />
              </span>
              <span>View Payslip</span>
            </button>
          </Link>
        </div>

        <div className="flex flex-flex w-full items-start justify-between gap-10">
          <div className="space-y-2 px-5 py-2 w-1/2">
            <TextWithLabel label="Title" text={data?.title.Name} cap={false} />
            <TextWithLabel
              label="Staff Number"
              text={data?.staff_no}
              cap={false}
            />
            <TextWithLabel label="Surname" text={data?.surname} cap={false} />
            <TextWithLabel
              label="first name"
              text={data?.firstname}
              cap={false}
            />

            <TextWithLabel
              label="other names"
              text={data?.other_name || ""}
              cap={false}
            />
            <TextWithLabel label="gender" text={data?.gender} cap={false} />
            <TextWithLabel
              label="email address"
              text={data?.email_address}
              cap={false}
            />
          </div>
          <div className="w-1/2">
            <TextWithLabel
              label="Sub Unit"
              text={data?.jobs?.sub_unit?.Name?.trim()}
              cap={false}
            />
            <TextWithLabel
              label="Salary Scale"
              text={data?.jobs?.salary_scale?.name}
              cap={false}
            />
            <TextWithLabel
              label="Level"
              text={data?.jobs?.salary_scale?.level}
              cap={false}
            />
            <TextWithLabel
              label="Step"
              text={data?.jobs?.salary_scale?.step}
              cap={false}
            />
            <TextWithLabel
              label="Bank Name"
              text={data?.account?.bank_name}
              cap={false}
            />

            <TextWithLabel
              label="Account Number"
              text={data?.account?.account_number}
              cap={false}
            />

            <TextWithLabel
              label="pension account name"
              text={data?.account?.pension_acct_name}
              cap={false}
            />

            <TextWithLabel
              label="pension Account Number"
              text={data?.account?.pension_acct_no}
              cap={false}
            />
            <TextWithLabel
              label="current month"
              text={data?.jobs?.month + " - " + data?.jobs?.year}
              cap={false}
            />
          </div>
        </div>
      </div>

      {/* allowances & deductions */}
      <div>
        <div className="w-full flex flex-row items-start justify-evenly gap-10 pt-5">
          <div id="allowances" className="w-1/2 py-3 rounded-sm">
            <div className="flex flex-row items-center justify-between w-full pb-2">
              <h2 className="font-bold text-center text-2xl text-nowrap">
                Earning Summary
              </h2>
              <div>
                <SecondaryButton
                  cusFunc={() => {
                    setIsAddingDeduction(false);
                    setActiveStaff({ id: data?.id });
                    setIsAddingAllowance(true);
                  }}
                  isLoading={loading}
                  title="+ Add Allowance"
                  isLock={loading}
                />
              </div>
            </div>
            {data?.allowances ? (
              <div className="space-y-1 bg-green-100">
                <div className="w-full flex flex-row items-center justify-between pt-2 px-4 border-b-2 border-slate-500 text-lg text-slate-800 font-bold">
                  <p>Detail</p>
                  <p>Amount (NGN)</p>
                </div>
                <div className=" px-5 ">
                  <TextWithLabel
                    label="Basic Salary"
                    text={`NGN ${parseFloat(
                      String(data?.payable_amount)
                    )?.toLocaleString("en-US")}`}
                  />
                </div>
                {data?.allowances.map(
                  (allow: IndividualAllowanceTypes, index: any) => (
                    <div key={index} className=" px-5 ">
                      <ClickableField
                        label={allow?.AllowanceNames?.Name}
                        text={allow?.Amount}
                        cap={false}
                        bold={false}
                        inputType={"number"}
                        loading={loading}
                        id={allow.id}
                        type="allowance"
                        setLoading={setLoading}
                      />
                    </div>
                  )
                )}

                <div className=" py-2 px-5 rounded-t-xl border-t border-slate-500 shadow-md">
                  <TextWithLabel
                    label="Total Allowance"
                    text={
                      "NGN " +
                      parseFloat(String(data?.total_allowance))?.toLocaleString(
                        "en-US"
                      )
                    }
                    cap={true}
                    bold={true}
                  />
                  <TextWithLabel
                    label="Gross Pay"
                    text={
                      "NGN " +
                      parseFloat(data?.gross_pay)?.toLocaleString("en-US")
                    }
                    cap={true}
                    bold={true}
                  />
                  <TextWithLabel
                    label="Net Pay"
                    text={
                      "NGN " +
                      parseFloat(data?.net_pay)?.toLocaleString("en-US")
                    }
                    cap={true}
                    bold={true}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center font-semibold text-lg text-gray-500 capitalize">
                no allowance this month
              </p>
            )}
          </div>
          <div id="deductions" className="w-1/2  py-3">
            {/* deduction */}
            <div className="flex flex-row items-center justify-between w-full pb-2">
              <h2 className="font-bold text-center text-2xl text-nowrap">
                Deductions Summary
              </h2>
              <div>
                <SecondaryButton
                  cusFunc={() => {
                    setIsAddingAllowance(false);
                    setActiveStaff({ id: data?.id });
                    setIsAddingDeduction(true);
                  }}
                  isLoading={loading}
                  title="+ Add Deduction"
                  isLock={loading}
                />
              </div>
            </div>

            {data?.deductions && data?.total_deduction > 0 ? (
              <div className="space-y-1 bg-red-100">
                <div className="w-full flex flex-row items-center justify-between pt-2 px-4 border-b-2 border-slate-500 text-lg text-slate-800 font-bold">
                  <p>Detail</p>
                  <p>Amount (NGN)</p>
                </div>
                {data?.deductions.map((deduct: DeductionTypes, index: any) => (
                  <div key={index} className=" px-5 ">
                    <ClickableField
                      label={deduct?.DeductionNames?.Name}
                      text={deduct?.Amount}
                      cap={false}
                      bold={false}
                      id={deduct?.id || 0}
                      inputType={"number"}
                      loading={loading}
                      setLoading={setLoading}
                      type="deduction"
                    />
                  </div>
                ))}
                <div className=" py-2 px-5 rounded-t-xl border-t border-slate-500 shadow-md">
                  <TextWithLabel
                    label="Total Deduction"
                    text={
                      "NGN " +
                      parseFloat(String(data?.total_deduction))?.toLocaleString(
                        "en-US"
                      )
                    }
                    cap={true}
                    bold={true}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center font-semibold text-lg text-gray-500 capitalize bg-red-100">
                no deduction this month
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffData;
