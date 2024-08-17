"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment"; // Import moment
// @ts-ignore
import Cookies from "js-cookie";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import * as XLSX from "xlsx";
// Style Wrapper
const CandidateListStyleWrapper = styled.div`
  .css-10o2lyd-MuiStack-root {
    overflow: hidden;
    margin-top: -8px !important;
  }
  .card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05),
      0px -4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
  }

  .filter-container {
    display: flex;
    margin-bottom: 16px;
    padding: 15px 10px 0 10px;
    justify-content: space-between;
    gap: 10px;
  }
  .wrap {
    display: flex;
    justify-content: flex-end;
  }

  .form-control {
    width: 200px;
    margin-right: 10px;
    & .MuiInputBase-root {
      font-size: 16px;
      height: 2.8em;
    }
  }

  .text-field {
    & .MuiInputBase-root {
      font-size: 16px;
      height: 2.8em;
    }
  }

  .table-container {
    overflow: auto;
    width: 100%;
  }

  .empty-message {
    text-align: center;
    padding: 20px;
    color: #888;
  }
  .export-button {
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    height: 2.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
`;

// Main Component
export default function DetailedReport() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModelData] = useState([]);
  const { setTitle }: any = useContext(UserContext);
  const [totalCount, setTotalCount] = useState({});
  const [showCustomDates, setShowCustomDates] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const handleFilterChange = (event: any) => {
    setRoleFilter(event.target.value);
  };

  const candidateListApi = async (page: number, pageSize: number) => {
    try {
      let payload_data = { page: page + 1, limit: pageSize };
      if (showCustomDates === "currentYear") {
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
        console.log("========>>>>>>>>>>>>>>", startDate, endDate);
        payload_data.dateFrom = moment(startDate?.$d).format("YYYY-MM-DD");
        payload_data.dateTo = moment(endDate?.$d).format("YYYY-MM-DD");
      }
      const payload = {
        url: "master_data/summary",
        data: payload_data,
      };
      const report = await apiCalls("post", payload);
      const data = report.data.data;
      const countData = report.data.countData.totalCount;
      setTotalCount(countData);
      setRowsAndColumns(data);

      if (data.length === 0) {
        // No data for the selected filter
        setRows([]);
      } else {
        // Data available, set rows and columns
        setRowsAndColumns(data);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    candidateListApi(page, pageSize);
  }, [showCustomDates, page, pageSize]);

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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidate Data");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([wbout], { type: "application/octet-stream" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "candidate_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const setRowsAndColumns = useCallback(
    (data: any) => {
      if (data.length === 0) {
        setColumns([]);
        setRows([]);
        return;
      }
      // Generate columns from the first data entry
      const generatedColumns: GridColDef[] = Object.keys(data[0])
        .filter((key) => key !== "_id") // Exclude _id if present
        .map((key) => ({
          field: key,
          headerName: key,
          flex: 2,
          minWidth:100,
          headerClassName: "super-app-theme--header",
        }));
      // Generate rows and format dates if necessary
      const generatedRows = data.map((row: any, index: number) => {
        const formattedRow = {
          id: index,
          ...row,
        };
        // Format the 'Date Of Birth' field if present
        if (formattedRow["Date Of Birth"]) {
          formattedRow["Date Of Birth"] = moment(
            formattedRow["Date Of Birth"]
          ).format("DD-MMM-YYYY");
        }
        if (formattedRow["Date Of Registration"]) {
          formattedRow["Date Of Registration"] = moment(
            formattedRow["Date Of Registration"]
          ).format("DD-MMM-YYYY");
        }
        return formattedRow;
      });
      setColumns(generatedColumns);
      setRows(generatedRows);
    },
    [searchText]
  );

  useEffect(() => {
    setTitle("Candidate List");
  }, []);

  return (
    <CandidateListStyleWrapper>
      <div className="filter-container">
        <div className="wrap">
          <FormControl variant="outlined" className="form-control">
            <InputLabel>Filter By</InputLabel>
            <Select
              value={showCustomDates}
              onChange={handleDobChange}
              label="Filter By"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {Datemenu.map((column) => (
                <MenuItem key={column.value} value={column.value}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {showCustomDates === "customDates" && (
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
                  onClick={() => candidateListApi(page, pageSize)}
                >
                  Search
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}
        <Button className="export-button" variant="contained" onClick={exportToExcel}>Export</Button>
      </div>
      <Box
        className="table-container"
        sx={{ width: "800px", overflowY: "auto" }}
      >
        {rows?.length === 0 ? (
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
    </CandidateListStyleWrapper>
  );
}
