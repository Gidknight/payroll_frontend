import PageLayout from "../layouts/PageLayout";

import { SALARY_CONFIG_PAGES } from "../constants";
import { useEffect, useState } from "react";
import { AllowanceTypes } from "../types";
import { axiosInstance } from "../libs";
import toast from "react-hot-toast";
import Deletor from "../components/forms/Deletor";
import {
  AllowDeductForm,
  AllowDeductTable,
  PrimaryButton,
  TextInputWithCopy,
  TextInputWithLabel,
} from "../components";

const DeductionConfigPage = () => {
  const [loading, setLoading] = useState(false);
  const [deductions, setDeductions] = useState<AllowanceTypes[]>([]);

  const [updating, setUpdating] = useState(false);
  const [titleID, setTitleID] = useState<number>(0);
  const [titleName, setTitleName] = useState("");
  const [code, setCode] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");

  const [selected, setSelected] = useState<AllowanceTypes | null>(null);
  const handleSelect = async (id: number) => {
    if (id) {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/deductionNames/" + id);
        if (response.status == 200) {
          const data: AllowanceTypes = response.data;
          setSelected(data);
          setTitleName(data.Name);
          setTitleID(data.id);
          setCode(data.Codes || "");
          setAccountName(data.AccountName || "");
          setAccountNumber(data.AccountNumber || "");
        }
      } catch (error) {
        toast.error("Error getting Deduction Details");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (titleID) {
      try {
        setUpdating(true);
        const response = await axiosInstance.patch(
          `/deductionNames/${titleID}`,
          {
            name: titleName?.toUpperCase(),
            account_name: accountName?.toUpperCase(),
            account_no: accountNumber,
            code,
          }
        );

        if (response?.status == 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        toast.error("Error Updating Deduction Details");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (titleID) {
      try {
        setUpdating(true);
        const response = await axiosInstance.delete(
          `/deductionNames/${titleID}`
        );

        if (response?.status == 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        toast.error("Error Deleting Deduction");
      } finally {
        setUpdating(false);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/deductionNames");
        if (response.status == 200) {
          const data: AllowanceTypes[] = response.data;
          setDeductions(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <PageLayout
      location="Deduction Configuration"
      subtext=""
      loading={false}
      pages={SALARY_CONFIG_PAGES}
    >
      <AllowDeductForm purpose="deduction" />
      <div className="flex flex-row items-start justify-evenly w-full gap-10">
        <div className="w-1/2">
          <AllowDeductTable
            data={deductions}
            showFunction={handleSelect}
            title="Deductions"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center justify-start gap-10">
          <div
            className={`w-full border-t-4 bg-white py-2 flex flex-col items-center justify-center ${
              selected ? " border-live" : " border-secondary"
            }`}
          >
            <h2 className="header-text text-center">Edit Panel</h2>

            <div className="w-full">
              {loading && (
                <div>
                  <p className="text-center p-2 font-bold text-slate-700 animate-pulse">
                    Fetching Deduction Details...
                  </p>
                </div>
              )}
              {!loading && selected && (
                <div className="w-full py-5 px-10">
                  <TextInputWithCopy
                    inputType="number"
                    label="Deduction ID"
                    value={String(selected.id)}
                  />
                  <TextInputWithLabel
                    inputType="text"
                    isDisabled={updating}
                    isRequired={true}
                    label="Name"
                    string={titleName}
                    onUpdate={setTitleName}
                    placeholder={selected?.Name || "Name Is Required"}
                    error=""
                  />
                  <TextInputWithLabel
                    inputType="text"
                    isDisabled={updating}
                    isRequired={true}
                    label="Code"
                    string={code}
                    onUpdate={setCode}
                    placeholder={selected?.Codes || "Please Provide Codes"}
                    error=""
                  />
                  <TextInputWithLabel
                    inputType="text"
                    isDisabled={updating}
                    isRequired={true}
                    label="Account Names"
                    string={accountName}
                    onUpdate={setAccountName}
                    placeholder={
                      selected?.AccountName || "Please Provide Account Name"
                    }
                    error=""
                  />
                  <TextInputWithLabel
                    inputType="number"
                    isDisabled={updating}
                    isRequired={true}
                    label="Account Number"
                    string={accountNumber}
                    onUpdate={setAccountNumber}
                    placeholder={
                      selected?.AccountNumber || "Please Provide Account Number"
                    }
                    error=""
                  />

                  <div className="w-full flex flex-row items-center justify-end  py-2">
                    <PrimaryButton
                      cusFunc={handleUpdate}
                      isLock={loading || updating || !titleName}
                      isLoading={updating}
                      title="Submit"
                      type={"submit"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {selected && (
            <Deletor
              answer={String(selected.id)}
              label="Delete Deduction"
              placeholder="Deduction Id Must Be Provided"
              question="Provide the Deduction ID"
              deleteFunction={handleDelete}
              user_id=""
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default DeductionConfigPage;
