import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportMasterPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Master Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportMasterPage;
