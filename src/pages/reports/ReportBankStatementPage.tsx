import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportBankStatementPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Bank Statement Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportBankStatementPage;
