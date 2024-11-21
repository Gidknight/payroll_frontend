// import AllOverlays from "../components/AllOverlays";
import { SideBar, Topbar } from "./components";
import { Navigate } from "react-router-dom";
// import OfflineDetector from "./OfflineDetector";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
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

            {children}
          </div>
        </main>
      </>
    );
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

export default Layout;
