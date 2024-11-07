import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <PageLayout
      loading={loading}
      location="Administration Settings"
      subtext="Register New App User"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live"></div>
    </PageLayout>
  );
};

export default RegisterPage;
