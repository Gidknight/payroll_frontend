import React from "react";
import Layout from "../layout";
import { Header, BackBTN, NewStaffForm } from "../components";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const AddStaffPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Add New Staff" />
        <div>
          <BackBTN />
        </div>
        <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
          <NewStaffForm />
        </div>
      </main>
    </Layout>
  );
};

export default AddStaffPage;
