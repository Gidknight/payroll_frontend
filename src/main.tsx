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
// import SalesHistoryPage from "./pages/SalesHistoryPage";
// import SalesDetailPage from "./pages/SalesDetailPage";
// import CategoriesPage from "./pages/CategoriesPage";
// import CategoryDetailsPage from "./pages/CategoryDetailsPage";
// import SuppliersPage from "./pages/SuppliersPage";
// import SupplierDetailsPage from "./pages/SupplierDetailsPage";
// import ProductsPage from "./pages/ProductsPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import NewProductPage from "./pages/NewProductPage";
// import CustomersPage from "./pages/CustomersPage";
// import NewCustomerPage from "./pages/NewCustomerPage";
// import CustomerDetailsPage from "./pages/CustomerDetailsPage";
// import CreditorsPage from "./pages/CreditorsPage";
// import SettingsPage from "./pages/SettingsPage";
// import AdministrationPage from "./pages/AdministrationPage";
// import AdminUserDetailsPage from "./pages/AdminUserDetailsPage";
// import NewUserPage from "./pages/NewUserPage";
// import AnalysisPage from "./pages/AnalysisPage";
// import ReportInventoryPage from "./pages/ReportInventoryPage";
// import ReportCreditsPage from "./pages/ReportCreditsPage";
// import ReportHistoryLogPage from "./pages/ReportHistoryLogPage";
// import ReportPaymentsPage from "./pages/ReportPaymentsPage";
// import ReportSalesPage from "./pages/ReportSalesPage";
// import ReportStaffSalesHistoryPage from "./pages/ReportStaffSalesHistoryPage";
// import OnboardingPage from "./OnboardingPage";

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
  // {
  //   path: "/maintenance/product/add-new",
  //   element: <NewProductPage />,
  // },
  // {
  //   path: "/maintenance/product/:id",
  //   element: <ProductDetailsPage />,
  // },
  // {
  //   path: "/maintenance/customer",
  //   element: <CustomersPage />,
  // },
  // {
  //   path: "/maintenance/customer/add-new",
  //   element: <NewCustomerPage />,
  // },
  // {
  //   path: "/maintenance/customer/:id",
  //   element: <CustomerDetailsPage />,
  // },
  // {
  //   path: "/maintenance/creditor",
  //   element: <CreditorsPage />,
  // },
  // {
  //   path: "/stock-in",
  //   element: <Stockin />,
  // },
  // {
  //   path: "/report/inventory",
  //   element: <ReportInventoryPage />,
  // },
  // {
  //   path: "/report/credits",
  //   element: <ReportCreditsPage />,
  // },
  // {
  //   path: "/report/history-log",
  //   element: <ReportHistoryLogPage />,
  // },
  // {
  //   path: "/report/payment",
  //   element: <ReportPaymentsPage />,
  // },
  // {
  //   path: "/report/sales",
  //   element: <ReportSalesPage />,
  // },
  // {
  //   path: "/report/staff-sales-history",
  //   element: <ReportStaffSalesHistoryPage />,
  // },
  // {
  //   path: "/analysis",
  //   element: <AnalysisPage />,
  // },
  // {
  //   path: "/settings",
  //   element: <SettingsPage />,
  // },
  // {
  //   path: "/administration",
  //   element: <AdministrationPage />,
  // },
  // {
  //   path: "/administration/user/:id",
  //   element: <AdminUserDetailsPage />,
  // },
  // {
  //   path: "/administration/add-user",
  //   element: <NewUserPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
