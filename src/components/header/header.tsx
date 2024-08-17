"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Image from "next/image";
import { upscLogo } from "@/assets/images";
// @ts-ignore
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "#2947A3",
  padding: "10px 2px",

  "& .appBar": {
    boxShadow: "none",
    backgroundColor: "#2947A3",
  },
  "& .toolbar": {
    paddingRight: "0!important",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    paddingLeft: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "& .body":{
    display:'flex',
     flexDirection:'column'
  },
  "& .logoBox": {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    paddingLeft: "0px",
  },
  "& .mainTypography": {
    color: "#FFF",
    textAlign: "left",
    fontFamily: "DevLys 010 Thin",
    fontSize: theme.typography.pxToRem(22),
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
 
  "& .subTypography": {
    color: "#FFF",
    textAlign: "left",
    fontFamily: "Roboto",
    fontSize: theme.typography.pxToRem(24),
    fontStyle: "normal",
    fontWeight: 900,
    lineHeight: "30px",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

export default function Header() {
  const token: any = Cookies.get("token");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("type");
    router.replace("/"); // Redirect to home page
  };

  return (
    <HeaderWrapper>
      <Container maxWidth={false}>
        <AppBar position="static" className="appBar">
          <Toolbar className="toolbar">
            <Box className="logoBox">
              <Link href="/">
                <Image src={upscLogo} alt="LOGO" style={{ height: "60px" }} />
              </Link>
              <div className="body">
              <Typography variant="h1" className="mainTypography">
                संघ लोक सेवा आयोग
              </Typography>
              <Typography variant="body2" className="subTypography">
                UNION PUBLIC SERVICE COMMISSION
              </Typography>
              </div>
            </Box>
            {/* {token && (
              <Box>
                <Button  sx={{
                          backgroundColor: "white",
                          color: "#2947A3",
                          mr: 3,
                          "&:hover": {
                            backgroundColor: "#6480d3",
                            color: "white",
                          },
                        }}variant="contained" onClick={handleLogout}>Logout</Button>
              </Box>
            )} */}
          </Toolbar>
        </AppBar>
      </Container>
    </HeaderWrapper>
  );
}
