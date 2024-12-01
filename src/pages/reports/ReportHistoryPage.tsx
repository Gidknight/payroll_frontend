import { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  BackBTN,
  Header,
  HistoryReport,
  LoadingComponent,
} from "../../components";
import { axiosInstance } from "../../libs";
import { HistoryLogTypes } from "../../types";

const ReportHistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HistoryLogTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/reports/history-log");
        if (response.status == 200) {
          setData(response.data);
          // console.log(response.data);
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
        <Header location="History Log Report" />
        <div className="w-full">
          <BackBTN />
          <div className="w-full">
            {loading && (
              <LoadingComponent
                loading={loading}
                message="Fetching History Log"
              />
            )}
            {!loading && data && data?.records?.length > 0 && (
              <HistoryReport data={data} />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ReportHistoryPage;
