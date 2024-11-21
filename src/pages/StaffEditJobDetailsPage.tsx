import {
  ComboBox,
  ErrorCard,
  LoadingComponent,
  PrimaryButton,
  TextInputWithLabel,
} from "../components";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../libs";
import {
  JobsTypes,
  SalaryScaleTypes,
  StaffDetailsTypes,
  TitleTypes,
} from "../types";
import StaffLayout from "../layouts/StaffLayout";
import DatalistComponent from "../components/DatalistComponent";
import { JOB_STATUS_OPTIONS } from "../constants";
import toast from "react-hot-toast";
import moment from "moment";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const StaffEditJobDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);

  // form data
  const [totalMonth, setTotalMonth] = useState<number>(0);
  const [payableMonth, setPayableMonth] = useState<number>(0);
  const [salaryScale, setSalaryScale] = useState<TitleTypes | null>(null);
  const [division, setDivision] = useState<TitleTypes | null>(null);
  const [designation, setDesignation] = useState<TitleTypes | null>(null);
  const [classification, setClassification] = useState<TitleTypes | null>(null);
  const [unit, setUnit] = useState<TitleTypes | null>(null);
  const [subunit, setSubunit] = useState<TitleTypes | null>(null);
  const [allSubunit, setAllSubunit] = useState<TitleTypes[] | null>(null);

  const [hiredDate, setHiredDate] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      // toast.success(id);
      const response = await axiosInstance.post("/staffs/job-details/" + id, {
        unit_id: unit?.id || null,
      });
      // const subs = await getAllSubunits();

      // if (subs.status == 200) {
      //   setSubUnits(subs.data);
      // }
      if (response.status == 200) {
        const job: JobsTypes = response.data.jobs;
        // console.log(job);
        let formated_date = "";
        if (job?.hired_date) {
          formated_date = moment(job?.hired_date, "MMM DD YYYY hh:mmA").format(
            "MM/DD/YYYY"
          );
        }
        setStaff(response.data);
        setSalaryScale(job?.salary_scale);
        setClassification(job?.classification);
        setDivision(job?.division);
        setDesignation(job?.designation);
        setSubunit(job?.sub_unit);
        setUnit(job?.unit);
        setTotalMonth(job.total_month);
        setPayableMonth(job.payable_month);
        setJobStatus(job.status || "");
        setHiredDate(formated_date);
        setAllSubunit(job.all_sub_units);
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
      if (!staff?.jobs?.hired_date) {
        // create new jobs
        response = await axiosInstance.patch(
          "/staffs/job-details/" + params.id,
          {
            salary_scale: salaryScale?.id,
            hired_date: hiredDate,
            total_days_in_month: totalMonth,
            payable_days_in_month: payableMonth,
            // staff_type: staffType,
            division: division?.id,
            designation: designation?.id,
            job_status: jobStatus,
            classification_id: classification?.id,
            // unit: selectedUnit?.id,
            sub_unit: subunit?.id,
          }
        );
      } else {
        // update jobs
        response = await axiosInstance.put("/staffs/job-details/" + params.id, {
          salary_scale: salaryScale?.id,
          hired_date: hiredDate,
          total_days_in_month: totalMonth,
          payable_days_in_month: payableMonth,
          // staff_type: staffType,
          division: division?.id,
          designation: designation?.id,
          job_status: jobStatus,
          classification_id: classification?.id,
          // unit: selectedUnit?.id,
          sub_unit: subunit?.id,
        });
      }

      if (response?.status == 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Staff's Details");
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = (unitId) => {};

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
          <LoadingComponent loading={loading} message="Fetching Bio Data" />
        ) : !loading && staff ? (
          <div className="w-full border-live border-t-4 bg-white flex flex-col items-center justify-start p-5">
            <h1 className="header-text text-center pb-5">
              Edit Job Details Form
            </h1>
            <form
              onSubmit={handleSubmission}
              className=" w-full flex flex-col items-center justify-center gap-5"
            >
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  options={staff?.salary_scales || []}
                  label="Salary Scale"
                  placeholder="Salary Scale"
                  setSelection={setSalaryScale}
                  isDisabled={loading}
                  id="scale-options"
                  selection={salaryScale}
                />
                <TextInputWithLabel
                  inputType="date"
                  onUpdate={setHiredDate}
                  placeholder="Hired Date"
                  string={hiredDate}
                  isRequired={false}
                  label="Hired Date"
                  second_text={staff?.jobs?.hired_date}
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
                <DatalistComponent
                  id="division-options"
                  options={staff.job_divisions || []}
                  label="Job Division"
                  placeholder="Job Division"
                  setSelection={setDivision}
                  isDisabled={loading}
                  selection={division}
                />
                <DatalistComponent
                  id="designations-options"
                  options={staff.designations || []}
                  label="Designation"
                  placeholder="Designation"
                  setSelection={setDesignation}
                  isDisabled={loading}
                  selection={designation}
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  label="Classification"
                  options={staff.classifications || []}
                  setSelection={setClassification}
                  id="staff-classification"
                  selection={classification}
                  placeholder="Select Class"
                  isDisabled={loading}
                />
                <ComboBox
                  label="Job Status"
                  options={JOB_STATUS_OPTIONS}
                  onSelect={setJobStatus}
                  id="job-status"
                  value={jobStatus}
                  defaultMessage="-- Select Job Status --"
                  isDisabled={loading}
                />
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-5">
                <DatalistComponent
                  id="unit-options"
                  options={staff.units || []}
                  label="Unit | Faculty"
                  placeholder="Unit | Faculty"
                  setSelection={setUnit}
                  isDisabled={loading}
                  selection={unit}
                />
                <DatalistComponent
                  id="sub-unit-options"
                  options={staff.sub_units || []}
                  label="Sub Unit | Faculty"
                  placeholder="Sub Unit | Faculty"
                  setSelection={setSubunit}
                  isDisabled={loading}
                  selection={subunit}
                />
              </div>
              {/* <div className="w-full flex flex-row items-center justify-evenly gap-5"> */}
              {/* <div className="w-1/2"></div> */}
              {/* <div className="w-1/2 flex"> */}
              <div className="w-40">
                <PrimaryButton
                  title={!staff?.jobs?.hired_date ? "Create New" : "Update"}
                  isLoading={loading}
                  cusFunc={() => {}}
                  type={"submit"}
                  isLock={!salaryScale ? true : false}
                />
              </div>
              {/* </div> */}
              {/* </div> */}
            </form>
          </div>
        ) : (
          <ErrorCard errorMessage="No Data To Display" />
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffEditJobDetailsPage;
