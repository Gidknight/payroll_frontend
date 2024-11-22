import Layout from "../layout";
import {
  Header,
  BackBTN,
  ChangeAccountDetailsForm,
  ChangePasswordForm,
} from "../components";
import { useAuthStore } from "../stores/authStore";
// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const MyProfilePage = () => {
  const userAuth = useAuthStore((state) => state.userAuth);
  return (
    <Layout>
      <main className="wrapper">
        <Header location="My Profile Settings" />
        <div>
          <BackBTN />
        </div>

        <ChangeAccountDetailsForm user_id={userAuth.id} />
        <ChangePasswordForm user_id={userAuth.id} />
      </main>
    </Layout>
  );
};

export default MyProfilePage;
