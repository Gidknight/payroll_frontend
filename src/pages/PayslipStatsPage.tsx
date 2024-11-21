import Layout from "../layout";
import { Header, BackBTN, StatTables, StatsNavigation } from "../components";
import { useEffect, useState } from "react";
import { axiosInstance } from "../libs";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const PayslipStatsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/payslip/statistics");
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
        <Header location="Payslip Statistics" />
        <div>
          <BackBTN />
        </div>
        <StatsNavigation
          noOfAwaiting={data?.awaiting?.length}
          noOfFailed={data?.failed_emails?.length}
          noOfSent={data?.sent?.length}
        />
        <StatTables
          awaiting={data?.awaiting || []}
          failed={data?.failed || []}
          sent={data?.sent || []}
        />
      </main>
    </Layout>
  );
};

export default PayslipStatsPage;
