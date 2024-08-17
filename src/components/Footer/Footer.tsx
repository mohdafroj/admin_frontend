"use client";
import { memo } from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import moment from 'moment'
const footerMenu = {
  menu: [
    {
      icon: "fa fa-database",
      label: "One Time Registration",
      to: "/dashboards/main",
    },
    {
      icon: "fa fa-paste",
      label: "Instruction for OTR",
      to: "/dashboards/application",
    },
  ],
};

const FooterStyle = styled(Box)(({ theme }) => ({
  backgroundColor: "#2947a3",
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "60px 0",
  width: "100%",
  height: 'auto',
  position: "relative",
  // bottom: 0,
  boxSizing: "border-box",
  ul: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  li: {
    margin: 0,
    padding: 0,
  },
  ".footerleft": {
    padding: "10px 0",
    p: {
      color: "white",
      fontSize: "0.8rem",
      fontFamily: "Roboto",
    },
  },
  ".social": {
    h2: {
      color: "white",
      fontSize: "18px",
      fontWeight: 700,
    },
    ul: {
      display: "flex",
      gap: "4px",
      li: {
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "4px",
        a: {
          color: "white",
          display: "block",
          padding: "5px",
          textDecoration: "none",
        },
      },
    },
  },
  ".footer_link": {
    h2: {
      color: "white",
      fontSize: "1rem",
      fontWeight: 700,
    },
    li: {
      a: {
        color: "white",
        fontSize: "0.7rem",
        textDecoration: "none",
      },
    },
  },
  ".powered": {
    p: {
      color: "white",
      fontSize: "0.7rem",
    },
  },
  ".visit": {
    h2: {
      color: "white",
      fontSize: "0.9rem",
      fontWeight: 700,
    },
    p: {
      fontSize: "0.7rem",
      color: "white",
      marginBottom: 0,
    },
    span: {
      fontSize: "0.7rem",
      color: "white",
    },
  },
  [theme.breakpoints.down("md")]: {
    ".footerleft p": {
      fontSize: "0.7rem",
    },
    ".footer_link ul": {
      gap: "8px",
    },
    ".footer_link li": {
      flex: "0 0 100%",
    },
    ".visit h2": {
      fontSize: "0.8rem",
    },
    ".visit p": {
      fontSize: "0.6rem",
    },
    ".responsive-row": {
      flexDirection: "column",
      textAlign: "left",
      margin: "0 0px",
    },
  },
}));



const Footer = memo(() => {
  return (
    <FooterStyle>
      <Container maxWidth="lg">
        <Grid
          container
          // spacing={3}
          className="responsive-row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} md={4}>
            <div className="footerleft">
              <Typography variant="body2" >
                Website Content Managed by © Content Owned by Union Public
                Service Commission, New Delhi, India.
              </Typography>
            </div>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <div className="footer_link">
              <Typography variant="h2">Useful Links</Typography>
              <ul>
                {footerMenu?.menu.map(({ label, to, icon }, index) => (
                  <li key={index}>
                    <Link href={to}>
                        <i className={`${icon} me-2`}></i>
                        {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid> */}
          <Grid item xs={12} md={4}>
            <Box className="visit">
              <Typography variant="h2">Contact Us:</Typography>
              <Typography variant="body2">
                Dholpur House, Shahajahan Road, New Delhi - 110069
              </Typography>
            </Box>
            <Box className="visit">
              <Box>
                <Typography variant="h2">Your System IP Address:</Typography>
                <Typography variant="h2" className="mt-3">
                  Current Time & Date:
                </Typography>
                {/* <p>
                  {moment().format("hh:mm:ss a (ddd, Do MMM YYYY)")}
                </p> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterStyle>
  );
});

export default Footer;
