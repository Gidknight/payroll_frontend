import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportDeductionEpayPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Deduction E-pay Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportDeductionEpayPage;
