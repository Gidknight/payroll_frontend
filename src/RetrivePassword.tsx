// import electronLogo from './assets/electron.svg'

import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
  TextAreaWithLabel,
} from "./components";
import axios from "axios";
import TextInputWithLabel from "./components/TextInputWithLabel";
import { BiLock, BiUser } from "react-icons/bi";
import { useAuthStore } from "./stores/authStore";
import { useGeneralStore } from "./stores/general";
import toast from "react-hot-toast";

function RetrivePasswordPage(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/dashboard"} replace />;
  } else {
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const setUser = useAuthStore((state) => state.setUser);
    const [step, setStep] = useState(1);

    const handleStepOne = async (e: FormEvent) => {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/security/checkOne",
          {
            email,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          setQuestion(response.data.question);
          setStep(2);
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        // console.log("Error Logging in ==>>", error);
        if (error.status == 400) {
          setError("Invalid Credentials");
        } else {
          setError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const handleStepTwo = async (e: FormEvent) => {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/security/checkTwo",
          {
            answer,
          }
        );
        if (response.status == 200) {
          toast.success(response?.data?.message);
          setUserID(response.data.id);
          setStep(3);
        }
      } catch (error: any) {
        // console.log("Error Logging in ==>>", error);
        setError(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    const handleStepThree = async (e: FormEvent) => {
      e.preventDefault();

      if (password != confirmPassword) {
        setError("Password must match");
        return;
      }
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/security/changePassword",
          {
            password,
            email,
            id: userID,
          }
        );
        if (response.status === 201) {
          toast.success(response?.data?.message);
          navigate("/login");
        }
      } catch (error: any) {
        setError(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-20 p-10 ">
        <div className="my-auto space-y-10 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src="/vite.svg"
              alt="AKYERITE SOLUTIONS COMPANY LOGO"
              className="w-24 h-auto object-contain"
            />
            <h1 className="font-bold text-3xl">AKYERITE PAYROLL SOLUTION</h1>
            <h1 className="p-5  text-primary text-center font-bold text-[30px] uppercase">
              Retrive password
            </h1>
          </div>
          {step === 1 && (
            <form
              className="space-y-4  min-w-[400px] m-h-[300px] p-10 bg-white rounded-2xl shadow-xl"
              onSubmit={(e) => handleStepOne(e)}
            >
              <TextInputWithLabel
                inputType="text"
                onUpdate={setEmail}
                placeholder="Email"
                string={email}
                label="Provide your Email"
              />

              <PrimaryButton
                title="submit"
                isLoading={loading}
                isLock={!email ? true : false}
                cusFunc={() => {}}
                type="submit"
              />
              {error && (
                <p className="text-error text-center font-semibold">{error}</p>
              )}
            </form>
          )}
          {step === 2 && (
            <form
              className="space-y-4  min-w-[400px] m-h-[300px] p-10 bg-white rounded-2xl shadow-xl"
              onSubmit={(e) => handleStepTwo(e)}
            >
              {/* <h1 className="p-5  text-primary text-center font-bold text-[30px] uppercase">
                Retrive password
              </h1> */}
              <TextAreaWithLabel
                placeholder="Security Question"
                rows={4}
                label="Security Question"
                isDisabled={true}
                isRequired={true}
                onUpdate={() => {}}
                string={question}
                error=""
              />
              <TextInputWithLabel
                inputType="text"
                onUpdate={setAnswer}
                placeholder="Answer"
                string={answer}
                label="Answer"
              />

              <PrimaryButton
                title="submit"
                isLoading={loading}
                isLock={!answer ? true : false}
                cusFunc={() => {}}
                type="submit"
              />
              {error && (
                <p className="text-error text-center font-semibold">{error}</p>
              )}
            </form>
          )}
          {step === 3 && (
            <form
              className="space-y-4  min-w-[400px] m-h-[300px] p-10 bg-white rounded-2xl shadow-xl"
              onSubmit={(e) => handleStepThree(e)}
            >
              <h1 className="p-5  text-primary text-center font-bold text-[16px] uppercase">
                Set New Password{" "}
              </h1>
              <TextInputWithLabel
                inputType="password"
                onUpdate={setPassword}
                placeholder="New Password"
                string={password}
                label="New Password"
              />
              <TextInputWithLabel
                inputType="password"
                onUpdate={setConfirmPassword}
                placeholder="***********"
                string={confirmPassword}
                label="Confirm Password"
              />
              <PrimaryButton
                title="submit"
                isLoading={loading}
                isLock={!password || !confirmPassword ? true : false}
                cusFunc={() => {}}
                type="submit"
              />
              {error && (
                <p className="text-error text-center font-semibold">{error}</p>
              )}
            </form>
          )}

          <SecondaryButton
            title="cancel"
            cusFunc={() => navigate("/")}
            isLoading={loading}
          />
        </div>
        <p>All rights reserved by Akyerite Solutions</p>
      </div>
    );
  }
}

export default RetrivePasswordPage;
