import PageLayout from "../layouts/PageLayout";

import { JOB_LEVELS, JOB_STEPS, SALARY_CONFIG_PAGES } from "../constants";
import {
  ComboBox,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  TextInputWithLabel,
} from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../libs";
import { SalaryScaleFullTypes } from "../types";
import toast from "react-hot-toast";

const SalaryScaleDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");
  const [scale, setScale] = useState<SalaryScaleFullTypes | null>(null);

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
      const response = await axiosInstance.patch("/salaryScales/" + params.id, {
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
    setName(scale?.Name || "");
    setGrade(scale?.GradeCode || "");
    setLevel(scale?.Level || "");
    setStep(scale?.Step || "");
    setAmount(scale?.Amount || 0);
    setCallduty(scale?.CallDuty || 0);
    setPercular(scale?.Percular || 0);
    setRent(scale?.Rent || 0);
    setTransport(scale?.Transport || 0);
    setRural(scale?.Rural || 0);
    setPassword("");
    setConfirming(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/salaryScales/" + params.id);
        if (response.status == 200) {
          const data: SalaryScaleFullTypes = response.data;
          setScale(data);
          setName(data.Name);
          setGrade(data.GradeCode);
          setLevel(data.Level);
          setStep(data.Step);
          setAmount(data.Amount);
          setCallduty(data.CallDuty);
          setPercular(data.Percular);
          setRent(data.Rent);
          setTransport(data.Transport);
          setRural(data.Rural);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) {
      fetchData();
    }
  }, []);
  return (
    <PageLayout
      location="Salary Configuration/Detail"
      subtext={"Edit salary scale " + scale?.GradeCode}
      loading={false}
      pages={SALARY_CONFIG_PAGES}
    >
      <div className="w-full bg-white py-2 px-5 shadow-lg border-t-4 border-live">
        <h2 className="header-text">Salary Scale Details</h2>
        {scale ? (
          <div className="w-full flex flex-col items-center justify-between pt-5">
            <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
              <TextInputWithLabel
                inputType="text"
                label="Name"
                placeholder={scale.Name}
                string={name}
                onUpdate={setName}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  scale.Name != name ? `Old Value: ${scale.Name}` : ""
                }
              />
              <TextInputWithLabel
                inputType="text"
                label="Grade Code"
                placeholder={scale?.GradeCode}
                string={name + level + step}
                onUpdate={setGrade}
                isRequired={true}
                isDisabled={true}
                second_text={
                  grade != name + level + step ? `Old Value: ${grade}` : ""
                }
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
                showDefault={false}
                showLabel={true}
                value={level}
                subLabel={
                  scale.Level != level ? `Old Value: ${scale.Level}` : ""
                }
              />
              <ComboBox
                isDisabled={loading}
                label="Step"
                onSelect={setStep}
                options={JOB_STEPS}
                defaultMessage="Select a Step"
                id="job_step"
                showDefault={false}
                showLabel={true}
                value={step}
                subLabel={scale.Step != step ? `Old Value: ${scale.Step}` : ""}
              />
            </div>

            <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
              <TextInputWithLabel
                inputType="number"
                label="Amount"
                placeholder={String(scale?.Amount)}
                string={amount}
                onUpdate={setAmount}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  amount != scale.Amount
                    ? `Old Value: ${scale?.Amount?.toLocaleString("us-EN")}`
                    : ""
                }
              />
              <TextInputWithLabel
                inputType="number"
                label="Rent"
                placeholder={String(scale?.Rent)}
                string={rent}
                onUpdate={setRent}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  rent != scale.Rent
                    ? `Old Value: ${scale?.Rent?.toLocaleString("us-EN")}`
                    : ""
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
              <TextInputWithLabel
                inputType="number"
                label="Transport"
                placeholder={String(scale?.Transport)}
                string={transport}
                onUpdate={setTransport}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  transport != scale.Transport
                    ? `Old Value: ${scale?.Transport?.toLocaleString("us-EN")}`
                    : ""
                }
              />
              <TextInputWithLabel
                inputType="number"
                label="Call Duty"
                placeholder={String(scale?.CallDuty)}
                string={callduty}
                onUpdate={setCallduty}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  callduty != scale.CallDuty
                    ? `Old Value: ${scale?.CallDuty?.toLocaleString("us-EN")}`
                    : ""
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-evenly gap-2 lg:gap-10">
              <TextInputWithLabel
                inputType="number"
                label="Percular"
                placeholder={String(scale.Percular)}
                string={percular}
                onUpdate={setPercular}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  percular != scale.Percular
                    ? `Old Value: ${scale?.Percular?.toLocaleString("us-EN")}`
                    : ""
                }
              />
              <TextInputWithLabel
                inputType="number"
                label="Rural"
                placeholder={String(scale?.Rural)}
                string={rural}
                onUpdate={setRural}
                isRequired={true}
                isDisabled={loading}
                second_text={
                  rural != scale.Rural
                    ? `Old Value: ${scale?.Rural?.toLocaleString("us-EN")}`
                    : ""
                }
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
                <p className="text-center">
                  Please note changes made affects {scale?.links} records
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>Nothing to display</div>
        )}
      </div>
    </PageLayout>
  );
};

export default SalaryScaleDetailsPage;
