import Layout from "../layout";
import { Header, BackBTN, StaffsTable } from "../components";
import { useEffect, useState } from "react";
import { axiosInstance } from "../libs";

const AllStaffsPage = () => {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "http://localhost:5000/api/v1/staffs"
      );
      if (response?.status == 200) {
        console.log(response);
        setStaffs(response?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <Layout>
      <main className="wrapper">
        <Header location="All Staff" />
        <div>
          <BackBTN />
        </div>
        <div className="w-full bg-white shadow-lg border-t-4 border-live">
          <StaffsTable data={staffs} isLoading={loading} />
        </div>
      </main>
    </Layout>
  );
};

export default AllStaffsPage;
