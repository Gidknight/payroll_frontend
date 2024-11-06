import PageLayout from "../layouts/PageLayout";

import { SALARY_CONFIG_PAGES } from "../constants";

const SalaryConfigPage = () => {
  return (
    <PageLayout
      location="Salary Configuration"
      subtext=""
      loading={false}
      pages={SALARY_CONFIG_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live"></div>
    </PageLayout>
  );
};

export default SalaryConfigPage;
