import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./layout";
import { DashboardGraph, Header } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className="wrapper">
        <Header location="AKYERITE PAYROLL SOLUTION" />
        <DashboardGraph
          data={[
            {
              month: "january",
              gross_pay: 23,
              allowance: 23,
              basic_salary: 23098,
              deduction: 45,
              net_pay: 12840,
              total_staff: 384,
            },
            {
              month: "feb",
              gross_pay: 223,
              allowance: 905,
              basic_salary: 1348,
              deduction: 435,
              net_pay: 23434,
              total_staff: 384,
            },
            {
              month: "march",
              gross_pay: 21,
              allowance: 5607,
              basic_salary: 2348,
              deduction: 415,
              net_pay: 128340,
              total_staff: 384,
            },
            {
              month: "aprikl",
              gross_pay: 235,
              allowance: 293,
              basic_salary: 5348,
              deduction: 125,
              net_pay: 1282240,
              total_staff: 384,
            },
          ]}
        />
        <div className="holder-active"></div>
      </div>
    </Layout>
  );
}

export default App;
