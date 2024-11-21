// import AllOverlays from "../components/AllOverlays";
import { BackBTN, Header, InpageLink, SideBar, Topbar } from "../components";
import { Navigate, useParams } from "react-router-dom";
import { PageTypes } from "../types";
// import OfflineDetector from "./OfflineDetector";

const PageLayout = ({
  children,
  location,
  subtext,
  loading,
  pages,
}: {
  children: React.ReactNode;
  location: string;
  subtext: string;
  loading: boolean;
  pages: PageTypes[];
}) => {
  const token = localStorage.getItem("token");
  // const params = useParams();
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
              <Header location={`${location}`} subtext={`${subtext}`} />
              <div className="flex flex-row items-center justify-between w-full">
                <div className="mr-5">
                  <BackBTN />
                </div>
                <div className="flex flex-row items-center justify-end flex-wrap gap-2">
                  {pages.length > 0 &&
                    pages?.map((page: PageTypes) => (
                      <div key={page.id}>
                        <InpageLink
                          isLoading={loading}
                          title={page.title}
                          to={page.to}
                          icon={page.icon}
                        />
                      </div>
                    ))}
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

export default PageLayout;
