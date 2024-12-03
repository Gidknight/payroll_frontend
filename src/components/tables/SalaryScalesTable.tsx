"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { BiLoaderCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SalaryScaleFullTypes } from "../../types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    type: "string",
    width: 100,
    editable: false,
  },
  {
    field: "GradeCode",
    headerName: "Grade Code",
    type: "string",
    width: 100,
    editable: false,
  },
  {
    field: "Level",
    headerName: "Level",
    type: "string",
    width: 70,
    editable: false,
  },
  {
    field: "Step",
    headerName: "Step",
    type: "string",
    width: 70,
    editable: false,
  },
  {
    field: "Amount",
    headerName: "Amount",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "Rent",
    headerName: "Rent",
    type: "number",
    width: 70,
    editable: false,
  },
  {
    field: "Transport",
    headerName: "Transport",
    type: "number",
    width: 70,
    editable: false,
  },

  {
    field: "CallDuty",
    headerName: "Call Duty",
    type: "number",
    width: 70,
    editable: false,
  },
  {
    field: "Percular",
    headerName: "Percular",
    type: "number",
    width: 70,
    editable: false,
  },
  {
    field: "Rural",
    headerName: "Rural",
    type: "number",
    width: 70,
    editable: false,
  },
  {
    field: "links",
    headerName: "Links",
    type: "number",
    width: 70,
    editable: false,
  },

  {
    field: "details",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <Link to={`/salary-configuration/${params?.row?.id}`}>
        <button className="bg-blue-400 text-white text-center text-xs p-2 capitalize rounded-xl hover:shadow-sm hover:scale-[105%] transition-all duration-200">
          details
        </button>
      </Link>
    ),
  },
];

interface TableType {
  data: SalaryScaleFullTypes[];
  isLoading: boolean;
}

const SalaryScalesTable = ({ data, isLoading }: TableType) => {
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

export default SalaryScalesTable;
