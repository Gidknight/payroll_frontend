import { useEffect, useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header, LoadingComponent } from "../../components";
import PayslipsReport from "../../components/printables/PayslipsReport";
import { axiosInstance } from "../../libs";
import { OrganizationTypes, PayslipReportTypes } from "../../types";

const ReportPayslipPage = () => {
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState<OrganizationTypes | null>(
    null
  );
  const [data, setData] = useState<PayslipReportTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/reports/payslip-report");
        if (response.status == 200) {
          console.log(response.data);
          setOrganization(response.data[0]);
          setData(response.data[1]);
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
        {loading && (
          <LoadingComponent loading={loading} message="Fetching Report" />
        )}
        {/* <div className="h-full"> */}
        {!loading && organization && (
          <PayslipsReport
            data={data}
            isLoading={loading}
            institute={organization}
          />
        )}
        {/* </div> */}
        {/* </div> */}
      </main>
    </Layout>
  );
};

export default ReportPayslipPage;
