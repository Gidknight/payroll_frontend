import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportAllowancePage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Payslip Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportAllowancePage;
