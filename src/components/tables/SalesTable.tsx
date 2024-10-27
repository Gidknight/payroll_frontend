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
    width: 100,
    editable: false,
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "mode_of_payment",
    headerName: "Paid With",
    type: "string",
    width: 100,
    editable: false,
    sortable: true,
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    width: 160,
    editable: false,
    sortable: true,
  },
  // {
  //   field: "print",
  //   headerName: "Print",
  //   width: 70,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <button
  //       onClick={() => printSingleReceipt(params.row)}
  //       className="flex text-xs capitalize rounded-xl hover:shadow-sm hover:scale-[105%] transition-all duration-200 w-full h-full"
  //     >
  //       <p className="m-auto bg-print text-white text-center p-2 flex items-center justify-center gap-1">
  //         <span>
  //           <PiPrinter />
  //         </span>
  //         <span>Print</span>
  //       </p>
  //     </button>
  //   ),
  // },
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

const SalesTable = ({ data, isLoading }: TableType) => {
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

export default SalesTable;
