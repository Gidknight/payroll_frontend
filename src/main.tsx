import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import Dashboard from "./pages/Dashboard";
// import Stockin from "./pages/Stockin";
import LoginPage from "./Login";
import AddStaffPage from "./pages/AddStaffPage";
import AllStaffsPage from "./pages/AllStaffsPage";
import ConfigTitlesPage from "./pages/ConfigTitlesPage";
import ConfigDesignationsPage from "./pages/ConfigDesignationsPage";
import ConfigUnitsPage from "./pages/ConfigUnitsPage";
import ConfigDivisionsPage from "./pages/ConfigDivisionsPage";
import ConfigJobClassificationsPage from "./pages/ConfigJobClassificationsPage";
import ConfigPensionNamesPage from "./pages/ConfigPensionNamesPage";
import ConfigBankNamesPage from "./pages/ConfigBankNamesPage";
import StaffDetailsPage from "./pages/StaffDetailsPage";
import StaffEditJobDetailsPage from "./pages/StaffEditJobDetailsPage";
import StaffEditAccountDetailsPage from "./pages/StaffEditAccountDetailsPage";
import StaffEditBiodataPage from "./pages/StaffEditBiodataPage";
import SalaryConfigPage from "./pages/SalaryConfigPage";
import MyProfilePage from "./pages/MyProfilePage";
import PayslipSendPage from "./pages/PayslipSendPage";
import PayslipStatsPage from "./pages/PayslipStatsPage";
import ReportMasterPage from "./pages/reports/ReportMasterPage";
import ReportPayslipPage from "./pages/reports/ReportPayslipPage";
import ReportAllowancePage from "./pages/reports/ReportAllowancePage";
import ReportDeductionPage from "./pages/reports/ReportDeductionPage";
import ReportCheckListPage from "./pages/reports/ReportChecksListPage";
import ReportNorminalRollPage from "./pages/reports/ReportNorminalRollPage";
import ReportBankSchedulePage from "./pages/reports/ReportBankSchedulePage";
import ReportBankStatementPage from "./pages/reports/ReportBankStatementPage";
import ReportDeductionEpayPage from "./pages/reports/ReportDeductionEpayPage";
import ReportJournalPage from "./pages/reports/ReportJournalPage";
import ReportStatusPage from "./pages/reports/ReportStatusPage";
import ReportConsolidationPage from "./pages/reports/ReportConsolidationPage";
import ReportCharmsPage from "./pages/reports/ReportCharmsPage";
import ReportVariationPage from "./pages/reports/ReportVariationPage";
import AllOverlays from "./components/overlays/AllOverlays";
import AllowanceConfigPage from "./pages/AllowanceConfigPage";
import DeductionConfigPage from "./pages/DeductionConfigPage";
import RegisterPage from "./pages/administration/RegisterPage";
import UploadAllowancesPage from "./pages/administration/UploadAllowancesPage";
import UploadDeductionsPage from "./pages/administration/UploadDeductionsPage";
import SwitchMonthPage from "./pages/administration/SwitchMonthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/on-boarding",
  //   element: <OnboardingPage />,
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/staff/add-new",
    element: <AddStaffPage />,
  },
  {
    path: "/staff/all-staffs",
    element: <AllStaffsPage />,
  },
  {
    path: "/staff/view-data/:id",
    element: <StaffDetailsPage />,
  },
  {
    path: "/staff/edit-job/:id",
    element: <StaffEditJobDetailsPage />,
  },
  {
    path: "/staff/edit-account/:id",
    element: <StaffEditAccountDetailsPage />,
  },
  {
    path: "/staff/edit-biodata/:id",
    element: <StaffEditBiodataPage />,
  },
  {
    path: "/configuration/titles",
    element: <ConfigTitlesPage />,
  },
  {
    path: "/configuration/designations",
    element: <ConfigDesignationsPage />,
  },
  {
    path: "/configuration/units",
    element: <ConfigUnitsPage />,
  },
  {
    path: "/configuration/divisions",
    element: <ConfigDivisionsPage />,
  },
  {
    path: "/configuration/job-classification",
    element: <ConfigJobClassificationsPage />,
  },
  {
    path: "/configuration/pension-names",
    element: <ConfigPensionNamesPage />,
  },
  {
    path: "/configuration/bank-names",
    element: <ConfigBankNamesPage />,
  },
  {
    path: "/salary-configuration",
    element: <SalaryConfigPage />,
  },
  {
    path: "/allowances-configuration",
    element: <AllowanceConfigPage />,
  },
  {
    path: "/deductions-configuration",
    element: <DeductionConfigPage />,
  },
  {
    path: "/profile-settings",
    element: <MyProfilePage />,
  },
  {
    path: "/administration-settings/register",
    element: <RegisterPage />,
  },
  {
    path: "/administration-settings/upload-allowances",
    element: <UploadAllowancesPage />,
  },
  {
    path: "/administration-settings/upload-deductions",
    element: <UploadDeductionsPage />,
  },
  {
    path: "/administration-settings/switch-month",
    element: <SwitchMonthPage />,
  },
  {
    path: "/payslip/send-payslip",
    element: <PayslipSendPage />,
  },
  {
    path: "/payslip/statistics",
    element: <PayslipStatsPage />,
  },
  {
    path: "/report/master",
    element: <ReportMasterPage />,
  },
  {
    path: "/report/payslip",
    element: <ReportPayslipPage />,
  },
  {
    path: "/report/allowance",
    element: <ReportAllowancePage />,
  },
  {
    path: "/report/deduction",
    element: <ReportDeductionPage />,
  },
  {
    path: "/report/checklist",
    element: <ReportCheckListPage />,
  },
  {
    path: "/report/norminal-roll",
    element: <ReportNorminalRollPage />,
  },
  {
    path: "/report/bank-schedule",
    element: <ReportBankSchedulePage />,
  },
  {
    path: "/report/bank-statement",
    element: <ReportBankStatementPage />,
  },
  {
    path: "/report/deduct-epay",
    element: <ReportDeductionEpayPage />,
  },
  {
    path: "/report/journal",
    element: <ReportJournalPage />,
  },
  {
    path: "/report/status",
    element: <ReportStatusPage />,
  },
  {
    path: "/report/consolidation-basic",
    element: <ReportConsolidationPage />,
  },
  {
    path: "/report/charms-payroll",
    element: <ReportCharmsPage />,
  },
  {
    path: "/report/variation",
    element: <ReportVariationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <AllOverlays />
    <RouterProvider router={router} />
  </React.StrictMode>
);
