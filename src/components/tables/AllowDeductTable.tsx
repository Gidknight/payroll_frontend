import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AllowanceTypes } from "../../types";

const AllowDeductTable = ({
  data,
  title = "",
  showFunction,
}: {
  data: AllowanceTypes[];
  title: string;
  showFunction: (title_id: number) => void;
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 50,
      sortable: true,
    },
    {
      field: "Name",
      headerName: "Name",
      type: "string",
      width: 150,
      sortable: true,
    },
    {
      field: "Codes",
      headerName: "code",
      type: "string",
      width: 80,
      sortable: true,
    },
    {
      field: "users",
      headerName: "Links",
      type: "number",
      width: 100,
      sortable: true,
    },

    {
      field: "",
      headerName: "action",
      width: 70,
      //   sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <button
              onClick={() => showFunction(params.row.id)}
              className=" py-2 px-5 bg-gray2 text-white text-center text-sm hover:bg-primary hover:shadow-lg rounded-lg duration-300 transition-all "
            >
              Edit
            </button>
          </>
        );
      },
    },
  ];

  // const rows = data;
  return (
    <div
      className={`bg-white shadow-lg flex flex-col items-center justify-start w-full p-3  border-t-4 ${
        data.length > 0 ? "border-live" : "holder-null"
      }`}
    >
      <h1 className="header-text pb-2">{title} Table</h1>
      <div>
        {!data?.length ? (
          <div>
            <h2 className="font-semibold text-slate-400 italic">
              No Data found
            </h2>
          </div>
        ) : (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              pageSizeOptions={[5, 10, 15, 30, 50]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default AllowDeductTable;
