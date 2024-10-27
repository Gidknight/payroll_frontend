import {
  ComboBox,
  PrimaryButton,
  SecondaryButton,
  TextInputWithLabel,
} from "../components";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "../libs";
import { ShowErrorObject, StaffDetailsTypes, TitleTypes } from "../types";
import StaffLayout from "../layouts/StaffLayout";
import toast from "react-hot-toast";

const StaffEditBiodataPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // form data
  const [surName, setSurName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [estNumber, setEstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const [selectedTitle, setSelectedTitle] = useState<TitleTypes | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState<ShowErrorObject | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null);
    let isError = false;

    if (!productName) {
      setError({ type: "name", message: "A Name is required" });
      isError = true;
    } else if (price <= 0) {
      setError({ type: "price", message: "Price is required" });
      isError = true;
    } else if (quantity <= 0) {
      setError({ type: "quantity", message: "Quantity is required" });
      isError = true;
    } else if (errorMessage == "category_id" || !category) {
      setError({ type: "category", message: "A Category is Required" });
      isError = true;
    } else if (errorMessage == "supplier_id" || !supplier) {
      setError({ type: "supplier", message: "A Supplier is Required" });
      isError = true;
    } else if (statusCode == 409) {
      setError({ type: "name", message: "Product Name Already Exist" });
      isError = true;
    }
    return isError;
  };

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
        setSelectedTitle(response?.data?.title);
        setSurName(response?.data?.surname);
        setFirstName(response?.data?.firstname);
        setOtherNames(response?.data?.other_name);
        setStaffNumber(response?.data?.staff_no);
        setEstNumber(response?.data?.other_no);
        setEmail(response?.data?.email_address);
        setDob(response?.data?.dob);
        setStaff(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = validate();
    if (isError) return;
    try {
      setIsCreating(true);

      const formData = {
        title_id: selectedTitle,
        surname: surName,
        first_name: firstName,
        other_names: otherNames,
        staff_no: staffNumber,
        email_address: email,
        est_number: estNumber,
        dob: dob,
      };
      const response = await axiosInstance.post("/staffs", formData);
      if (response.status == 201) {
        const id = response.data.id;
        navigate(`/staffs/${id}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Creating New Staff");
    } finally {
      setIsCreating(false);
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
            <h1 className="header-text text-center pb-5">Edit Staff Biodata</h1>

            <form
              onSubmit={submitForm}
              className="w-full flex flex-col items-center justify-start gap-4"
            >
              <div className="flex flex-row items-center justify-evenly gap-10 w-full">
                <ComboBox
                  defaultMessage={"-- Select Title --"}
                  value={selectedTitle}
                  showDefault={true}
                  id={"title"}
                  isDisabled={false}
                  label={"Title"}
                  onSelect={setSelectedTitle}
                  options={staff.titles}
                  error={""}
                  subLabel={""}
                />
                <TextInputWithLabel
                  inputType="text"
                  placeholder="SurName"
                  string={surName}
                  onUpdate={setSurName}
                  isDisabled={false}
                  label="Last Name"
                  error={showError("lastname")}
                />
              </div>

              <div className="flex flex-row items-center justify-evenly gap-10 w-full">
                <TextInputWithLabel
                  inputType="text"
                  placeholder="First Name"
                  string={firstName}
                  onUpdate={setFirstName}
                  isDisabled={false}
                  label="First Name"
                  error={showError("firstname")}
                />

                <TextInputWithLabel
                  inputType="text"
                  placeholder="Other Names"
                  string={otherNames}
                  onUpdate={setOtherNames}
                  isDisabled={false}
                  label="Other Names"
                  error={showError("othernames")}
                />
              </div>

              <div className="flex flex-row items-center justify-evenly gap-10 w-full">
                <TextInputWithLabel
                  inputType="text"
                  placeholder="Staff Number"
                  string={staffNumber}
                  onUpdate={setStaffNumber}
                  isDisabled={false}
                  label="Staff Number"
                  error={""}
                  isRequired={false}
                />{" "}
                <TextInputWithLabel
                  inputType="text"
                  placeholder="Establishment Number"
                  string={estNumber}
                  onUpdate={setEstNumber}
                  isDisabled={false}
                  label="Establishment Number"
                  error={""}
                  isRequired={false}
                />
              </div>

              <div className="flex flex-row items-center justify-evenly gap-10 w-full">
                <TextInputWithLabel
                  inputType="email"
                  placeholder="example@email.com"
                  string={email}
                  onUpdate={setEmail}
                  isDisabled={false}
                  label="Email Address"
                  error={""}
                  isRequired={false}
                />
                <TextInputWithLabel
                  inputType="date"
                  placeholder="Date Of Birth"
                  string={dob}
                  onUpdate={setDob}
                  isDisabled={false}
                  label="Date Of Birth"
                  error={""}
                  isRequired={false}
                  second_text={dob}
                />
              </div>

              <div className="flex flex-row items-end justify-evenly gap-10">
                <PrimaryButton
                  title="submit"
                  type={"submit"}
                  cusFunc={() => {}}
                  isLoading={isCreating}
                  isLock={
                    !surName || !firstName || !email || !dob ? true : false
                  }
                />
                <SecondaryButton
                  title="clear"
                  cusFunc={() => {}}
                  isLoading={isLoading}
                  isLock={false}
                />
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

export default StaffEditBiodataPage;
