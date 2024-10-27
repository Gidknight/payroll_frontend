"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 100 },
  {
    field: "name",
    headerName: "Product Name",
    type: "string",
    width: 180,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 80,
    editable: false,
  },
  {
    field: "supplier_name",
    headerName: "Supplier",
    type: "string",
    width: 120,
    editable: false,
  },
  {
    field: "category_name",
    headerName: "Category",
    type: "string",
    width: 120,
    editable: false,
  },

  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 100,
    renderCell: (params) => (
      <p className={params?.row?.status ? "text-green-500" : "text-red-500"}>
        {params?.row?.status ? "Available" : "Not Available"}
      </p>
    ),
  },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   type: "date",
  //   width: 90,
  //   editable: false,
  //   // valueGetter: (params: any) => convertDate(params?.row?.createdAt, true),

  //   renderCell: (params: any) => {
  //     const date = convertDate(params?.row.createdAt, true);
  //     return <p>{date}</p>;
  //   },
  // },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
  {
    field: "details",
    headerName: "",
    width: 80,
    sortable: false,
    renderCell: (params) => (
      <Link href={`/maintenance/product/${params?.row?.id}`}>
        <button className="bg-blue-400 text-white text-center text-xs p-2 capitalize rounded-xl hover:shadow-sm hover:scale-[105%] transition-all duration-200">
          details
        </button>
      </Link>
    ),
  },
];

interface TableType {
  data: {
    id: number;
    name: string;
    quantity?: number;
    supplier_name?: string;
    delivery_date?: Date;
  }[];
  isLoading: boolean;
}

const StockTable = ({ data, isLoading }: TableType) => {
  return (
    <div className="w-full">
      {data.length === 0 && !isLoading ? (
        <h3 className="text-xl text-error font-bold italic text-center">
          No Product Found
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

export default StockTable;
