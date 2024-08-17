"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment"; // Import moment
import { DebounceInput } from "react-debounce-input";
import Cookies from "js-cookie";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
} from "@mui/material";
import MUITable from "@/components/datatable";
import { apiCalls } from "@/services/report";
import CustomizedDialogs from "@/components/Modal";
import UserContext from "@/context/UserContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SearchIcon from "@mui/icons-material/Search";
import { StyledWrapper } from "./styles";
import { textFieldValidation } from "@/utils/validation";
// Main Component
export default function DetailedReport() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [modalData, setModelData] = useState([]);
  const { setTitle }: any = useContext(UserContext);
  const [totalCount, setTotalCount] = useState(0);
  const [showCustomDates, setShowCustomDates] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dob, setDob] = useState(null);
  const handleSearchChange = (event: any) => {
    let validatedValue = textFieldValidation(event.target.value)
    setSearchText(validatedValue);
  };

  const handleFilterChange = (event: any) => {
    console.log(event);
    setRoleFilter(event.target.value);
  };

  const auditReportApi = async (page: number, pageSize: number) => {
    try {
      const payload = {
        url: "master_data/candidateDetails",
        data: { [roleFilter]: searchText, page: page + 1, limit: pageSize },
      };
      const report = await apiCalls("post", payload);
      const data = report.data.data;
      const countData = report.data.countData.totalCount;
      setTotalCount(countData);
      setRowsAndColumns(data);
    } catch (err) {
      console.log("this is error", err);
    }
  };

  const filterMenu = [
    { label: "OTR Id", value: "otrId", type: "string" },
    { label: "Candidate Name", value: "candidateName", type: "string" },
    { label: "IP Address", value: "ip", type: "string" },
    { label: "Gender", value: "gender", type: "string" },
    { label: "Aadhar", value: "aadhar", type: "string" },
    { label: "Date of Birth", value: "dob", type: "date" },
    { label: "Date of Registration", value: "dor", type: "date" },
  ];

  const candidateListApi = async () => {
    try {
      let payload_data = {};
      if (roleFilter === "dob") {
        payload_data.dob = moment(dob?.$d).format("YYYY-MM-DD");
      } else if (showCustomDates === "currentYear") {
        payload_data.year = moment().format("YYYY");
      } else if (showCustomDates === "previousYear") {
        payload_data.year = moment().subtract(1, "year").format("YYYY");
      } else if (showCustomDates === "previousMonth") {
        payload_data.year = moment().subtract(1, "month").format("YYYY");
        payload_data.month = moment().subtract(1, "month").format("MM");
      } else if (showCustomDates === "yesterday") {
        payload_data.date = moment().subtract(1, "day").format("YYYY-MM-DD");
      } else if (showCustomDates === "today") {
        payload_data.date = moment().format("YYYY-MM-DD");
      } else if (showCustomDates === "customDates") {
        payload_data.dateFrom = moment(startDate?.$d).format("YYYY-MM-DD");
        payload_data.dateTo = moment(endDate?.$d).format("YYYY-MM-DD");
      }
      const payload = {
        url: "master_data/candidateDetails",
        data: payload_data,
      };
      const report = await apiCalls("post", payload);
      const data = report.data.data;
      const countData = report.data.countData.totalCount;
      setTotalCount(countData);
      setRowsAndColumns(data);

      if (data.length === 0) {
        setRows([]);
      } else {
        setRowsAndColumns(data);
      }
    } catch (err) {
      console.log("this is error", err);
    }
  };

  useEffect(() => {
    if (roleFilter === "dor") {
      candidateListApi();
    }
  }, [showCustomDates]);

  const handleDobChange = (event: any) => {
    setShowCustomDates(event.target.value);
  };

  const Datemenu = [
    { label: "Current Year", value: "currentYear" },
    { label: "Previous Year", value: "previousYear" },
    { label: "Previous Month", value: "previousMonth" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Today", value: "today" },
    { label: "Custom Dates", value: "customDates" },
  ];

  const setRowsAndColumns = useCallback(
    (data: any) => {
      if (data.length === 0) {
        setColumns([]);
        setRows([]);
        return;
      }

      const generatedColumns: GridColDef[] = Object.keys(data[0])
        .filter((key) => key !== "_id")
        .map((key) => ({
          field: key,
          headerName: key,
          flex: 2,
          minWidth:100,
          headerClassName: "super-app-theme--header",
        }));

      const generatedRows = data.map((row: any, index: number) => {
        const formattedRow = {
          id: index,
          ...row,
        };
        if (formattedRow["Date Of Birth"]) {
          formattedRow["Date Of Birth"] = moment(
            formattedRow["Date Of Birth"]
          ).format("YYYY-MM-DD");
        }
        return formattedRow;
      });

      setColumns(generatedColumns);
      setRows(generatedRows);
    },
    [searchText]
  );

  useEffect(() => {
    setTitle("Detailed Report");
    if (roleFilter === "") {
      setRoleFilter("");
      auditReportApi(page, pageSize);
    }else{
      auditReportApi(page, pageSize);
    }
  }, [searchText, page, pageSize]);

  return (
    <StyledWrapper>
      <div className="filter-container">
        <FormControl variant="outlined" className="form-control">
          <InputLabel>Filter By</InputLabel>
          <Select
            value={roleFilter}
            onChange={handleFilterChange}
            label="Filter By"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {filterMenu.map((column) => (
              <MenuItem
                key={column.value}
                name={column.type}
                value={column.value}
              >
                {column.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {roleFilter !== "dor" && roleFilter !== "dob" && (
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            value={searchText}
            onChange={handleSearchChange}
            element={(inputProps) => (
              <TextField
                {...inputProps}
                label="Search"
                variant="outlined"
                className="text-field"
              />
            )}
          />
        )}
        {roleFilter === "dor" && (
          <FormControl
            variant="outlined"
            className="form-control"
            sx={{ marginLeft: "10px" }}
          >
            <InputLabel>Filter By</InputLabel>
            <Select
              value={showCustomDates}
              onChange={handleDobChange}
              label="Filter By"
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              {Datemenu.map((column) => (
                <MenuItem key={column.value} value={column.value}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {roleFilter === "dob" && (
          <Box className="custom-date-fields">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <FormControl variant="outlined" className="form-control">
                  <DatePicker
                    label="Date Of Birth"
                    value={dob}
                    onChange={(dateOfBirth) => setDob(dateOfBirth)}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "16px",
                        height: "2.4em",
                      },
                    }}
                    disableFuture
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={candidateListApi}
                >
                  Search
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}
        {roleFilter === "dor" && showCustomDates === "customDates" && (
          <Box className="custom-date-fields">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <FormControl variant="outlined" className="form-control">
                  <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(start_date) => setStartDate(start_date)}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "16px",
                        height: "2.4em",
                      },
                    }}
                  />
                </FormControl>
                <FormControl variant="outlined" className="form-control">
                  <DatePicker
                    label="End date"
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "16px",
                        height: "2em",
                      },
                    }}
                    value={endDate}
                    onChange={(end_date) => setEndDate(end_date)}
                    disableFuture
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={candidateListApi}
                >
                  Search
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}
      </div>
      <Box
        className="table-container"
        sx={{ width: "100%", overflowY: "auto" }}
      >
        {rows.length === 0 ? (
          <div className="empty-message">No records found</div>
        ) : (
          <MUITable
            rows={rows}
            columns={columns}
            totalCount={totalCount}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        )}
      </Box>
      {open && (
        <CustomizedDialogs open={open} setOpen={setOpen} data={modalData} />
      )}
    </StyledWrapper>
  );
}
