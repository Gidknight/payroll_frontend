import { ADMIN_SETTINGS_PAGES, ALL_MONTHS } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../libs";
import { DatedOnTypes } from "../../types";
import {
  ComboBox,
  ErrorCard,
  PrimaryButton,
  SecondaryButton,
} from "../../components";
import toast from "react-hot-toast";
import moment from "moment";
import ErrorComponent from "../../components/ErrorComponent";

interface AutomationTypes {
  id: number;
  Name: string;
  category: string;
}

const Computer = ({ name, id, loading, category, setLoading }) => {
  const [value, ssetValue] = useState("");

  const automatic = async () => {
    try {
      setLoading(true);
      const reaponse = await axiosInstance.patch(
        "/administration/automations",
        {
          name,
          id,
          category,
          isDefault: true,
        }
      );
      if (reaponse.status == 201) {
        toast.success("Done");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error Ocurred while computing ${name}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-1/3 p-3">
      <div className="border-live border-t-4 bg-white p-2">
        <h2 className="text-center font-bold">
          {name}{" "}
          <span
            className={`text-sm font-normal ${
              category === "allowance" ? "text-live" : "text-error"
            }`}
          >
            ({category})
          </span>
        </h2>
        <div className="space-y-5 py-2">
          <div>
            <p className="text-center">
              This will give all staff the default value
            </p>
            <SecondaryButton
              isLoading={loading}
              cusFunc={automatic}
              title={`Compute Automatically`}
              isLock={loading}
            />
          </div>
          <div>
            <p className="text-center">
              this will give all staff the set value
            </p>
            <SecondaryButton
              isLoading={loading}
              cusFunc={() => {}}
              title={`Compute Manually`}
              isLock={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////

const BatchComputationPage = () => {
  const this_year = moment().year();
  const [loading, setLoading] = useState(false);
  const [availableAutomations, setAvailableAutomations] = useState<
    AutomationTypes[] | []
  >([
    // { id: 1, name: "TAX", category: "deduction" },
    // { id: 2, name: "Hazard", category: "deduction" },
    // { id: 3, name: "S", category: "allowance" },
    // { id: 3, name: "V", category: "deduction" },
  ]);

  const handleMonthAdd = async () => {
    try {
      setLoading(true);
      //
      toast.success("In Development");
      return false;
    } catch (error) {
      toast.error("Error Adding New Month");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/administration/automations");
        if (response.status == 200) {
          setAvailableAutomations(response.data);
        }

        return false;
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
      subtext="Batch Computation"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full flex flex-row items-start justify-evenly gap-5">
        {!loading && availableAutomations.length < 1 && (
          <ErrorCard errorMessage="No Automation Available" />
        )}
        {!loading && availableAutomations.length > 0 && (
          <div className="flex flex-row items-start justify-start w-full flex-wrap">
            {availableAutomations.map((automated) => (
              <Computer
                key={automated.id}
                id={automated.id}
                name={automated.Name}
                loading={loading}
                setLoading={setLoading}
                category={automated.category}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BatchComputationPage;
