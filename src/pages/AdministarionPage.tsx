import Layout from "../layout";
import { Header, BackBTN } from "../components";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const AdministrationPage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Administration Settings" />
        <div>
          <BackBTN />
        </div>
        <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live"></div>
      </main>
    </Layout>
  );
};

export default AdministrationPage;
