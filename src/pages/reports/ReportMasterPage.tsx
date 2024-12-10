import { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  BackBTN,
  Header,
  LoadingComponent,
  MasterReport,
} from "../../components";
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
            <LoadingComponent loading={loading} message="Fetching Report" />
          ) : (
            <MasterReport data={data ? data : null} />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ReportMasterPage;
