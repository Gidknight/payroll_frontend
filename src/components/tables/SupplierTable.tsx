"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

const columns: GridColDef[] = [
  { field: "name", headerName: "Supplier Name", width: 150 },
  {
    field: "address",
    headerName: "Address",
    type: "string",
    width: 150,
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
    field: "status",
    headerName: "Status",
    type: "string",
    width: 100,
    editable: false,
    renderCell: (params) => (
      <p className={params?.row?.status ? "text-green-500" : "text-red-500"}>
        {params?.row?.status ? "Active" : "Not Active"}
      </p>
    ),
  },

  {
    field: "details",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Link href={`/maintenance/supplier/${params?.row?.id}`}>
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
    unit: string;
  }[];
  isLoading: boolean;
}

const SupplierTable = ({ data, isLoading }: TableType) => {
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

export default SupplierTable;
