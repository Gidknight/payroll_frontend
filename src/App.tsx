import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./layout";
import {
  DashboardGraph,
  ErrorCard,
  Header,
  PrimaryButton,
  StaffsTable,
} from "./components";
import { axiosInstance } from "./libs";
import toast from "react-hot-toast";
import ErrorComponent from "./components/ErrorComponent";
import { GraphDataTypes } from "./types";
import { BiLoaderCircle } from "react-icons/bi";

interface HomeTypes {
  negative_staffs: [];
  chart_array: GraphDataTypes[];
}

function App() {
  const [loading, setLoading] = useState(false);
  const [negativeStaffs, setNegativeStaffs] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [message, setMessage] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [fetchingGraph, setFetchingGraph] = useState(false);

  const getGraphData = async () => {
    try {
      setFetchingGraph(true);
      const response = await axiosInstance.get("/dashboard/net-gross-graph");
      if (response.status == 200) {
        setGraphData(response.data);
        setShowGraph(true);
      }
    } catch (error) {
      toast.error("Error getting graph data");
      setShowGraph(false);
      console.log(error);
    } finally {
      setFetchingGraph(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMessage("");
        setLoading(true);
        const response = await axiosInstance.get("/dashboard");
        if (response.status == 200) {
          const homeData = response.data;
          // console.log(homeData);
          setNegativeStaffs(homeData);
        }
      } catch (error: any) {
        if (error?.status == 401) {
          setMessage("Unauthorized, Try Logging In Again");
          // toast.error("Unauthorized, Try Logging In Again");
        }
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // [
  //   {
  //     month: "january",
  //     gross_pay: 23,
  //     allowance: 23,
  //     basic_salary: 23098,
  //     deduction: 45,
  //     net_pay: 12840,
  //     total_staff: 384,
  //   },
  //   {
  //     month: "feb",
  //     gross_pay: 223,
  //     allowance: 905,
  //     basic_salary: 1348,
  //     deduction: 435,
  //     net_pay: 23434,
  //     total_staff: 384,
  //   },
  //   {
  //     month: "march",
  //     gross_pay: 21,
  //     allowance: 5607,
  //     basic_salary: 2348,
  //     deduction: 415,
  //     net_pay: 128340,
  //     total_staff: 384,
  //   },
  //   {
  //     month: "aprikl",
  //     gross_pay: 235,
  //     allowance: 293,
  //     basic_salary: 5348,
  //     deduction: 125,
  //     net_pay: 1282240,
  //     total_staff: 384,
  //   },
  // ];
  return (
    <Layout>
      <div className="wrapper">
        <Header location="AKYERITE PAYROLL SOLUTION" />
        {message ? (
          <ErrorCard errorMessage={message} />
        ) : (
          <div className="w-full space-y-5">
            <div className="holder-active">
              <div className="flex flex-row items-center justify-between w-full">
                <h2 className="header-text"> Monthly Grosspay Vs Netpay</h2>
                <div>
                  <PrimaryButton
                    isLoading={fetchingGraph}
                    title="Show Graph"
                    isLock={fetchingGraph || graphData.length > 0}
                    type={"button"}
                    cusFunc={getGraphData}
                  />
                </div>
              </div>
              {fetchingGraph && (
                <div className="w-full flex flex-col items-center justify-center">
                  <BiLoaderCircle
                    className="animate-spin"
                    color="#05AC26"
                    size={25}
                  />
                  <p className="text-base text-live font-semibold animate-pulse">
                    Fetching graph data...
                  </p>
                </div>
              )}
              {showGraph && <DashboardGraph data={graphData} />}
            </div>
            <div className="holder-active">
              <h2 className="header-text">Staffs With Negative Net Pay</h2>
              <div>
                <StaffsTable data={negativeStaffs || []} isLoading={loading} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
