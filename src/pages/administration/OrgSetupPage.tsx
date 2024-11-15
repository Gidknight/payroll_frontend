import {
  PrimaryButton,
  SecondaryButton,
  TextInputWithLabel,
} from "../../components";
import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useEffect, useState } from "react";
import { ShowErrorObject } from "../../types";
import toast from "react-hot-toast";
import { axiosInstance } from "../../libs";
import { GrOrganization } from "react-icons/gr";

interface OrganisationTypes {
  id: number;
  OrganisationName: string;
  OrganisationAddress: string;
  OtherInfo1: string | null;
  OtherInfo2: string | null;
}

const OrgSetupPage = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [org, setOrg] = useState<OrganisationTypes | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");

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

    if (!name) {
      setError({ type: "name", message: "A Organisation is required" });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "Address  is required" });
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

      const response = await axiosInstance.patch(
        "/administration/organization",
        {
          name,
          address,
          info1,
          info2,
        }
      );
      if (response.status == 201) {
        toast.success(response.data.message);
        handleReset();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName(org?.OrganisationName || "");
    setAddress(org?.OrganisationAddress || "");
    setInfo1(org?.OtherInfo1 || "");
    setInfo2(org?.OtherInfo2 || "");
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/administration/organization"
        );
        if (response.status == 200) {
          const data: OrganisationTypes = response.data;
          setOrg(data);
          setName(data?.OrganisationName || "");
          setAddress(data?.OrganisationAddress || "");
          setInfo1(data?.OtherInfo1 || "");
          setInfo2(data?.OtherInfo2 || "");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageLayout
      loading={loading}
      location="Administration Settings"
      subtext="Edit The Organization Info"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live p-5">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-5 pb-5">
            <GrOrganization className="text-[24px]" />

            <h1 className="header-text">Organization Information</h1>
          </div>

          <button
            onClick={() => setEdit((prev) => !prev)}
            className={`py-1 px-2 border-b-2 hover:shadow-sm transition-all duration-300 ${
              edit
                ? "border-live text-live"
                : "border-secondary hover:text-live hover:border-live"
            }`}
          >
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className=" space-y-5">
          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="Organization Name"
              inputType="text"
              placeholder="Provide Your Oganization Name"
              onUpdate={setName}
              string={name}
              isDisabled={loading || !edit}
              isRequired={true}
              error={showError("name")}
            />
            <TextInputWithLabel
              label="Address"
              inputType="text"
              placeholder="Organization Address"
              onUpdate={setAddress}
              string={address}
              isDisabled={loading || !edit}
              isRequired={true}
              error={showError("address")}
            />
          </div>

          <div className="w-full flex flex-row items-center justify-between gap-10">
            <TextInputWithLabel
              label="Other Info 1"
              inputType="text"
              placeholder="Other Information 1"
              onUpdate={setInfo1}
              string={info1}
              isDisabled={loading || !edit}
              isRequired={true}
              error={showError("info1")}
            />
            <TextInputWithLabel
              label="Other Info 2"
              inputType="text"
              placeholder="Other Information 2"
              onUpdate={setInfo2}
              string={info2}
              isDisabled={loading || !edit}
              isRequired={true}
              error={showError("info2")}
            />
          </div>
          {edit && (
            <div className="w-full flex flex-row items-center justify-between gap-10">
              <div className="w-1/2 flex flex-row items-center justify-around gap-20 px-20 mx-auto">
                <PrimaryButton
                  isLoading={loading}
                  title="Submit"
                  cusFunc={handleSubmit}
                  isLock={!name || !address ? true : false}
                />
                <SecondaryButton
                  cusFunc={handleReset}
                  isLoading={loading}
                  title="Reset"
                  isLock={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default OrgSetupPage;
