import { ShowErrorObject } from "../../types";
import { useState } from "react";
import { MdEmail, MdPersonAdd, MdPhone } from "react-icons/md";
import { TextInputWithLabel, PrimaryButton } from "..";
import { BiLock, BiUser } from "react-icons/bi";
import toast from "react-hot-toast";
import { createUser } from "@renderer/utils/requests";

const UserForm = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorTarget] = useState("");

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

    if (!userName) {
      setError({ type: "userName", message: "A Username is required" });
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
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (errorTarget == "email") {
      setError({ type: "email", message: "Email Already Exist" });
      isError = true;
    } else if (errorTarget == "userName") {
      setError({ type: "userName", message: "Username Already Taken" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "A Password is required" });
      isError = true;
    } else if (password.length < 8) {
      setError({
        type: "password",
        message: "The Password needs to be longer",
      });
      isError = true;
    } else if (password != cPassword) {
      setError({ type: "password", message: "The Passwords do not match" });
      isError = true;
    } else if (contact.toString().length !== 11) {
      setError({
        type: "contact",
        message: "Input a valid mobile number (11 digits)",
      });
      isError = true;
    }
    return isError;
  };

  const clearForm = () => {
    setCPassword("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setOtherName("");
    setUserName("");
    setContact("");
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    let isError = validate();
    if (isError) return;

    try {
      setIsLoading(true);

      const formData = {
        first_name: firstName,
        last_name: lastName,
        other_name: otherName,
        email: email.toLowerCase(),
        user_name: userName,
        password: password,
        contact: contact,
        role: "user",
        user_id,
      };
      const response = await createUser(formData);

      if (response?.status == 201) {
        toast.success(response?.data?.message);
        clearForm();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
      // alert(error)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-white p-5 shadow-lg border-t-4 border-live">
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="text-[30px]">{<MdPersonAdd />}</span>
        <h2 className="header-text whitespace-nowrap">Create New User</h2>
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
            isDisabled={false}
            label="Last Name"
            error={showError("lastName")}
          />
          <TextInputWithLabel
            inputType="text"
            placeholder="First Name"
            string={firstName}
            onUpdate={setFirstName}
            icon={<BiUser />}
            isDisabled={false}
            label="First Name"
            error={showError("firstName")}
          />
        </div>

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="text"
            placeholder="Don't abbreviate"
            string={otherName}
            onUpdate={setOtherName}
            icon={<MdPhone />}
            isDisabled={false}
            label="Other Name"
            error={showError("")}
          />
          <TextInputWithLabel
            inputType="text"
            placeholder="Username"
            string={userName}
            onUpdate={setUserName}
            icon={<BiUser />}
            isDisabled={false}
            label="User Name"
            error={showError("username")}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <TextInputWithLabel
            inputType="number"
            placeholder="080xxxxxx"
            string={contact}
            onUpdate={setContact}
            icon={<MdPhone />}
            isDisabled={false}
            label="Phone Number"
            error={showError("contact")}
          />
          <TextInputWithLabel
            inputType="email"
            placeholder="example@email.com"
            string={email}
            onUpdate={setEmail}
            icon={<MdEmail />}
            isDisabled={false}
            label="Email Address"
            error={showError("email")}
          />
        </div>

        <div className="flex flex-row items-center justify-evenly gap-2 w-full">
          <TextInputWithLabel
            inputType="password"
            placeholder="********"
            string={password}
            onUpdate={setPassword}
            icon={<BiLock />}
            isDisabled={false}
            label="Password"
            error={showError("password")}
          />
          <TextInputWithLabel
            inputType="password"
            placeholder="********"
            string={cPassword}
            onUpdate={setCPassword}
            icon={<BiLock />}
            isDisabled={false}
            label="Confirm Password"
            error={showError("password")}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <div className="w-1/3">
            <PrimaryButton
              title="submit"
              type={"submit"}
              cusFunc={() => {}}
              isLoading={isLoading}
              isLock={false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
