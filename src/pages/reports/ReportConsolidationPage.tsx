import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportConsolidationPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Consolidation Basic Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportConsolidationPage;
