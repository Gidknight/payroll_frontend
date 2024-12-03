import PageLayout from "../layouts/PageLayout";

import { SALARY_CONFIG_PAGES } from "../constants";
import {
  PrimaryButton,
  SalaryScalesTable,
  SecondaryButton,
} from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalaryScaleFullTypes } from "../types";
import { axiosInstance } from "../libs";

const SalaryConfigPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SalaryScaleFullTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/salaryScales");
        if (response.status == 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      return false;
    };
    fetchData();
  }, []);
  return (
    <PageLayout
      location="Salary Configuration"
      subtext=""
      loading={false}
      pages={SALARY_CONFIG_PAGES}
    >
      <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
        <div className="w-full flex flex-row items-center justify-between pb-4">
          <h2 className="header-text">Salary Scale Configuration</h2>
          <div>
            <SecondaryButton
              title="Add new salary scale"
              isLoading={loading}
              cusFunc={() => navigate("add-new", { replace: true })}
            />
          </div>
        </div>
        <SalaryScalesTable isLoading={loading} data={data} />
      </div>
    </PageLayout>
  );
};

export default SalaryConfigPage;
