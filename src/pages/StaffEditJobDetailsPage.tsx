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

const StaffEditJobDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);

  // form data
  const [totalMonth, setTotalMonth] = useState<number | null>(null);
  const [payableMonth, setPayableMonth] = useState<number | null>(null);
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
              Edit Job Details Form
            </h1>
            <form className=" w-full flex flex-col items-center justify-center gap-5">
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  options={staff.salary_scales || []}
                  label="Salary Scale"
                  placeholder="Salary Scale"
                  setSelection={setSelectedSalaryScale}
                  isDisabled={loading}
                  id="scale-options"
                />
                <TextInputWithLabel
                  inputType="date"
                  onUpdate={setTotalMonth}
                  placeholder="Hired Date"
                  string={totalMonth}
                  isRequired={true}
                  label="Hired Date"
                />
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setTotalMonth}
                  placeholder="Total Days Of Month"
                  string={totalMonth}
                  isRequired={true}
                  label="Total Days In Month"
                />
                <TextInputWithLabel
                  inputType="number"
                  onUpdate={setPayableMonth}
                  placeholder="Payable Days In Month"
                  string={payableMonth}
                  isRequired={true}
                  label="Payable Days In Month"
                />
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <ComboBox
                  label="Academic | Non Academic"
                  options={[
                    { id: "Academic", Name: "Academic" },
                    { id: "Non Academic", Name: "Non Academic" },
                  ]}
                  onSelect={setStaffType}
                  id="staff-type"
                  value={staffType}
                  defaultMessage="-- Select Staff Type --"
                  isDisabled={loading}
                />
                <DatalistComponent
                  id="division-options"
                  options={staff.job_divisions || []}
                  label="Job Division"
                  placeholder="Job Division"
                  setSelection={setSelectedDivision}
                  isDisabled={loading}
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-5">
                <ComboBox
                  label="Job Status"
                  options={JOB_STATUS_OPTIONS}
                  onSelect={setStaffType}
                  id="job-status"
                  value={staffType}
                  defaultMessage="-- Select Job Status --"
                  isDisabled={loading}
                />
                <ComboBox
                  label="Salary Status"
                  options={JOB_STATUS_OPTIONS}
                  onSelect={setStaffType}
                  id="salary-status"
                  value={staffType}
                  defaultMessage="-- Select Salary Status --"
                  isDisabled={loading}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  id="unit-options"
                  options={staff.units || []}
                  label="Unit | Faculty"
                  placeholder="Unit | Faculty"
                  setSelection={setSelectedDivision}
                  isDisabled={loading}
                />
                <DatalistComponent
                  id="sub-unit-options"
                  options={staff.sub_units || []}
                  label="Sub Unit | Faculty"
                  placeholder="Sub Unit | Faculty"
                  setSelection={setSelectedDivision}
                  isDisabled={loading}
                />
              </div>
              <div className="w-40">
                <PrimaryButton title="Save" />
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

export default StaffEditJobDetailsPage;
