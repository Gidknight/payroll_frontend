import Layout from "../layout";
import { BackBTN, Header, InpageLink } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../libs";
import { StaffDetailsTypes } from "../types";
import StaffData from "../components/StaffData";

import { BiDetail, BiEdit } from "react-icons/bi";
import StaffLayout from "../layouts/StaffLayout";

// import BackBTN from "../components/BackBTN";
// import NewStaffForm from "../components/forms/NewStaffForm";

const StaffDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<StaffDetailsTypes | null>(null);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      // toast.success(id);
      const response = await axiosInstance.get("/staffs/" + id);
      // const subs = await getAllSubunits();

      // if (subs.status == 200) {
      //   setSubUnits(subs.data);
      // }
      if (response.status == 200) {
        setStaff(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, []);
  return (
    <StaffLayout
      fullNames={`${staff?.title?.Name || ""} ${staff?.surname} ${
        staff?.firstname
      } ${staff?.other_name || ""}`}
      loading={loading}
      staffNo={staff?.staff_no || ""}
    >
      {/* <main className="wrapper"> */}
      {/* <Header
          location={`Fullname: ${staff?.title || ""} ${staff?.surname} ${
            staff?.firstname
          } ${staff?.other_name}`}
          subtext={`Staff Number: ${staff?.staff_no}`}
        />
        <div className="flex flex-row items-center justify-between w-full">
          <BackBTN />
          <div className="flex flex-row items-center justify-center gap-5">
            <div>
              <InpageLink
                isLoading={loading}
                title="View Data"
                to={"/staff/view-data/" + params.id}
                icon={<BiDetail />}
              />
            </div>
            <div>
              <InpageLink
                isLoading={loading}
                title="Edit Biodata"
                to={"/staff/edit-biodata/" + params.id}
                icon={<BiEdit />}
              />
            </div>
            <div>
              <InpageLink
                isLoading={loading}
                title="Edit Job Details"
                to={"/staff/edit-job/" + params.id}
                icon={<BiEdit />}
              />
            </div>
            <div>
              <InpageLink
                isLoading={loading}
                title="Edit Account Details"
                to={"/staff/edit-account/" + params.id}
                icon={<BiEdit />}
              />
            </div>
          </div>
        </div> */}

      <div className="w-full ">
        {staff ? (
          <StaffData data={staff} />
        ) : (
          <p className="text-center">No Data To Display</p>
        )}
      </div>
      {/* </main> */}
    </StaffLayout>
  );
};

export default StaffDetailsPage;
