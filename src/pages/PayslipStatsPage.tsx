import Layout from "../layout";
import { Header, BackBTN, StatTables, StatsNavigation } from "../components";
import { useState } from "react";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const PayslipStatsPage = () => {
  const [data, setData] = useState();
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
        <StatTables />
      </main>
    </Layout>
  );
};

export default PayslipStatsPage;
