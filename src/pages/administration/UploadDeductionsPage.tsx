import { ADMIN_SETTINGS_PAGES } from "../../constants";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";

const UploadDeductionsPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <PageLayout
      loading={loading}
      location="Administration Settings"
      subtext="Upload bulk deductions"
      pages={ADMIN_SETTINGS_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live"></div>
    </PageLayout>
  );
};

export default UploadDeductionsPage;
