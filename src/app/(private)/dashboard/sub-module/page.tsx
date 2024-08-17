"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from '@mui/material/CardActions';
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
  CardContent,
  Card,
} from "@mui/material";
import MUITable from "@/components/datatable";
import Form from "./form";

function Department() {
  const columns: GridColDef[] = [
    {
      field: "Sub_Module_ID",
      headerName: "Sub Module ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Sub_Module_Name_EN",
      headerName: "Sub Module Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Module_ID",
      headerName: "Module ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "Created_DT",
      headerName: "Created Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "creation_by",
      headerName: "Creation By",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      ),
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
  ];

  const rows = [
    {
      id: "1",
      Sub_Module_ID: "1",
      Sub_Module_Name_EN: "Snow",
      Module_ID: "2",
      Status: "Y",
      Created_DT: "21-02-2022",
      creation_by: "07-08-2024",
    },
    {
      id: "2",
      Sub_Module_ID: "2",
      Sub_Module_Name_EN: "Rain",
      Module_ID: "3",
      Status: "N",
      Created_DT: "22-03-2022",
      creation_by: "08-08-2024",
    },
    {
      id: "3",
      Sub_Module_ID: "3",
      Sub_Module_Name_EN: "Sun",
      Module_ID: "4",
      Status: "Y",
      Created_DT: "23-04-2022",
      creation_by: "09-08-2024",
    },
    {
      id: "4",
      Sub_Module_ID: "4",
      Sub_Module_Name_EN: "Cloud",
      Module_ID: "5",
      Status: "N",
      Created_DT: "24-05-2022",
      creation_by: "10-08-2024",
    },
    {
      id: "5",
      Sub_Module_ID: "5",
      Sub_Module_Name_EN: "Storm",
      Module_ID: "6",
      Status: "Y",
      Created_DT: "25-06-2022",
      creation_by: "11-08-2024",
    },
    {
      id: "6",
      Sub_Module_ID: "6",
      Sub_Module_Name_EN: "Fog",
      Module_ID: "7",
      Status: "N",
      Created_DT: "26-07-2022",
      creation_by: "12-08-2024",
    },
    {
      id: "7",
      Sub_Module_ID: "7",
      Sub_Module_Name_EN: "Hail",
      Module_ID: "8",
      Status: "Y",
      Created_DT: "27-08-2022",
      creation_by: "13-08-2024",
    },
    {
      id: "8",
      Sub_Module_ID: "8",
      Sub_Module_Name_EN: "Wind",
      Module_ID: "9",
      Status: "N",
      Created_DT: "28-09-2022",
      creation_by: "14-08-2024",
    },
    {
      id: "9",
      Sub_Module_ID: "9",
      Sub_Module_Name_EN: "Thunder",
      Module_ID: "10",
      Status: "Y",
      Created_DT: "29-10-2022",
      creation_by: "15-08-2024",
    },
    {
      id: "10",
      Sub_Module_ID: "10",
      Sub_Module_Name_EN: "Lightning",
      Module_ID: "11",
      Status: "N",
      Created_DT: "30-11-2022",
      creation_by: "16-08-2024",
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
            {" "}
            Sub Module
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Sub Module
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
                padding: "8px",
                borderRadius: "5px",
                justifySelf: "end",
                fontSize: "20px",
              }}
            >
              Add Sub Module
            </Typography>
          </DialogTitle>
          <DialogContent>{<Form />}</DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default Department;
