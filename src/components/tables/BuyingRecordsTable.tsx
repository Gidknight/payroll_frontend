"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

const columns: GridColDef[] = [
  { field: "id", headerName: "Sales ID", width: 80 },

  {
    field: "sold_by",
    headerName: "Sold By",
    type: "string",
    width: 100,
    editable: false,
    sortable: true,
  },
  {
    field: "products_sold",
    headerName: "Products Sold",
    type: "string",
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "no_of_items_sold",
    headerName: "Product Count",
    type: "number",
    width: 50,
    editable: false,
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 90,
    editable: false,
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    width: 100,
    editable: false,
    sortable: true,
  },
  {
    field: "mode_of_payment",
    headerName: "Paid With",
    type: "string",
    width: 90,
    editable: false,
    sortable: true,
  },
  {
    field: "payable_amount",
    headerName: "Amount to pay",
    type: "number",
    width: 90,
    editable: false,
  },

  {
    field: "status",
    headerName: "Status",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <p
        className={`flex text-xs capitalize w-full h-full justify-between items-center
      ${params?.row?.status == true ? "text-green-600" : "text-red-500"}
      `}
      >
        <span
          className={`p-1 rounded-full  ${
            params?.row?.status == true ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {" "}
        </span>
        <span>{params?.row?.status == true ? "Cleared" : "Owing"}</span>
      </p>
    ),
  },
  {
    field: "details",
    headerName: "Details",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <Link href={`/sales/sales-history/${params?.row?.id}`}>
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
    name: string;
    description: string;
    supplier: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  isLoading: boolean;
}

const BuyingRecordsTable = ({ data, isLoading }: TableType) => {
  return (
    <div className="w-full">
      {data.length === 0 && !isLoading ? (
        <h3 className="text-xl text-error font-bold italic text-center">
          No Sales Data Available
        </h3>
      ) : isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <BiLoaderCircle className="animate-spin" color="#05AC26" size={25} />
          <p className="text-base text-live font-semibold animate-pulse">
            Fetching data...----
          </p>
        </div>
      ) : (
        <div>
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
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

export default BuyingRecordsTable;
