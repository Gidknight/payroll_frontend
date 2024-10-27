"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

const columns: GridColDef[] = [
  // { field: "id", headerName: "Account ID", width: 100 },
  {
    field: "attendant",
    headerName: "Attendant",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "mode_of_payment",
    headerName: "Mode Of Payment",
    type: "string",
    width: 100,
    editable: false,
  },
  {
    field: "payment",
    headerName: "Amount Paid",
    type: "number",
    width: 120,
    editable: false,
  },
  {
    field: "prev_balance",
    headerName: "Old Balance",
    type: "number",
    width: 120,
    editable: false,
  },
  {
    field: "new_balance",
    headerName: "Current Balance",
    type: "number",
    width: 120,
    editable: false,
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    width: 120,
    editable: false,
  },
  {
    field: "top_up",
    headerName: "Reason",
    type: "string",
    width: 120,
    editable: false,
    renderCell: (params) => (
      <p
        className={`flex text-sm capitalize w-full h-full justify-start gap-2 items-center
      ${params?.row?.top_up == true ? "text-green-600" : "text-red-500"}
      `}
      >
        <span
          className={`p-1 rounded-full  ${
            params?.row?.top_up == true ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {" "}
        </span>
        <span>{params?.row?.top_up == true ? "Top up" : "Debt Payment"}</span>
      </p>
    ),
  },
  // {
  //   field: "cl_no",
  //   headerName: "Cl Number",
  //   type: "string",
  //   width: 100,
  //   editable: false,
  // },
  // {
  //   field: "cl_date",
  //   headerName: "Cl Date",
  //   type: "string",
  //   width: 100,
  //   editable: false,
  // },

  // {
  //   field: "status",
  //   headerName: "Application Status",
  //   type: "string",
  //   width: 100,
  //   editable: false,
  // },

  // {
  //   field: "details",
  //   headerName: "",
  //   width: 70,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <Link href={`productdetails/${params?.row?.id}`}>
  //       <button className="bg-blue-400 text-white text-center text-xs p-2 capitalize rounded-xl hover:shadow-sm hover:scale-[105%] transition-all duration-200">
  //         details
  //       </button>
  //     </Link>
  //   ),
  // },
];

interface TableType {
  data: {
    id: number | string;
    first_name?: string;
    last_name?: string;
    address?: string;
    contact?: string | number;
    cl_no: number | string;
    cl_date: any;
    remarks?: string;
    credit_status?: string;
  }[];
  isLoading: boolean;
}

const PaymentTable = ({ data, isLoading }: TableType) => {
  return (
    <div className="w-full">
      {data.length === 0 && !isLoading ? (
        <h3 className="text-xl text-error font-bold italic text-center">
          No Data Available
        </h3>
      ) : isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <BiLoaderCircle className="animate-spin" color="#05AC26" size={25} />
          <p className="text-base text-live font-semibold animate-pulse">
            Fetching data...
          </p>
        </div>
      ) : (
        <div>
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              // {...data}

              disableRowSelectionOnClick
              // pageSizeOptions={[5]}
              columns={columns}
              rows={data}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
