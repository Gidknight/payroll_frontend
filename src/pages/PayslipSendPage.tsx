import Layout from "../layout";
import { Header, BackBTN, WebButton } from "../components";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import SendBatchComponent from "../components/SendBatchComponent";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const PayslipSendPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <main className="wrapper">
        <Header location="Send Payslip" />
        <div>
          <BackBTN />
        </div>
        <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
          <SendBatchComponent />
        </div>
      </main>
    </Layout>
  );
};

export default PayslipSendPage;
