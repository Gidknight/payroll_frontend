// import AllOverlays from "../components/AllOverlays";
import { BiDetail, BiEdit } from "react-icons/bi";
import { BackBTN, Header, InpageLink, SideBar, Topbar } from "../components";
import { Navigate, useParams } from "react-router-dom";
// import OfflineDetector from "./OfflineDetector";

const StaffLayout = ({
  children,
  fullNames,
  staffNo,
  loading,
}: {
  children: React.ReactNode;
  fullNames: string;
  staffNo: string;
  loading: boolean;
}) => {
  const token = localStorage.getItem("token");
  const params = useParams();
  // const token = true;
  if (token) {
    return (
      <>
        {/* <AllOverlays /> */}
        <main className="bg-black bg-opacity-15 w-screen flex flex-row items-start justify-start h-screen">
          <div className="w-[20%] max-h-screen">
            <SideBar />
          </div>

          <div className="w-full h-full pb-20 flex flex-col items-center justify-start overflow-y-auto">
            <Topbar />
            <main className="wrapper">
              <Header
                location={`Fullname: ${fullNames}`}
                subtext={`Staff Number: ${staffNo}`}
              />
              <div className="flex flex-row items-center justify-between w-full">
                <BackBTN />
                <div className="flex flex-row items-center justify-center gap-2">
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
              </div>

              {children}
            </main>
          </div>
        </main>
      </>
    );
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

export default StaffLayout;
