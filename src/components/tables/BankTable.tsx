import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { TitleTypes } from "../../types";

const BankTable = ({
  data,
  title = "",
  showFunction,
}: {
  data: TitleTypes[];
  title: string;
  showFunction: (title_id: number) => void;
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 80,
      sortable: true,
    },
    {
      field: "Name",
      headerName: "Name",
      type: "string",
      width: 200,
      sortable: true,
    },
    {
      field: "Sortcode",
      headerName: "Sort Code",
      type: "number",
      width: 100,
      sortable: true,
    },
    {
      field: "users",
      headerName: "Users",
      type: "number",
      width: 100,
      sortable: true,
    },

    {
      field: "more",
      headerName: "",
      width: 100,
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

  const rows = data;
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
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              pageSizeOptions={[10, 15, 30, 50]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default BankTable;
