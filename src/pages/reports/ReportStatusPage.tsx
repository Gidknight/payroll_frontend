import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportStatusPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Status Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportStatusPage;
