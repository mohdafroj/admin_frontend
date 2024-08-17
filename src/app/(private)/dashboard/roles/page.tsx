"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
  Container
} from "@mui/material";
import MUITable from "@/components/datatable";
import Form from "./form";
function Roles() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "role_id", headerName: "Role Id", width: 90,headerClassName: "super-app-theme--header",
      flex: 1, },
    {
      field: "role_name",
      headerName: "Name",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "role_description",
      headerName: "Role Description",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "role_shortCode",
      headerName: "Role Short Code",
      width: 80,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },

    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
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
      role_id: "1",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
      
    },
    {
      id: "2",
      role_id: "2",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role_shortCode: "OTR",
      role: "Venue Supervisor",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "3",
      role_id: "3",
      role_name: "Deputy Director",
      role_shortCode: "OTR",
      role_description: "Deputy Director",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "4",
      role_id: "4",
      role_name: "Deputy Director",
      role_shortCode: "OTR",
      role_description: "Deputy Director",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "5",
      role_id: "5",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role_shortCode: "OTR",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "6",
      role_id: "6",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "7",
      role_id: "7",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "8",
      role_id: "8",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "9",
      role_id: "9",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "10",
      role_id: "10",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "11",
      role_id: "11",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "inactive",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
    },
    {
      id: "12",
      role_id: "12",
      role_name: "Deputy Director",
      role_description: "Deputy Director",
      role: "Venue Supervisor",
      role_shortCode: "OTR",
      status: "active",
      Created_DT: "21-02-2022",
      creation_by:'07-08-2024',
      Modified_BY:"21-02-2022",
      Modified_DT:'07-08-2024',
      Record_Version:'4',
      Audit_Log_Id:'76ru',
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
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05), 0px -4px 8px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      overflow: 'hidden', 
    }}>
      <CardContent>
   <Container sx={{display:'flex', justifyContent:"space-between", margin:'20px'}}>
      <Typography variant="h6" sx={{fontWeight:'bold'}} >
        Roles
      </Typography>
      <Button variant="contained" color="primary"  onClick={handleClickOpen}>
        Add Role
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
             justifySelf:'end'
            }}
          >
         Add Roles
          </Typography>
        </DialogTitle>
        <DialogContent>
     {<Form/>}
        </DialogContent>
        <DialogActions>
      
        </DialogActions>
      </Dialog>
    </CardContent>
    </Card>
  );
}

export default Roles;
