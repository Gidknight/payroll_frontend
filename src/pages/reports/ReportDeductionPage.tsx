import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportDeductionPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Deduction Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportDeductionPage;
