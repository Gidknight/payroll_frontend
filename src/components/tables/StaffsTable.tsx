"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { BiLoaderCircle } from "react-icons/bi";

import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  // { field: "id", headerName: "S/N", width: 50 },
  { field: "staff_no", headerName: "Staff Number", width: 80 },
  {
    field: "title",
    headerName: "Title",
    width: 80,
    sortable: true,
    editable: false,
  },

  {
    field: "surname",
    headerName: "Surname",
    type: "string",
    width: 120,
    editable: false,
  },
  {
    field: "firstname",
    headerName: "First Name",
    type: "string",
    width: 120,
    editable: false,
  },
  // {
  //   field: "other_name",
  //   headerName: "Other Names",
  //   type: "string",
  //   width: 120,
  //   editable: false,
  // },
  {
    field: "email_address",
    headerName: "Email Address",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 100,
    editable: false,
    sortable: true,
  },
  {
    field: "salary_scale",
    headerName: "Scale",
    type: "string",
    width: 120,
    editable: false,
  },
  {
    field: "job_status",
    headerName: "Status",
    type: "string",
    width: 120,
    editable: false,
    sortable: true,
  },
  // {
  //   field: "sell",
  //   headerName: "Sell",
  //   width: 70,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <div className="flex w-full h-full items-center justify-center">
  //       <button
  //         disabled={!params.row.quantity ? true : false}
  //         onClick={() => sellProduct(params.row)}
  //         className={`flex flex-row items-center justify-center gap-1  text-center text-xs p-2 capitalize rounded-xl
  //         ${
  //           !params.row.status || !params.row.quantity
  //             ? "bg-slate-200 text-slate-600 cursor-not-allowed"
  //             : "bg-live text-white hover:shadow-sm hover:scale-[105%] transition-all duration-200"
  //         }
  //         `}
  //       >
  //         <span>
  //           <BiCartAdd size={16} />
  //         </span>
  //         <span>Sell</span>
  //       </button>
  //     </div>
  //   ),
  // },
  {
    field: "details",
    headerName: "Details",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <Link to={`/staff/view-data/${params?.row?.id}`}>
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
    cost_price: number;
    category: string;
  }[];
  isLoading: boolean;
}

const StaffsTable = ({ data, isLoading }: TableType) => {
  return (
    <div className="w-full">
      {data.length === 0 && !isLoading ? (
        <h3 className="text-xl text-error font-bold italic text-center">
          No Staff Available
        </h3>
      ) : isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <BiLoaderCircle className="animate-spin" color="#05AC26" size={25} />
          <p className="text-base text-live font-semibold animate-pulse">
            Fetching data...----
          </p>
          {/* <Image
            src={"/images/headshot.jpg"}
            alt={"dff"}
            width={50}
            height={50}
            className="w-50  rounded-full transition-all duration-200"
          />
          <img src="/images/headshot.jpg" alt="the second image" /> */}
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

export default StaffsTable;
