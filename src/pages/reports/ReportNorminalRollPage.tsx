import { useState } from "react";
import Layout from "../../layout";
import { BackBTN, Header } from "../../components";

const ReportNorminalRollPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Norminal roll Report" />
        <div>
          <BackBTN />
        </div>
      </main>
    </Layout>
  );
};

export default ReportNorminalRollPage;
