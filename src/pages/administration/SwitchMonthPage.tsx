import { ADMIN_SETTINGS_PAGES, ALL_MONTHS } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../libs";
import { DatedOnTypes } from "../../types";
import { ComboBox, PrimaryButton } from "../../components";
import toast from "react-hot-toast";
import moment from "moment";

interface MonthSwitcherTypes {
  options: DatedOnTypes[];
  onSelect: (value: DatedOnTypes) => void;
  defaultMessage?: string;
  id?: string;
  label: string;
  subLabel?: string;
  isDisabled: boolean;
  error?: string;
  showDefault?: boolean;
  value?: DatedOnTypes | null;
  showLabel?: boolean;
}

const MonthSwitcher = ({
  options,
  onSelect,
  defaultMessage = "Select an option",
  id,
  label,
  subLabel,
  isDisabled,
  error,
  showDefault = true,
  value,
  showLabel = true,
}: MonthSwitcherTypes) => {
  const [selectedOption, setSelectedOption] = useState(value);
  // console.log({ value });
  const handleOptionSelect = (option: any) => {
    // toast.success(option);
    const split = option?.split(" | ");
    const month = options.find(
      (one) => one.Month === split[0] && one.Year === Number(split[1])
    );
    if (month) {
      setSelectedOption(month);
      onSelect(month);
    }
    // console.log(split);
  };

  const optionStyle = `capitalize bg-white px-2 py-2 hover:bg-primary hover:text-white font-semibold`;

  return (
    <div className="flex flex-col w-full  p-2 rounded-lg">
      {showLabel && (
        <label htmlFor={id} className="text-lg font-semibold text-primary mb-2">
          {label}:{" "}
          {subLabel && (
            <span className="text-sm text-gray-500 ml-1">{subLabel}</span>
          )}
        </label>
      )}
      <div className="relative w-full">
        <select
          value={selectedOption?.id}
          onChange={(e) => handleOptionSelect(e.target.value)}
          className={`
            w-full
            bg-gray-100
            text-gray-800
            rounded-lg
            py-3
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            ${isDisabled ? "bg-gray-200 cursor-not-allowed" : ""}
          `}
          id={id}
          disabled={isDisabled}
        >
          {showDefault && !isDisabled && !value && (
            <option value="" className="text-gray-500">
              {defaultMessage}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.id} className={optionStyle}>
              {option?.Month + " | " + option?.Year}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////

const SwitchMonthPage = () => {
  const this_year = moment().year();
  const [loading, setLoading] = useState(false);
  const [availableMonths, setAvailableMonths] = useState<DatedOnTypes[] | []>(
    []
  );
  const [currentMonth, setCurrentMonth] = useState<DatedOnTypes | null>(null);
  const [oldMonth, setOldMonth] = useState<DatedOnTypes | null>(null);
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  const handleMonthSwitch = async () => {
    if (!currentMonth) return;
    try {
      setLoading(true);
      console.log(currentMonth);
      const response = await axiosInstance.patch("/administration/month", {
        Id: currentMonth?.id,
        Month: currentMonth?.Month,
        Year: currentMonth?.Year,
      });
      if (response.status == 201) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(response?.data?.message);
      }
      return false;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error Switching Month");
    } finally {
      setLoading(false);
    }
  };

  const handleMonthAdd = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/administration/month", {
        newMonth,
        newYear,
      });
      if (response.status == 201) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      return false;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error Adding New Month");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/administration/month");
        if (response.status == 200) {
          const data: DatedOnTypes[] = response.data;
          const now = new Date();
          setAvailableMonths(data);

          const current: DatedOnTypes | undefined = data.find(
            (date) => date.Status === "Current"
          );
          if (current) {
            setCurrentMonth(current);
            setOldMonth(current);
          }
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
      subtext="Switch Working Month"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full flex flex-row items-start justify-evenly gap-5">
        <div
          className={`w-1/2 flex flex-row items-center justify-around bg-white p-2 shadow-lg border-t-4 ${
            availableMonths.length > 0 ? "border-live" : "border-secondary"
          }`}
        >
          <MonthSwitcher
            options={availableMonths || []}
            label="Switch Month"
            defaultMessage="Pick Working Month"
            onSelect={setCurrentMonth}
            isDisabled={loading || availableMonths.length < 1 ? true : false}
            id="datedon-options"
            value={currentMonth}
            subLabel={`Active Month (${
              oldMonth?.Month + " | " + oldMonth?.Year
            })`}
          />
          <div className="w-2/6 ml-2">
            <PrimaryButton
              isLoading={loading}
              title="Switch Month"
              cusFunc={handleMonthSwitch}
              isLock={!currentMonth || loading ? true : false}
              type={"button"}
            />
          </div>
        </div>
        <div
          className={`w-1/2 flex flex-col gap-4 items-center justify-around bg-white p-2 shadow-lg border-t-4 ${
            availableMonths.length > 0 ? "border-live" : "border-secondary"
          }`}
        >
          <h2>Add Next Month</h2>
          <div className="flex felex-row items-center justify-evenly w-full">
            <ComboBox
              label="New Month"
              options={ALL_MONTHS}
              onSelect={setNewMonth}
              value={newMonth}
              defaultMessage="Select A Month"
              isDisabled={loading}
            />
            <ComboBox
              label="New Year"
              options={[
                { id: this_year, Name: this_year },
                { id: this_year + 1, Name: this_year + 1 },
              ]}
              onSelect={setNewYear}
              value={newYear}
              defaultMessage="Select New Year"
              isDisabled={loading}
            />
          </div>
          <div className="py-2">
            <PrimaryButton
              isLoading={loading}
              title="Add Next Month"
              cusFunc={handleMonthAdd}
              isLock={!currentMonth || loading ? true : false}
              type={"button"}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SwitchMonthPage;
