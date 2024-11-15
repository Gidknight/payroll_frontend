import { useEffect, useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header, MasterReport } from "../../components";
import { axiosInstance } from "../../libs";
import { MasterReportTypes } from "../../types";
import { FaSpinner } from "react-icons/fa";

const ReportMasterPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MasterReportTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/reports/master-report");
        if (response.status == 200) {
          setData(response.data);
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
    <Layout>
      <main className="wrapper">
        <Header location="Master Report" />
        <div>
          <BackBTN />
        </div>
        <div className="w-full">
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center bg-white p-5 rounded-md font-bold gap-2">
              <span className="animate-spin">
                <FaSpinner />
              </span>
              <span className="font-semibold animate-pulse">
                Fetching Report...
              </span>
            </div>
          ) : (
            <MasterReport data={data ? data : null} />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ReportMasterPage;
