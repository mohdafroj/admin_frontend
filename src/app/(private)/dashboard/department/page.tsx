"use client";
import React, { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
} from "@mui/material";
import MUITable from "@/components/datatable";
import Form from "./form";
import View from "./view";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "@/context/UserContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { apiCalls } from "@/services/report";

const Department = () => {
  const [open, setOpen] = useState(false);
  const { setTitle }: any = useContext(UserContext);
  const [openView, setOpenView] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [filterdepartmentData, setfilterDepartmentData] = useState<any>([]);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [backendFilter, setBackendFilter] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    "  http://172.16.16.20:8351/UserMgmt/API/v1/master_data";

  const columns = [
    {
      field: "departmentId",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "departmentNameEn",
      headerName: "Department Name (Eng)",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "departmentNameHi",
      headerName: "Department Name (Hin)",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 50,
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
      field: "createdAt",
      headerName: "Created Date",
      width: 50,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
      // valueFormatter: (params: any) => moment(params).format("DD/MM/YYYY"),
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
      field: "updatedAt",
      headerName: "Last Modified Date",
      width: 50,
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 2,
      // valueFormatter: (params: any) => moment(params).format("DD/MM/YYYY"),
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

  const getAlldepartments = async (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    // Default values for page and limit
    try {
      // const response = await axios.post(`${backendBaseUrl}/getAllDepartment/`, {
      //   page: page + 1,
      //   limit: pageSize,
      // });

      const payload = {
        url: "master_data/getAllDepartment",
        data: { page: page + 1, limit: pageSize },
      };

      const response = await apiCalls("post", payload);

      // console.log(response, "respionse from backend");
      // const countData = response.data.countData;
      setTotalCount(response.data.totalCount);
      setDepartmentData(response?.data.departments); // Assuming the data is returned in a `departments` property
      setfilterDepartmentData(response?.data.departments);
      setBackendFilter(response.data.totalCount > 5 ? true : false);
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
  const formatDateForBackend = (date: any) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  console.log(backendFilter);
  const filterDepartments = async () => {
    if (backendFilter) {
      console.log(backendFilter);
      try {
        const formattedStartDate = startDate
          ? formatDateForBackend(new Date(startDate))
          : null;
        const formattedEndDate = endDate
          ? formatDateForBackend(new Date(endDate))
          : null;

        const params =
          filterType === "date"
            ? { startDate: formattedStartDate, endDate: formattedEndDate }
            : { departmentNameEn: filterValue };

        console.log(startDate, endDate, "from oisxsnxsnjxsn");
        const response = await axios.post(
          `${backendBaseUrl}/getAllDepartment`,
          {
            params,
          }
        );

        console.log(response, "kjndkjcnd");
        setfilterDepartmentData(response?.data?.departments);
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
    } else {
      const filteredData = departmentData.filter((department: any) => {
        if (filterType === "date" && startDate && endDate) {
          const createdAtDate = new Date(department.createdAt).setHours(
            0,
            0,
            0,
            0
          );
          const start = new Date(startDate).setHours(0, 0, 0, 0);
          const end = new Date(endDate).setHours(0, 0, 0, 0);
          // console.log(start, end, "dkncdncdjnc");
          return createdAtDate >= start && createdAtDate <= end;
        } else if (filterType === "name" && filterValue) {
          // console.log(filterValue, "nameeeeeeee"); // Ensure the search is case-insensitive and matches any part of the department name
          const searchValue = filterValue.toLowerCase();
          return department.departmentNameEn
            .toLowerCase()
            .includes(searchValue);
        }
        return true;
      });
      setfilterDepartmentData(filteredData);
    }
  };

  useEffect(() => {
    setTitle("All Department");
    if (backendFilter) {
      getAlldepartments(page, pageSize);
    } else {
      getAlldepartments(page, pageSize);
    }
  }, [page, pageSize, backendFilter]);

  const handleClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (department: any) => {
    setSelectedDepartment(department);
    setOpen(true);
  };

  const handleViewOpen = (department: any) => {
    setSelectedDepartment(department);
    setOpenView(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
    setSelectedDepartment(null);
  };

  const handleEdit = (department: any) => {
    setSelectedDepartment(department);
    setOpen(true);
  };
  const handleView = (department: any) => {
    setSelectedDepartment(department);
    setOpenView(true);
  };

  const handleRefresh = () => {
    getAlldepartments(page, pageSize);
  };

  // const handleFilterChange = (e: any) => {
  //   setFilterType(e.target.value);
  // };

  const handleFilterValueChange = (e: any) => {
    const inputValue = e.target.value;
    // console.log(filterType, "filterType");
    // console.log(inputValue);

    if (filterType === "name") {
      // Use a regular expression to allow only alphabets
      const alphabetRegex = /^[a-zA-Z]*$/;
      if (alphabetRegex.test(inputValue) || inputValue === "") {
        setFilterValue(inputValue);
      } else {
        console.error("Only alphabets are allowed");
      }
    } else {
      setFilterValue(inputValue);
    }
  };

  const handleStartDateChange = (date: any) => {
    console.log(date, "start from func");
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    // console.log(date, " end from func");
    setEndDate(date);
  };

  const handleFilterChange = (event: any) => {
    // console.log(event.target.value);
    // setFilterValue("");
    const value = event.target.value;
    setFilterType(value);

    if (value === "all") {
      handleRefresh();
    }
  };

  useEffect(() => {
    setTitle("All Departments");
  }, []);

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
          <FormControl component="fieldset">
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
          )}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Department
          </Button>
        </Container>

        <MUITable
          rows={filterdepartmentData}
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
              {selectedDepartment ? "Edit Department" : "Add New Department"}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Form
              initialData={selectedDepartment}
              isEditMode={!!selectedDepartment}
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
            <View departmentId={selectedDepartment?.departmentId} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Department;
