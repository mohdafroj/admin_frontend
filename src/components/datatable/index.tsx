"use client";
import * as React from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";
import { exportToExcel } from "@/utils/exportToExcel";
interface MUITableProps {
  rows: any[];
  columns: GridColDef[];
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export default function MUITable(props: MUITableProps) {
  const { rows, columns, totalCount, page, setPage, pageSize, setPageSize } =
    props;
  console.log(rows, "from dbbbbb");

  const handlePaginationModelChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <Box
      sx={{
        fontWeight: "bold",
        maxWidth: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2947A3",
          color: "#fff",
        },
        maxHeight: "550px",
      }}
    >
      {/* <Container
        sx={{
          display: "flex",
          justifyContent: "end",
          margin: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log(rows.length);
            if (rows.length >= 1) {
              exportToExcel(rows, "Excel File");
            } else {
              alert("Nothing to export");
            }
          }}
        >
          <GetAppIcon />
          Export
        </Button>
      </Container> */}
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id || row.id}
        paginationMode="server"
        rowCount={totalCount}
        paginationModel={{
          page: page,
          pageSize: pageSize,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 15, 20]}
        sx={{ minHeight: "200px" }}
        disableRowSelectionOnClick
        rowHeight={40}
        columnHeaderHeight={45}
       
      />
    </Box>
  );
}
