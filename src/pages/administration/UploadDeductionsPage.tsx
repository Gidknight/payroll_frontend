import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";
import { UploadStatTypes } from "../../types";
import toast from "react-hot-toast";
import CSVUploader from "../../components/CSVUploader";
import { PrimaryButton, SecondaryButton } from "../../components";

const UploadDeductionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [CSV, setCSV] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [stat, setStat] = useState<UploadStatTypes | null>(null);
  // console.log(csvData);

  const handleUpload = async () => {
    try {
      setLoading(true);
      // upload logic

      setStat({ failures: [], total: 0, success: csvData.length });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Error occured while uploading Allowances"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCSV(null);
    setCsvData([]);
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

      {!stat && csvData.length > 0 && (
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
        <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
          <h1>Statistics</h1>
          <div>
            <h2>
              Total: <span>{stat?.total}</span>
            </h2>
            <h2>
              Successes: <span>{stat?.success}</span>
            </h2>
            <h2>
              Failures: <span>{stat?.failures?.length}</span>
            </h2>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default UploadDeductionsPage;
