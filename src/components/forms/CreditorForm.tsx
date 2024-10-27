import { useState } from "react";
import { GrSecure } from "react-icons/gr";
import { MdEmail, MdPersonAdd } from "react-icons/md";
import { BiCalendar, BiMobile, BiMoney, BiUser } from "react-icons/bi";
import { ShowErrorObject } from "../../types";
import { TextAreaWithLabel, PrimaryButton, TextInputWithLabel } from "..";
import toast from "react-hot-toast";
import { createCustomer } from "../../utils/requests";
import { useAuthStore } from "@renderer/stores/authStore";

const CreditorForm = (): JSX.Element => {
  const user = useAuthStore((state) => state.userAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [bvn, setBVN] = useState("");
  const [nin, setNIN] = useState("");
  const [deposit, setDeposit] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

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

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!dob) {
      setError({ type: "dob", message: "A Username is required" });
      isError = true;
    } else if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!firstName) {
      setError({ type: "firstName", message: "A First Name is required" });
      isError = true;
    } else if (!lastName) {
      setError({ type: "lastName", message: "A Last Name is required" });
      isError = true;
    } else if (!bvn) {
      setError({ type: "bvn", message: "Customer's BVN is required" });
      isError = true;
    } else if (!nin) {
      setError({ type: "nin", message: "Customer's NIN is required" });
      isError = true;
    } else if (!deposit) {
      setError({ type: "deposit", message: "Initial Deposit is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (mobileNumber.toString().length !== 11) {
      setError({
        type: "contact",
        message: "Input a valid mobile number",
      });
      isError = true;
    } else if (bvn.toString().length !== 11) {
      setError({
        type: "bvn",
        message: "Input a valid BVN",
      });
      isError = true;
    } else if (nin.toString().length !== 11) {
      setError({
        type: "nin",
        message: "Input a valid NIN",
      });
      isError = true;
    }
    return isError;
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setOtherName("");
    setCurrentAddress("");
    setDob("");
    setMobileNumber("");
    setEmail("");
    setNIN("");
    setBVN("");
    setDeposit("");
  };
  const submitForm = async (e: any) => {
    e.preventDefault();

    let isError = validate();
    if (isError) return;
    try {
      setIsLoading(true);
      const response = await createCustomer({
        user_id: user.id,
        last_name: lastName,
        first_name: firstName,
        contact: mobileNumber,
        address: currentAddress,
        other_name: otherName,
        dob,
        email,
        nin,
        bvn,
        deposit,
      });
      if (response?.status == 201) {
        toast.success(response.data.message);
        clearForm();
        window.location.reload();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: Customer Not Created");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="text-[30px]">{<MdPersonAdd />}</span>
        <h2 className="header-text whitespace-nowrap">Create new Customer</h2>
      </div>

      <form
        onSubmit={submitForm}
        className="w-full flex flex-col items-center justify-start gap-4"
      >
        {/* <h2 className="text-xl font-semibold capitalize text-gray2 bg-gray1 px-2 rounded-lg">
          Bio Data Info
        </h2> */}
        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="text"
            placeholder="Last Name"
            string={lastName}
            onUpdate={setLastName}
            icon={<BiUser />}
            isDisabled={isLoading}
            label="Last Name"
            error={showError("lastName")}
          />
          <TextInputWithLabel
            inputType="text"
            placeholder="First Name"
            string={firstName}
            onUpdate={setFirstName}
            icon={<BiUser />}
            isDisabled={isLoading}
            label="First Name"
            error={showError("firstName")}
          />
        </div>

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="text"
            placeholder="Other Name"
            string={otherName}
            onUpdate={setOtherName}
            icon={<BiUser />}
            isDisabled={isLoading}
            label="Other Name"
            error={showError("otherName")}
            isRequired={false}
          />
          <TextInputWithLabel
            inputType="date"
            placeholder="Date Of Birth"
            string={dob}
            onUpdate={setDob}
            icon={<BiCalendar />}
            isDisabled={isLoading}
            label="Date Of Birth"
            error={showError("dob")}
            isRequired={true}
          />
        </div>
        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="email"
            placeholder="example@email.com"
            string={email}
            onUpdate={setEmail}
            icon={<MdEmail />}
            isDisabled={isLoading}
            label="Customer Email"
            error={showError("email")}
          />

          <TextInputWithLabel
            inputType="number"
            placeholder="080xxxxxxxx"
            string={mobileNumber}
            onUpdate={setMobileNumber}
            icon={<BiMobile />}
            isDisabled={isLoading}
            label="Mobile Number"
            error={showError("contact")}
          />
        </div>

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="number"
            placeholder="National Identification Number"
            string={nin}
            onUpdate={setNIN}
            icon={<GrSecure />}
            isDisabled={isLoading}
            label="NIN"
            error={showError("nin")}
          />
          <TextInputWithLabel
            inputType="number"
            placeholder="Bank Verification Number"
            string={bvn}
            onUpdate={setBVN}
            icon={<GrSecure />}
            isDisabled={isLoading}
            label="BVN"
            error={showError("bvn")}
          />
        </div>

        <div className="flex flex-row items-start justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="number"
            placeholder="Initial Deposit"
            string={deposit}
            onUpdate={setDeposit}
            icon={<BiMoney />}
            isDisabled={isLoading}
            label="Initial Deposit"
            error={showError("deposit")}
          />
          <TextAreaWithLabel
            placeholder="Current Address"
            string={currentAddress}
            onUpdate={setCurrentAddress}
            isDisabled={isLoading}
            label="Current Address"
            error={showError("currentAddress")}
            rows={3}
          />
        </div>

        <div>
          <PrimaryButton
            title="submit"
            type={"submit"}
            cusFunc={() => {}}
            isLoading={isLoading}
            isLock={false}
          />
        </div>
      </form>
    </div>
  );
};

export default CreditorForm;
