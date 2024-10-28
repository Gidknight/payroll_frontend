import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const StatTable = ({ data, title }: { data: {}[]; title: string }) => {
  const columns = [
    {
      field: "id",
      headerName: "S/N",
      type: "number",
      width: 70,
      sortable: true,
    },
    {
      field: "staff_no",
      headerName: "Staff No",
      type: "text",
      width: 110,
      sortable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 120,
    },
    {
      field: "firstname",
      headerName: "First Name",
      width: 120,
      editable: false,
    },
    {
      field: "email_address",
      headerName: "Email",
      width: 200,
      type: "email",
    },

    {
      field: "bank_name",
      headerName: "Bank Name",
      type: "text",
      width: 150,
      sortable: true,
    },

    {
      field: "account_number",
      headerName: "Account No",
      type: "number",
      width: 110,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 110,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 80,
      sortable: true,
      renderCell: (params: any) => {
        return (
          <p
            className={` p-2 ${
              params.row.status == "sent"
                ? "text-green-700"
                : params.row.status == "failed"
                ? "text-red-600"
                : "text-yellow-500"
            }
             rounded-xl capitalize font-semibold`}
          >
            {params.row.status}
          </p>
        );
      },
    },
    {
      field: "more",
      headerName: "",
      width: 70,
      renderCell: (params: any) => {
        return (
          <>
            <Link
              to={`/all-staffs/${params.row.id}`}
              className=" p-1 bg-gray2 text-white text-center text-xs hover:bg-primary hover:shadow-lg rounded-lg duration-300 transition-all "
            >
              More...
            </Link>
          </>
        );
      },
    },
  ];

  const rows = data;
  return (
    <div
      className={`bg-white shadow-lg flex flex-col items-center justify-start w-full p-2  border-t-4 ${
        data?.length ? "border-live" : "border-secondary"
      }`}
    >
      <h1 className="text-xl font-bold text-slate-700 capitalize pb-4">
        {title} table
      </h1>
      <div>
        {!data?.length ? (
          <div>
            <h2 className="font-semibold text-slate-400 italic">
              No Staff Data found
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
                    pageSize: 25,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              pageSizeOptions={[25, 50, 75, 100]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default StatTable;
