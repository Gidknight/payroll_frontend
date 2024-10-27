import { ComboBox, PrimaryButton, TextInputWithLabel } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../libs";
import { SalaryScaleTypes, StaffDetailsTypes, TitleTypes } from "../types";
import StaffLayout from "../layouts/StaffLayout";
import DatalistComponent from "../components/DatalistComponent";
import { JOB_STATUS_OPTIONS } from "../constants";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const StaffEditAccountDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);

  // form data
  const [accountNmuber, setAccountNmuber] = useState<string | null>(null);
  const [sortCode, setSortCode] = useState<string | null>(null);
  const [staffType, setStaffType] = useState<string | null>("");
  const [selectedSalaryScale, setSelectedSalaryScale] =
    useState<SalaryScaleTypes | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<TitleTypes | null>(
    null
  );

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      // toast.success(id);
      const response = await axiosInstance.get("/staffs/" + id);
      // const subs = await getAllSubunits();

      // if (subs.status == 200) {
      //   setSubUnits(subs.data);
      // }
      if (response.status == 200) {
        setStaff(response.data);
      }
    } catch (error) {
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
      fullNames={`${staff?.title || ""} ${staff?.surname} ${staff?.firstname} ${
        staff?.other_name
      }`}
      loading={loading}
      staffNo={staff?.staff_no || ""}
    >
      <div className="w-full ">
        {staff ? (
          <div className="w-full border-live border-t-4 bg-white flex flex-col items-center justify-start p-5">
            <h1 className="header-text text-center pb-5">
              Edit Account Details Form
            </h1>
            <form className=" w-full flex flex-col items-center justify-center gap-5">
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  options={staff.bank_names || []}
                  label="Bank Name"
                  placeholder="Bank Name"
                  setSelection={setSelectedSalaryScale}
                  isDisabled={loading}
                  id="scale-options"
                />
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setAccountNmuber}
                  placeholder="Account Number"
                  string={accountNmuber}
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
                  isRequired={true}
                  label="Sort Code"
                />
                <DatalistComponent
                  id="pension-options"
                  options={staff.pension_banks || []}
                  label="Pension Bank"
                  placeholder="Pension Bank"
                  setSelection={setSelectedDivision}
                  isDisabled={loading}
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-5">
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setSortCode}
                  placeholder="Pension Account Number"
                  string={sortCode}
                  isRequired={true}
                  label="Pension Account Number"
                />
                <div className="w-full">
                  <div className="w-40">
                    <PrimaryButton title="Save" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center">No Data To Display</p>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffEditAccountDetailsPage;
