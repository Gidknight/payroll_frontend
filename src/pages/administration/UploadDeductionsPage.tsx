import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";
import { UploadStatTypes } from "../../types";
import toast from "react-hot-toast";
import CSVUploader from "../../components/CSVUploader";
import { PrimaryButton, SecondaryButton } from "../../components";
import { axiosInstance } from "../../libs";

const UploadDeductionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [CSV, setCSV] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [stat, setStat] = useState<UploadStatTypes | null>(null);
  const [failure, setFailure] = useState(false);
  // console.log(csvData);

  const handleUpload = async () => {
    try {
      setLoading(true);
      // upload logic
      const response = await axiosInstance.post(
        "/administration/bulk-deduction",
        {
          csvData,
        }
      );
      if (response.status == 201) {
        setStat(response.data);
        toast.success("Done");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Error occured while uploading Deductionss"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCSV(null);
    setCsvData([]);
    window.location.reload();
  };
  return (
    <PageLayout
      loading={loading}
      location="Administration Settings"
      subtext="Upload bulk deductions"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
        <h1 className="header-text">Upload Deductionss</h1>

        <div>
          <CSVUploader setDocFile={setCSV} label={""} setData={setCsvData} />
        </div>
      </div>

      {csvData.length > 0 && (
        <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
          <h1 className="header-text ">Preview Uploaded CSV</h1>
          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th className="report-th">S/N</th>
                {csvData.length > 0 &&
                  Object.keys(csvData[0]).map((header, index) => (
                    <th
                      key={index}
                      className="report-th"
                      // style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="report-td">{rowIndex + 1}</td>
                  {Object.values(row).map((value: any, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="report-td"
                      // style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-5 flex flex-row items-end justify-end">
            <div className="w-40 flex flex-row-reverse items-center justify-between gap-5">
              <PrimaryButton
                isLoading={loading}
                title="Send"
                cusFunc={handleUpload}
              />
              <SecondaryButton
                isLoading={loading}
                title="Reset"
                cusFunc={handleReset}
                isLock={!csvData.length ? true : false}
              />
            </div>
          </div>
        </div>
      )}

      {stat && (
        <div className="w-full flex flex-col items-center justify-center bg-white p-2 shadow-lg border-t-4 border-live">
          <div className=" w-1/2 mx-auto p-4 space-y-2 ring-2 rounded-md font-bold text-lg my-5">
            <h1 className="text-center font-bold text-xl uppercase">
              Statistics
            </h1>
            <h2 className="">
              Total: <span>{stat?.total}</span>
            </h2>
            <h2 className="text-live">
              Success: <span>{stat?.success}</span>
            </h2>
            <div>
              <div
                className={`flex flex-row items-center justify-start ${
                  stat.failures.length > 0
                    ? "text-error hover:shadow-lg hover:ring-1 cursor-pointer"
                    : "text-slate-800"
                } `}
              >
                <h2 className={""} onClick={() => setFailure((prev) => !prev)}>
                  Failures: <span>{stat?.failures?.length}</span>
                </h2>
                {/* <button>{">"}</button> */}
              </div>
              {failure && (
                <div className="p-2 bg-red-50 border-x-2 border-b-2 border-error rounded-md">
                  {stat.failures.map((failed, findx) => (
                    <div key={findx}>
                      <h1 className="text-lg">
                        Staff Number: {failed.staff_number}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default UploadDeductionsPage;
