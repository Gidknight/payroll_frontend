import {
  ComboBox,
  ErrorCard,
  LoadingComponent,
  PrimaryButton,
  TextInputWithLabel,
} from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../libs";
import {
  AccountTypes,
  SalaryScaleTypes,
  StaffDetailsTypes,
  TitleTypes,
} from "../types";
import StaffLayout from "../layouts/StaffLayout";
import DatalistComponent from "../components/DatalistComponent";
import { JOB_STATUS_OPTIONS } from "../constants";
import toast from "react-hot-toast";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const StaffEditAccountDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);

  // form data
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [sortCode, setSortCode] = useState<string | null>(null);
  const [bankId, setBankId] = useState<TitleTypes | null>(null);
  const [pensionId, setPensionId] = useState<TitleTypes | null>(null);
  const [pensionNumber, setPensionNumber] = useState<string>("");

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      // toast.success(id);
      const response = await axiosInstance.get("/staffs/account-details/" + id);
      // const subs = await getAllSubunits();

      // if (subs.status == 200) {
      //   setSubUnits(subs.data);
      // }
      if (response.status == 200) {
        const account: AccountTypes = response?.data?.account;
        // console.log({ account });
        setStaff(response?.data);
        setAccountNumber(account.account_number);
        setPensionNumber(account?.pension_acct_no || "");
        setSortCode(account.sortcode);
        setBankId({ id: account.bank_name_id, Name: account.bank_name });
        setPensionId({
          id: account.pension_acct_id,
          Name: account?.pension_acct_name || "",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmission = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response;
      if (!staff?.account?.bank_name_id) {
        // create new jobs
        response = await axiosInstance.post(
          "/staffs/account-details/" + params.id,
          {
            account_number: accountNumber,
            bank_id: bankId?.id,
            sortcode: sortCode,
            pension_id: pensionId?.id,
            pension_number: pensionNumber,
          }
        );
      } else {
        // update jobs
        response = await axiosInstance.patch(
          "/staffs/account-details/" + params.id,
          {
            account_number: accountNumber,
            bank_id: bankId?.id,
            sortcode: sortCode,
            pension_id: pensionId?.id,
            pension_number: pensionNumber,
          }
        );
      }
      if (response.status == 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Error Updating Staff Account Details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, []);
  return (
    <StaffLayout
      fullNames={`${staff?.title?.Name || ""} ${staff?.surname} ${
        staff?.firstname
      } ${staff?.other_name || ""}`}
      loading={loading}
      staffNo={staff?.staff_no || ""}
    >
      <div className="w-full ">
        {loading ? (
          <LoadingComponent loading={loading} message="Fetching Account Data" />
        ) : !loading && staff ? (
          <div className="w-full border-live border-t-4 bg-white flex flex-col items-center justify-start p-5">
            <h1 className="header-text text-center pb-5">
              Edit Account Details Form
            </h1>
            <form
              onSubmit={handleSubmission}
              className=" w-full flex flex-col items-center justify-center gap-5"
            >
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  options={staff.bank_names || []}
                  label="Bank Name"
                  placeholder="Bank Name"
                  setSelection={setBankId}
                  isDisabled={loading}
                  id="scale-options"
                  selection={bankId}
                />
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setAccountNumber}
                  placeholder="Account Number"
                  string={accountNumber}
                  isRequired={true}
                  label="Account Number"
                />
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setSortCode}
                  placeholder="Sort Code"
                  string={sortCode}
                  isRequired={false}
                  label="Sort Code"
                />
                <DatalistComponent
                  id="pension-options"
                  options={staff.pension_banks || []}
                  label="Pension Bank"
                  placeholder="Pension Bank"
                  setSelection={setPensionId}
                  isDisabled={loading}
                  selection={pensionId}
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-5">
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setPensionNumber}
                  placeholder="Pension Account Number"
                  string={pensionNumber}
                  isRequired={false}
                  label="Pension Account Number"
                />
                <div className="w-full">
                  <div className="w-40">
                    <PrimaryButton
                      title={
                        !staff?.account?.bank_name_id ? "Create" : "Update"
                      }
                      isLoading={loading}
                      cusFunc={() => {}}
                      isLock={!bankId?.id && !accountNumber ? true : false}
                      type={"submit"}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <ErrorCard errorMessage="No Data To Display" />
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffEditAccountDetailsPage;
