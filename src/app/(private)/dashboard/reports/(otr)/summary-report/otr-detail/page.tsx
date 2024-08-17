"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { TextField, Button, Grid, Link, Box, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

import UserContext from "@/context/UserContext";
// @ts-ignore
import Cookies from "js-cookie";
import { apiCalls } from "@/services/report";
import { toast } from "react-toastify";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import { styled as newstyled } from "@mui/material/styles";
import Error from "@/components/Error";

const BootstrapDialog = newstyled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 29px 20px;
  background: #2947a3 !important;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  @media (min-width: 600px) {
    padding: 29px 40px;
  }

  @media (min-width: 960px) {
    padding: 10px;
    margin-top: 60px;
  }
`;

const InstructionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 18px;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const HeaderContent = styled.div`
  @media (min-width: 600px) {
    align-items: center; /* Ensure items are centered vertically on larger screens */
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 22px;
`;

const Text = styled.div`
  color: white;
  font-size: 20px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  word-wrap: break-word;
`;

const CustomGridContainer = styled(Grid)`
  width: 100%;
  padding: 20px;
  background: white;
`;
const CustomGridContaineButton = styled(Grid)`
  width: 100%;
  padding: 20px;
  background: white;
  display: flex;
  justify-content: right;
`;

const CustomGridItem = styled(Grid)`
  padding: 10px;
  border: 1px solid #ccc;
  font-weight: 600;
`;

const App = () => {
  const [searchText, setSearchText] = useState("");
  const { setTitle }: any = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [candidateData, setCandidateData] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const printRef = useRef(null);

  const handleSearch = async () => {
    try {
      const payload = {
        url: "master_data/otrDetail",
        data: { otrId: searchText },
      };
      const report = await apiCalls("post", payload);
      const data = report.data.data[0];
      setCandidateData(data);
      setIsOpen(true);
    } catch (err) {
      // Handle error
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setTitle("OTR Details");
  }, [searchText]);

  return (
    <div>
      <Typography sx={{ marginBottom: "15px", marginTop: "30px", color: "#0f0f53dd" }} variant="h5">
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
      <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: "20px" }}>
        Search
      </Button>
      {isOpen && (
        <>
          <Container>
            <HeaderContent>
              <TextContainer>
                <Text>One Time Registration Details</Text>
              </TextContainer>
            </HeaderContent>
          </Container>
          <InstructionContainer id="print-section" ref={printRef}>
            {candidateData && candidateData !== "" ? (
              <CustomGridContainer container spacing={0}>
                <CustomGridItem item xs={6}>
                  OTR ID :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.otrId}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Aadhaar
                </CustomGridItem>
                <CustomGridItem
                  item
                  xs={6}
                  sx={{
                    color: candidateData?.aadhar && candidateData?.aadhar == "Y" ? "green" : "red",
                  }}
                >
                  {candidateData?.aadhar && candidateData?.aadhar == "Y" ? "Verified" : "Not verified"}{" "}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Candidate’s name (as per class 10th) :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.candidateName}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Gender :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.gender}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Date of birth :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.dob}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Do You Have a single parent:
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.singleParent}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Father's name :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.fatherName !== "" ? candidateData?.fatherName : "Not Provided"}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Mother's name :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.motherName !== "" ? candidateData?.motherName : "Not Provided"}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Minority Status :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.minorityStatus === "Y" ? "Yes" : "None"}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Class 10th Board Examination Roll No :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.rollNo}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Passing Year of the Class 10th :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.passYear}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Email :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.emailAddress}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Alternate Email Address :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.altEmailAddress !== "" ? candidateData?.altEmailAddress : "Not Provided"}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Mobile Number :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.mobileNumber}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Alternate Email :
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.altEmailAddress !== "" ? candidateData?.altEmailAddress : "Not Provided"}
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  Alternate Mobile Number:
                </CustomGridItem>
                <CustomGridItem item xs={6}>
                  {candidateData?.altMobileNumber !== "" ? candidateData?.altMobileNumber : "Not Provided"}
                </CustomGridItem>
              </CustomGridContainer>
            ) : (
              <Error />
            )}
          </InstructionContainer>

          <CustomGridContaineButton>
            <ReactToPrint
              trigger={() => (
                <Button color="primary" variant="contained" startIcon={<PrintIcon />}>
                  Print
                </Button>
              )}
              content={() => printRef.current}
            />
          </CustomGridContaineButton>
        </>
      )}
    </div>
  );
};

export default App;
