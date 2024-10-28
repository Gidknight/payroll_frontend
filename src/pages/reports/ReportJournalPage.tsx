import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportJournalPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Journal Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportJournalPage;
