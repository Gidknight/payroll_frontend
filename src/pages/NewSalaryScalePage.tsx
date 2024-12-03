import PageLayout from "../layouts/PageLayout";

import { JOB_LEVELS, JOB_STEPS, SALARY_CONFIG_PAGES } from "../constants";
import {
  ComboBox,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  TextInputWithLabel,
} from "../components";
import { useState } from "react";
import { SalaryScaleFullTypes } from "../types";
import { axiosInstance } from "../libs";
import toast from "react-hot-toast";

const NewSalaryScalePage = () => {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [step, setStep] = useState("");
  const [grade, setGrade] = useState("");
  const [amount, setAmount] = useState(0);
  const [rent, setRent] = useState(0);
  const [transport, setTransport] = useState(0);
  const [callduty, setCallduty] = useState(0);
  const [percular, setPercular] = useState(0);
  const [rural, setRural] = useState(0);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/salaryScales", {
        name,
        grade,
        level,
        step,
        amount,
        rent,
        transport,
        callduty,
        percular,
        rural,
        password,
      });

      if (response.status == 201) {
        toast.success(response?.data?.message);
        setPassword("");
        setConfirming(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setGrade("");
    setLevel("");
    setStep("");
    setAmount(0);
    setCallduty(0);
    setPercular(0);
    setRent(0);
    setTransport(0);
    setRural(0);
    setPassword("");
    setConfirming(false);
  };
  return (
    <PageLayout
      location="Salary Configuration"
      subtext="Add new"
      loading={false}
      pages={SALARY_CONFIG_PAGES}
    >
      <div className="w-full bg-white p-5 shadow-lg border-t-4 border-live">
        <h2 className="header-text">Add new salary scale</h2>
        <div className="w-full flex flex-col items-center justify-between pt-5">
          <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
            <TextInputWithLabel
              inputType="text"
              label="Name"
              placeholder={""}
              string={name}
              onUpdate={setName}
              isRequired={true}
              isDisabled={loading}
            />
            <TextInputWithLabel
              inputType="text"
              label="Grade Code"
              placeholder={""}
              string={name + level + step}
              onUpdate={setGrade}
              isRequired={true}
              isDisabled={true}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
            <ComboBox
              isDisabled={loading}
              label="Level"
              onSelect={setLevel}
              options={JOB_LEVELS}
              defaultMessage="Select a level"
              id="job_level"
              showDefault={true}
              showLabel={true}
              value={level}
            />
            <ComboBox
              isDisabled={loading}
              label="Step"
              onSelect={setStep}
              options={JOB_STEPS}
              defaultMessage="Select a Step"
              id="job_step"
              showDefault={true}
              showLabel={true}
              value={step}
            />
          </div>

          <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
            <TextInputWithLabel
              inputType="number"
              label="Amount"
              placeholder={""}
              string={amount}
              onUpdate={setAmount}
              isRequired={true}
              isDisabled={loading}
            />
            <TextInputWithLabel
              inputType="number"
              label="Rent"
              placeholder={""}
              string={rent}
              onUpdate={setRent}
              isRequired={true}
              isDisabled={loading}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
            <TextInputWithLabel
              inputType="number"
              label="Transport"
              placeholder={""}
              string={transport}
              onUpdate={setTransport}
              isRequired={true}
              isDisabled={loading}
            />
            <TextInputWithLabel
              inputType="number"
              label="Call Duty"
              placeholder={""}
              string={callduty}
              onUpdate={setCallduty}
              isRequired={true}
              isDisabled={loading}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
            <TextInputWithLabel
              inputType="number"
              label="Percular"
              placeholder={""}
              string={percular}
              onUpdate={setPercular}
              isRequired={true}
              isDisabled={loading}
            />
            <TextInputWithLabel
              inputType="number"
              label="Rural"
              placeholder={""}
              string={rural}
              onUpdate={setRural}
              isRequired={true}
              isDisabled={loading}
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-10 border-x border-t border-error p-5 rounded-t-xl mt-5">
            <div>
              <PrimaryButton
                isLoading={loading}
                title="Submit"
                isLock={!name || amount <= 0 || confirming ? true : false}
                cusFunc={() => setConfirming(true)}
              />
            </div>
            <div>
              <SecondaryButton
                isLoading={loading}
                title="Reset"
                isLock={loading}
                cusFunc={handleReset}
              />
            </div>
          </div>

          {confirming && (
            <div className="bg-red-200 p-4 space-y-2">
              <p>Please, Provide your password to confirm submission</p>
              <TextInput
                inputType="password"
                placeholder="**********"
                string={password}
                onUpdate={setPassword}
              />

              <PrimaryButton
                isLoading={loading}
                title="Confirm"
                type={"submit"}
                cusFunc={handleSubmit}
                isLock={loading || !password}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NewSalaryScalePage;
