import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportBankSchedulePage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Bank Schedule Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportBankSchedulePage;
