"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

const columns: GridColDef[] = [
  { field: "id", headerName: "Account ID", width: 100 },
  {
    field: "last_name",
    headerName: "Last Name",
    type: "string",
    width: 110,
    editable: false,
  },
  {
    field: "first_name",
    headerName: "First Name",
    type: "string",
    width: 110,
    editable: false,
  },
  {
    field: "address",
    headerName: "Address",
    type: "string",
    width: 120,
    editable: false,
  },
  {
    field: "contact",
    headerName: "Contact",
    type: "string",
    width: 100,
    editable: false,
  },
  {
    field: "debt",
    headerName: "Debt",
    type: "number",
    width: 80,
    editable: false,
  },
  {
    field: "cl_no",
    headerName: "Cl Number",
    type: "string",
    width: 100,
    editable: false,
  },
  {
    field: "cl_date",
    headerName: "Cl Date",
    type: "string",
    width: 100,
    editable: false,
  },

  {
    field: "status",
    headerName: "Application Status",
    type: "string",
    width: 100,
    editable: false,
  },

  {
    field: "details",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <Link href={`customer/${params?.row?.id}`}>
        <button className="bg-blue-400 text-white text-center text-xs p-2 capitalize rounded-xl hover:shadow-sm hover:scale-[105%] transition-all duration-200">
          details
        </button>
      </Link>
    ),
  },
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
    debt: number;
  }[];
  isLoading: boolean;
}

const CreditorTable = ({ data, isLoading }: TableType) => {
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

export default CreditorTable;
