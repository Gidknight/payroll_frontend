import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportVariationPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Variation Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportVariationPage;
