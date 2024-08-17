"use client";
import { GridColDef } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { toast } from "react-toastify";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
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
  FormControl,
  RadioGroup,
  TextField,
} from "@mui/material";
import MUITable from "@/components/datatable";
import Form from "./form";
import UserContext from "@/context/UserContext";
import { NumbersOutlined } from "@mui/icons-material";
import { apiCalls } from "@/services/report";
import View from "./view";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Designation() {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [departmentData, setDesignationData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [backendFilter, setBackendFilter] = useState(false);
  const { setTitle }: any = useContext(UserContext);
  const [filterdesignationData, setfilterDesignationData] = useState<any>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<any>(null);

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    "  http://172.16.11.16:8101/UserMgmt/API/v1/master_data";
  const columns = [
    {
      field: "designationId",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "designationNameEn",
      headerName: "Designation Name (Eng)",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "designationNameHi",
      headerName: "Designation Name (Hin)",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "designationShortName",
      headerName: "Designation Short Name",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },

    {
      field: "createdBy",
      headerName: "Created By",

      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "createdDt",
      headerName: "Created Date",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "modifiedBy",
      headerName: "Last Modified By",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "modifiedDt",
      headerName: "Last Modified Date",
      width: 130,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,

      renderCell: (params: any) => (
        <div>
          <IconButton onClick={() => handleViewOpen(params.row)}>
            <PreviewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleEditOpen(params.row)}>
            <EditNoteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
  ];

  // const rows = [
  //   {
  //     id: "1",
  //     designation_id: "1",
  //     designation_name: "Snow",
  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //   },
  //   {
  //     id: "2",
  //     designation_id: "2",
  //     designation_name: "Doe",
  //     status: "inactive",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "3",
  //     designation_id: "3",
  //     designation_name: "Smith",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "4",
  //     designation_id: "4",
  //     designation_name: "Brown",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "5",
  //     designation_id: "5",
  //     designation_name: "Johnson",

  //     status: "inactive",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "6",
  //     designation_id: "6",
  //     designation_name: "Williams",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "7",
  //     designation_id: "7",
  //     designation_name: "Taylor",

  //     status: "inactive",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "8",
  //     designation_id: "8",
  //     designation_name: "Anderson",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "9",
  //     designation_id: "9",
  //     designation_name: "Thomas",

  //     status: "inactive",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "10",
  //     designation_id: "10",
  //     designation_name: "Jackson",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "11",
  //     designation_id: "11",
  //     designation_name: "White",

  //     status: "inactive",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  //   {
  //     id: "12",
  //     designation_id: "12",
  //     designation_name: "Harris",

  //     status: "active",
  //     Created_DT: "21-02-2022",
  //     creation_by: "07-08-2024",
  //     Modified_BY: "21-02-2022",
  //     Modified_DT: "07-08-2024",
  //     Record_Version: "4",
  //     Audit_Log_Id: "76ru",
  //   },
  // ];

  const getAlldesignation = async (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    // Default values for page and limit
    try {
      const response = await axios.post(
        `${backendBaseUrl}/getAllDesignation/`,
        {
          page: page + 1,
          limit: pageSize,
        }
      );

      // const payload = {
      //   url: "master_data/getAllDesignation",
      //   data: { page: page + 1, limit: pageSize },
      // };

      // const response = await apiCalls("post", payload);

      // console.log(response, "respionse from backend");
      // const countData = response.data.countData;
      setTotalCount(response.data.totalCount);
      setDesignationData(response?.data.designations); // Assuming the data is returned in a `departments` property
      setfilterDesignationData(response?.data.designations);
      setBackendFilter(response.data.totalCount > 50 ? true : false);
    } catch (e) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // const formatDateForBackend = (date: any) => {
  //   if (!date) return null;
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  //   const year = date.getFullYear();
  //   return `${year}-${month}-${day}`;
  // };

  // const filterDepartments = async () => {
  //   if (backendFilter) {
  //     console.log(backendFilter);
  //     try {
  //       const formattedStartDate = startDate
  //         ? formatDateForBackend(new Date(startDate))
  //         : null;
  //       const formattedEndDate = endDate
  //         ? formatDateForBackend(new Date(endDate))
  //         : null;

  //       const params =
  //         filterType === "date"
  //           ? { startDate: formattedStartDate, endDate: formattedEndDate }
  //           : { departmentNameEn: filterValue };

  //       console.log(startDate, endDate, "from oisxsnxsnjxsn");
  //       const response = await axios.post(
  //         `${backendBaseUrl}/getAllDepartment`,
  //         {
  //           params,
  //         }
  //       );

  //       console.log(response, "kjndkjcnd");
  //       setfilterDepartmentData(response?.data?.departments);
  //     } catch (e) {
  //       toast.error("Something went wrong", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   } else {
  //     const filteredData = departmentData.filter((department: any) => {
  //       if (filterType === "date" && startDate && endDate) {
  //         const createdAtDate = new Date(department.createdAt).setHours(
  //           0,
  //           0,
  //           0,
  //           0
  //         );
  //         const start = new Date(startDate).setHours(0, 0, 0, 0);
  //         const end = new Date(endDate).setHours(0, 0, 0, 0);
  //         // console.log(start, end, "dkncdncdjnc");
  //         return createdAtDate >= start && createdAtDate <= end;
  //       } else if (filterType === "name" && filterValue) {
  //         // console.log(filterValue, "nameeeeeeee"); // Ensure the search is case-insensitive and matches any part of the department name
  //         const searchValue = filterValue.toLowerCase();
  //         return department.departmentNameEn
  //           .toLowerCase()
  //           .includes(searchValue);
  //       }
  //       return true;
  //     });
  //     setfilterDepartmentData(filteredData);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
    setSelectedDesignation(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setTitle("All Designations");
    if (backendFilter) {
      getAlldesignation(page, pageSize);
    } else {
      getAlldesignation(page, pageSize);
    }
  }, [page, pageSize]);

  const handleEdit = (designation: any) => {
    setSelectedDesignation(designation);
    setOpen(true);
  };
  const handleView = (designation: any) => {
    setSelectedDesignation(designation);
    setOpenView(true);
  };

  const handleRefresh = () => {
    getAlldesignation(page, pageSize);
  };

  const handleEditOpen = (designation: any) => {
    setSelectedDesignation(designation);
    setOpen(true);
  };

  const handleViewOpen = (designation: any) => {
    setSelectedDesignation(designation);
    setOpenView(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
    setSelectedDesignation(null);
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
          {/* <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="filter"
              name="row-radio-buttons-group"
              value={filterType}
              onChange={handleFilterChange}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="Show All"
              />
              <FormControlLabel
                value="name"
                control={<Radio />}
                label=" By Dept Name"
              />
              <FormControlLabel
                value="date"
                control={<Radio />}
                label="By Date"
              />
            </RadioGroup>
          </FormControl>
          {filterType === "name" && (
            <TextField
              label="Department Name"
              variant="outlined"
              value={filterValue}
              onChange={handleFilterValueChange}
            />
          )}
          {filterType === "date" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" alignItems="center">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{ width: "150px" }}
                />

                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  sx={{ width: "150px" }}
                />
              </Box>
            </LocalizationProvider>
          )}

          {(filterType === "name" || filterType === "date") && (
            <Button
              variant="contained"
              color="primary"
              onClick={filterDepartments}
            >
              Apply Filter
            </Button>
          )} */}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Designation
          </Button>
        </Container>

        <MUITable
          rows={filterdesignationData}
          columns={columns}
          // onViewClick={handleView}
          // onEditClick={handleEdit}
          totalCount={totalCount}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />

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
              {selectedDesignation ? "Edit Designation" : "Add New Designation"}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Form
              initialData={selectedDesignation}
              isEditMode={!!selectedDesignation}
              onClose={handleClose}
              onRefresh={handleRefresh}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={openView}
          onClose={handleViewClose}
          fullWidth
          maxWidth="sm"
        >
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
              View Department
            </Typography>
          </DialogTitle>
          <DialogContent>
            <View designationId={selectedDesignation?.designationId} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default Designation;
