import { Box, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
    width: "100%",  
    background: "#2947A3",
    padding: "10px 2px",
  
    "& .appBar": {
      boxShadow: "none",
      backgroundColor: "#2947A3",
    },
    "& .toolbar": {
      // paddingLeft: '0!important',
      paddingRight: "0!important",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      paddingLeft: "5px",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    "& .logoBox": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      paddingLeft: "5px",
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