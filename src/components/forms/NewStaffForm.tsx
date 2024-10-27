import { FormEvent, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  TextInputWithLabel,
  ComboBox,
  PrimaryButton,
  SecondaryButton,
} from "..";
import { ShowErrorObject, TitleTypes } from "../../types";
import { getAllTitles } from "../../utils/requests";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";
import { axiosInstance } from "../../libs";
import { useNavigate, useNavigation } from "react-router-dom";

const NewStaffForm = (): JSX.Element => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.userAuth);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [surName, setSurName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [estNumber, setEstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [titles, setTitles] = useState<TitleTypes[]>([]);
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

  const cancelAdd = () => {
    setProductName("");
    setPrice(0);
    setQuantity(0);
    setThreshold(1);
    setCategory("");
    setSupplier("");
    setDescription("");
    setIsRetail(false);
    setUnitID(0);
    setUnitPrice(0);
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
        navigate(`/staff/view-data/${id}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Creating New Staff");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllTitles();
        if (response.status == 200) {
          setTitles(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="text-[30px]">{<MdAdd />}</span>
        <h2 className="header-text whitespace-nowrap ">staff form</h2>
      </div>
      <form
        onSubmit={submitForm}
        className="w-full flex flex-col items-center justify-start gap-4"
      >
        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <ComboBox
            defaultMessage={"-- Select Title --"}
            value={selectedTitle}
            showDefault={true}
            id={"title"}
            isDisabled={false}
            label={"Title"}
            onSelect={setSelectedTitle}
            options={titles}
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

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
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

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
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

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
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
          />
        </div>

        <div className="flex flex-row items-end justify-evenly gap-5">
          <PrimaryButton
            title="submit"
            type={"submit"}
            cusFunc={() => {}}
            isLoading={isCreating}
            isLock={!surName || !firstName || !email || !dob ? true : false}
          />
          <SecondaryButton
            title="clear"
            cusFunc={cancelAdd}
            isLoading={isLoading}
            isLock={false}
          />
        </div>
      </form>
    </div>
  );
};

export default NewStaffForm;
