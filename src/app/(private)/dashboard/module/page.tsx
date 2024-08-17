"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
} from "@mui/material";
import MUITable from "@/components/datatable";
import Form from "./form";
import { NumbersOutlined } from "@mui/icons-material";

function Module() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "designation_id",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "designation_name",
      headerName: "Designation Name",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "creation_by",
      headerName: "Creation By",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Created_DT",
      headerName: "Created Date",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Modified_BY",
      headerName: "Modified BY",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Modified_DT",
      headerName: "Modified DT",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 120,
      flex: 2,

      renderCell: (params) => (
        <div>
          <IconButton>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
      editable: true,
    },
  ];

  const rows = [
    {
      id: "1",
      designation_id: "1",
      designation_name: "Snow",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "2",
      designation_id: "2",
      designation_name: "Doe",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "3",
      designation_id: "3",
      designation_name: "Smith",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "4",
      designation_id: "4",
      designation_name: "Brown",

      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "5",
      designation_id: "5",
      designation_name: "Johnson",

      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "6",
      designation_id: "6",
      designation_name: "Williams",

      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "7",
      designation_id: "7",
      designation_name: "Taylor",

      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "8",
      designation_id: "8",
      designation_name: "Anderson",

      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "9",
      designation_id: "9",
      designation_name: "Thomas",

      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "10",
      designation_id: "10",
      designation_name: "Jackson",

      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "11",
      designation_id: "11",
      designation_name: "White",

      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
    {
      id: "12",
      designation_id: "12",
      designation_name: "Harris",

      status: "active",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
      Modified_BY: "21-02-2022",
      Modified_DT: "07-08-2024",
    },
  ];
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Card
      sx={{
        boxShadow:
          "0px 4px 8px rgba(0, 0, 0, 0.05), 0px -4px 8px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Modules
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Module
          </Button>
        </Container>
        <MUITable rows={rows} columns={columns} />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#2947A3",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                justifySelf: "end",
              }}
            >
              Add Module
            </Typography>
          </DialogTitle>
          <DialogContent>{<Form />}</DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default Module;
