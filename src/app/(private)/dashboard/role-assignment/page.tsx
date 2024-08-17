"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Form
import { useState } from "react";
import { Typography, Container, IconButton, Button, Dialog, DialogTitle } from "@mui/material";
import MUITable from "@/components/datatable";
// import Form from "./form";

function RoleAssignment() {
  const rows = [
    {
      id: "1",
      userRoleMasterId: "1",
      userUuid: "aa51383e-0359-42ec-ac1a-f3458166b949",
      roleId: 10,
      roleIdNameEn: "Checker",
      moduleId: 2,
      moduleNameEN: "SOAP",
      moduleSubId: 4,
      moduleSubNameEn: "Master Rule",
      isActive: "Y",
      createdBy: 1,
      createdDt: "19-Jul-2024 15:32",
      modifiedBy: 1,
      modifiedDt: "19-Jul-2024 15:32",
    },
    {
      id: "2",
      userRoleMasterId: "2",
      userUuid: "aa51383e-0359-42ec-ac1a-985643853",
      roleId: 11,
      roleIdNameEn: "Approver",
      moduleId: 2,
      moduleNameEN: "SOAP",
      moduleSubId: 5,
      moduleSubNameEn: "Candidate Profilling",
      isActive: "Y",
      createdBy: 1,
      createdDt: "19-Jul-2024 15:32",
      modifiedBy: 1,
      modifiedDt: "19-Jul-2024 15:32",
    },
  ];

  // Columns configuration for DataGrid (assuming these are the headers)
  const columns: GridColDef[] = [
    {
      field: "userRoleMasterId",
      headerName: "User Role Master Id",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "userUuid",
      headerName: "User Uuid",
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "roleId",
      headerName: "Role Id",
      width: 120,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "roleIdNameEn",
      headerName: "Role Id Name",
      width: 180,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "moduleId",
      headerName: "Module Id",
      width: 120,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "moduleNameEN",
      headerName: "module Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "moduleSubId",
      headerName: "module Sub Id",
      width: 150,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "moduleSubNameEn",
      headerName: "module Sub Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "createdBy",
      headerName: "CreatedBy",
      width: 120,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "createdDt",
      headerName: "Created Dt",
      width: 180,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 120,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "modifiedDt",
      headerName: "Modified Dt",
      width: 180,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 120,
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
      editable: true,
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
    <Card sx={{
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05), 0px -4px 8px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      overflow: 'hidden', 
    }}>
      <CardContent>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Typography variant="h6"> Role Assignment</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Role Assignment
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
              fontSize:'20px'
            }}
          >
            Add Role Assignment
          </Typography>
        </DialogTitle>
        {/* <DialogContent>{<Form />}</DialogContent> */}
      </Dialog>
      </CardContent>
    </Card>
  );
}

export default RoleAssignment;
