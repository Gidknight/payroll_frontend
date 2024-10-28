import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportCharmsPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Charms Payroll Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportCharmsPage;
