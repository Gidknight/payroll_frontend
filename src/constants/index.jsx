import { BiCategory, BiDish, BiGroup, BiTable, BiUser } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { FaHandshake, FaTruckMoving } from "react-icons/fa";
import { GiHelp, GiStockpiles, GiWizardStaff } from "react-icons/gi";
import { GrHostMaintenance } from "react-icons/gr";
import {
  MdDashboard,
  MdEmail,
  MdGroups,
  MdReceiptLong,
  MdSettings,
} from "react-icons/md";
import { RiAdminFill, RiExchangeDollarFill } from "react-icons/ri";

export const CURRENCY = "NGN";

export const JOB_STATUS_OPTIONS = [
  { id: "IN SERVICE", Name: "IN SERVICE" },
  { id: "SUSPENDED", Name: "SUSPENDED" },
  { id: "TERMINATED", Name: "TERMINATED" },
  { id: "RETIRED", Name: "RETIRED" },
];

export const JOB_LEVELS = [
  { id: "01", Name: "01" },
  { id: "02", Name: "02" },
  { id: "03", Name: "03" },
  { id: "04", Name: "04" },
  { id: "05", Name: "05" },
  { id: "06", Name: "06" },
  { id: "07", Name: "07" },
  { id: "08", Name: "08" },
  { id: "09", Name: "09" },
  { id: "10", Name: "10" },
  { id: "11", Name: "11" },
  { id: "12", Name: "12" },
];

export const JOB_STEPS = [
  { id: "01", Name: "01" },
  { id: "02", Name: "02" },
  { id: "03", Name: "03" },
  { id: "04", Name: "04" },
  { id: "05", Name: "05" },
  { id: "06", Name: "06" },
  { id: "07", Name: "07" },
  { id: "08", Name: "08" },
  { id: "09", Name: "09" },
  { id: "10", Name: "10" },
  { id: "11", Name: "11" },
  { id: "12", Name: "12" },
  { id: "13", Name: "13" },
  { id: "14", Name: "14" },
  { id: "15", Name: "15" },
  { id: "16", Name: "16" },
  { id: "17", Name: "17" },
  { id: "18", Name: "18" },
  { id: "19", Name: "19" },
  { id: "20", Name: "20" },
];

export const NAV_LINKS = [
  {
    id: 1,
    title: "Home",
    link: "/",
    icon: <MdDashboard />,
    hasSub: false,
  },
  {
    id: 2,
    title: "Staffs",
    link: "/staff",
    icon: <BiUser />,
    hasSub: true,
    subMenu: [
      {
        id: 21,
        title: "Add New Staff",
        link: "/staff/add-new",
        icon: <FaHandshake />,
      },
      {
        id: 22,
        title: "All Staffs",
        link: "/staff/all-staffs",
        icon: <MdReceiptLong />,
      },
    ],
  },
  {
    id: 3,
    title: "Configuration",
    link: "/configuration",
    icon: <GrHostMaintenance />,
    hasSub: true,
    subMenu: [
      {
        id: 31,
        title: "Titles",
        link: "/configuration/titles",
        icon: <BiCategory />,
      },
      {
        id: 32,
        title: "Designations",
        link: "/configuration/designations",
        icon: <FaTruckMoving />,
      },
      {
        id: 33,
        title: "Units",
        link: "/configuration/units",
        icon: <BiDish />,
      },
      {
        id: 34,
        title: "Job Status",
        link: "/configuration/job-status",
        icon: <BiGroup />,
      },
      {
        id: 35,
        title: "Divisions",
        link: "/configuration/divisions",
        icon: <MdGroups />,
      },
      {
        id: 36,
        title: "Job Classification",
        link: "/configuration/job-classification",
        icon: <MdGroups />,
      },
      {
        id: 37,
        title: "Bank Names",
        link: "/configuration/bank-names",
        icon: <MdGroups />,
      },
      {
        id: 38,
        title: "Pension Names",
        link: "/configuration/pension-names",
        icon: <MdGroups />,
      },
    ],
  },
  {
    id: 4,
    title: "Salary Configuration",
    link: "/salary-configuration",
    icon: <GiStockpiles />,
    hasSub: false,
  },
  {
    id: 5,
    title: "Reports",
    link: "/reports",
    icon: <GrHostMaintenance />,
    hasSub: true,
    subMenu: [
      {
        id: 51,
        title: "Master Report",
        link: "/report/master",
        icon: <BiCategory />,
      },
      {
        id: 52,
        title: "Payslip Report",
        link: "/report/payslip",
        icon: <BiCategory />,
      },
      {
        id: 53,
        title: "Allowance Report",
        link: "/report/allowance",
        icon: <BiCategory />,
      },
      {
        id: 54,
        title: "Deduction Report",
        link: "/report/deduction",
        icon: <BiCategory />,
      },
      {
        id: 55,
        title: "Checklist Report",
        link: "/report/checklist",
        icon: <BiCategory />,
      },
      {
        id: 56,
        title: "Norminal Roll Report",
        link: "/report/norminal-roll",
        icon: <BiCategory />,
      },
      {
        id: 57,
        title: "Bank Schedule Report",
        link: "/report/bank-schedule",
        icon: <BiCategory />,
      },
      {
        id: 58,
        title: "Bank Statement Report",
        link: "/report/bank-statement",
        icon: <BiCategory />,
      },
      {
        id: 59,
        title: "Deduction E-Pay Report",
        link: "/report/deduction-epay",
        icon: <BiCategory />,
      },
      {
        id: 510,
        title: "Journal Report",
        link: "/report/journal",
        icon: <BiCategory />,
      },
      {
        id: 511,
        title: "Status Report",
        link: "/report/status",
        icon: <BiCategory />,
      },
      {
        id: 512,
        title: "Consolidation Basic Report",
        link: "/report/consolidation-basic",
        icon: <BiCategory />,
      },
      {
        id: 513,
        title: "Charms Payroll Report",
        link: "/report/charms-payroll",
        icon: <BiCategory />,
      },
      {
        id: 514,
        title: "Variation Report",
        link: "/report/variation",
        icon: <BiCategory />,
      },
    ],
  },
  {
    id: 6,
    title: "Payslip",
    link: "/payslip",
    icon: <MdReceiptLong />,
    hasSub: true,
    subMenu: [
      {
        id: 61,
        title: "Send Payslip",
        link: "/payslip/send-payslip",
        icon: <MdEmail />,
      },
      {
        id: 62,
        title: "View Stat",
        link: "/payslip/stats",
        icon: <BiTable />,
      },
    ],
  },
  {
    id: 7,
    title: "Account Settings",
    link: "/settings",
    icon: <MdSettings />,
    hasSub: false,
  },
  {
    id: 8,
    title: "Administration",
    link: "/administration",
    icon: <RiAdminFill />,
    hasSub: false,
  },
  {
    id: 9,
    title: "Help",
    link: "/help",
    icon: <GiHelp />,
    hasSub: false,
  },
];
