"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "@/context/UserContext";
import { apiCalls } from "@/services/report";
import MUITable from "@/components/datatable";
import { OtpStyledWrapper } from "./styles";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const { setTitle }: any = useContext(UserContext);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [otpFilter, setOtpFilter] = useState("");
  const [totalRows, setTotalRows] = useState([]);
  const otpFilters = [
    { label: "Mobile", value: "mobile" },
    { label: "Email", value: "email" },
    { label: "Aadhar", value: "aadhaar" },
  ];
  const setRowsAndColumns = useCallback(
    (data: any) => {
      if (data.length === 0) {
        setColumns([]);
        setRows([]);
        return;
      }

      const formatHeaderName = (header: string) => {
        return header
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      };

      const generatedColumns: GridColDef[] = Object.keys(data[0])
        .filter((key) => key !== "_id")
        .map((key) => ({
          field: key,
          //   headerName: key,
          headerName: formatHeaderName(key),
          flex: 2,
          minWidth:100,
          headerClassName: "super-app-theme--header",
        }));


        const generatedRows = data.map((row: any, index: number) => {
          const formattedRow = {
            id: index,
            ...row,
          };
          if (formattedRow["createdAt"]) {
            formattedRow["createdAt"] = moment(
              formattedRow["createdAt"]
            ).format("YYYY-MM-DD");
          }
          return formattedRow;
        });
      setColumns(generatedColumns);
      setRows(generatedRows);
      setTotalRows(generatedRows);
    },
    [searchText]
  );

  const handleDropDownFilter = () => {
    if (otpFilter === "all") {
      setRows(totalRows);
    } else {
      const handlefilter = totalRows.filter((item, index) => {
        return item["otpType"] === otpFilter;
      });
      setRows(handlefilter);
    }
  };

  useEffect(() => {
    handleDropDownFilter();
  }, [otpFilter]);

  const handleSearch = async () => {
    try {
      const payload = {
        url: "master_data/otpLog",
        data: { otrId: searchText, otpType: otpFilter },
      };
      let report = await apiCalls("post", payload);
      const reportData = report.data.data;
      setRowsAndColumns(reportData);
      setIsOpen(true);
      if (reportData.length === 0) {
        setRows([]);
      } else {
        setRowsAndColumns(reportData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setTitle("OTP Logs");
  }, [searchText]);

  return (
    <OtpStyledWrapper>
      <Typography
        sx={{ marginBottom: "15px", marginTop: "30px", color: "#0f0f53dd" }}
        variant="h5"
      >
        {" "}
        Enter the Candidate OTR ID:
      </Typography>
      <TextField
        value={searchText}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "16px",
            height: "2.4em",
          },
        }}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ marginLeft: "20px" }}
      >
        Search
      </Button>
      {rows.length > 0 && (
        <FormControl
          variant="outlined"
          sx={{ width: "200px", marginLeft: "15px" }}
        >
          <InputLabel>Filter By</InputLabel>
          <Select
            value={otpFilter}
            onChange={(event) => {
              setOtpFilter(event.target.value);
            }}
            label="Filter By"
          >
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            {otpFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {isOpen && (
        <Box className="table-container" sx={{ marginTop: "20px" }}>
          {rows.length === 0 ? (
            <div className="empty-message">No records found</div>
          ) : (
            <MUITable
              rows={rows}
              columns={columns}
              totalCount={totalCount}
              page={page || 1}
              setPage={setPage}
              pageSize={pageSize || 10}
              setPageSize={setPageSize}
            />
          )}
        </Box>
      )}
    </OtpStyledWrapper>
  );
};

export default App;
