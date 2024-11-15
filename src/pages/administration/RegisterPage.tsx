import {
  PrimaryButton,
  SecondaryButton,
  TextInputWithLabel,
} from "../../components";
import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";
import { ShowErrorObject } from "../../types";
import toast from "react-hot-toast";
import { axiosInstance } from "../../libs";
import { hashPassword } from "../../utils";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [othername, setOthername] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorTarget, setErrorTarget] = useState("");
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

    if (!username) {
      setError({ type: "username", message: "A Username is required" });
      isError = true;
    } else if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!firstname) {
      setError({ type: "firstname", message: "A First Name is required" });
      isError = true;
    } else if (!surname) {
      setError({ type: "surname", message: "A Surname is required" });
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
    } else if (!othername) {
      setError({ type: "othername", message: "Other Name is Required" });
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
    } else if (password != confirmPassword) {
      setError({ type: "password", message: "The Passwords do not match" });
      isError = true;
    } else if (contact?.length !== 11) {
      setError({
        type: "contact",
        message: "Input a valid mobile number (11 digits)",
      });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // showError("");
    // toast.success("clicked");
    let isError = validate();
    // console.log(isError);
    if (isError) return;
    try {
      setLoading(true);
      const hashedPassword = hashPassword(password);
      console.log(hashedPassword);
      const response = await axiosInstance.post(
        "/administration/register-app-user",
        {
          email,
          first_name: firstname,
          other_names: othername,
          password: hashedPassword,
          surname: surname,
          phone_number: contact,
          username,
        }
      );
      if (response.status == 201) {
        toast.success(response.data.message);
        handleReset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSurname("");
    setFirstname("");
    setUsername("");
    setEmail("");
    setContact("");
    setPassword("");
    setContact("");
    setPassword("");
    setConfirmPassword("");
    return false;
  };
  return (
    <PageLayout
      loading={loading}
      location="Administration Settings"
      subtext="Register New App User"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
        <div className="p-5 space-y-5">
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="Username"
              inputType="text"
              placeholder="Provide Your Username"
              onUpdate={setUsername}
              string={username}
              isDisabled={loading}
              isRequired={true}
              error={showError("username")}
            />
            <TextInputWithLabel
              label="Surname"
              inputType="text"
              placeholder="Provide Surname"
              onUpdate={setSurname}
              string={surname}
              isDisabled={loading}
              isRequired={true}
              error={showError("surname")}
            />
          </div>

          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="First Name"
              inputType="text"
              placeholder="Provide First Name"
              onUpdate={setFirstname}
              string={firstname}
              isDisabled={loading}
              isRequired={true}
              error={showError("firstname")}
            />
            <TextInputWithLabel
              label="Other Name"
              inputType="text"
              placeholder="Other Names"
              onUpdate={setOthername}
              string={othername}
              isDisabled={loading}
              isRequired={true}
              error={showError("othername")}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="Phone Number"
              inputType="number"
              placeholder="e.g 080XXXXXXX"
              onUpdate={setContact}
              string={contact}
              isDisabled={loading}
              isRequired={true}
              error={showError("contact")}
            />
            <TextInputWithLabel
              label="Email Address"
              inputType="email"
              placeholder="e.g: example@email.com"
              onUpdate={setEmail}
              string={email}
              isDisabled={loading}
              isRequired={true}
              error={showError("email")}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="Password"
              inputType="password"
              placeholder="**********"
              onUpdate={setPassword}
              string={password}
              isDisabled={loading}
              isRequired={true}
              error={showError("password")}
            />
            <TextInputWithLabel
              label="Confirm Password"
              inputType="password"
              placeholder="**********"
              onUpdate={setConfirmPassword}
              string={confirmPassword}
              isDisabled={loading}
              isRequired={true}
              error={showError("password")}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <div className="w-1/2 flex flex-row items-center justify-around gap-20 px-20 mx-auto">
              <PrimaryButton
                isLoading={loading}
                title="Submit"
                cusFunc={handleSubmit}
                isLock={
                  !password ||
                  !email ||
                  !username ||
                  !surname ||
                  !firstname ||
                  !contact ||
                  !confirmPassword ||
                  !othername
                    ? true
                    : false
                }
              />
              <SecondaryButton
                cusFunc={handleReset}
                isLoading={loading}
                title="Reset"
                isLock={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
