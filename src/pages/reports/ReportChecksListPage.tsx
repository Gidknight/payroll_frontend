import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportCheckListPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Checklists Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportCheckListPage;
