import Layout from "../layout";
import {
  Header,
  BackBTN,
  ChangeAccountDetailsForm,
  ChangePasswordForm,
} from "../components";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const MyProfilePage = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Header location="My Profile Settings" />
        <div>
          <BackBTN />
        </div>

        <ChangeAccountDetailsForm user_id="oi" />
        <ChangePasswordForm user_id="0io" />
      </main>
    </Layout>
  );
};

export default MyProfilePage;
