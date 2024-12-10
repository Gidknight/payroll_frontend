import { useEffect, useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";
import PayslipsReport from "../../components/printables/PayslipsReport";
import { axiosInstance } from "../../libs";

const ReportPayslipPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MasterReportTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/reports/payslip-report");
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
        <Header location="Payslip Report" />
        <div>
          <BackBTN />
        </div>
        {/* <div> */}
        <PayslipsReport data={[]} isLoading={loading} />
        {/* </div> */}
      </main>
    </Layout>
  );
};

export default ReportPayslipPage;
