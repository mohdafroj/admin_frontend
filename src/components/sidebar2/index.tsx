"use client";
import * as React from "react";
import { styled } from "@mui/system";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import {
  Dashboard as DashboardIcon,
  Description as AuditIcon,
  Security as AdminIcon,
  Person as CandidateIcon,
  Phone as OtpIcon,
  Assessment as ReportIcon,
  Report as DetailedReportIcon,
  Summarize as SummaryReportIcon,
  List as CandidateListIcon,
  Details as OtrDetailIcon,
} from "@mui/icons-material";
import { colors } from "@/utils/colors";
import { SidebarData } from "@/types/sidebarType";
import UserContext from "@/context/UserContext";

const SidebarWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "23px",
  position: "relative",
  top: 0,
  height: "150vh",
  backgroundColor: "#2947A3",
  zIndex: 1000,
  overflowY: "auto",
  "& .accordion": {
    boxShadow: "none",
    color: "#eaeef5",
    backgroundColor: "#2947A3",
  },
  "& .accordionSummary": {
    backgroundColor: "#223E92",
    color: "#eaeef5",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
    "&:hover": {
      color: "#2947A3",
      backgroundColor: "#eaeef5",
    },
  },
  "& .accordionDetails": {
    display: "flex",
    flexDirection: "column",
    padding: "0 8px",
  },
  "& .nestedItem": {
    display: 'flex',
    alignItems: 'center',
    padding: "10px 16px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#425CAB",
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: "3px",
    marginBottom: "1px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      color: "#2947A3",
      backgroundColor: "#eaeef5",
    },
    "&:active": {
      color: "#333",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  "& .subAccordion": {
    width: "100%",
    "& .accordionDetails": {
      paddingLeft: "24px",
    },
  },
}));

const Sidebar2 = () => {
  const { toggle } = React.useContext(UserContext);
  const renderSidebarItems = (items) => {
    return items.map((item, index) => {
      if (item.items) {
        return (
          <Accordion className="accordion" key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#2947A3" }} />}
              className="accordionSummary"
            >
              {item.icon}
              {!toggle && <Typography sx={{ marginLeft: '10px' }}>{item.name}</Typography>}
            </AccordionSummary>
            <AccordionDetails className="accordionDetails">
              {renderSidebarItems(item.items)}
            </AccordionDetails>
          </Accordion>
        );
      }

      return (
        <Link href={item.link} key={index} style={{ textDecoration: "none" }}>
          <Box className="nestedItem">
            <Box>{item.icon}</Box>
            {!toggle && <Box sx={{ marginLeft: '10px' }}>{item.name}</Box>}
          </Box>
        </Link>
      );
    });
  };
  return (
    <SidebarWrapper>
      {renderSidebarItems(sidebarData)}
    </SidebarWrapper>
  );
};

const sidebarData = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Audit Logs",
    icon: <AuditIcon />,
    items: [
      { name: "Admin Logs", link: "/dashboard/audit-logs/admin-logs", icon: <AdminIcon /> },
      {
        name: "Candidate Logs",
        icon: <CandidateIcon />,
        items: [
          { name: "Candidate Audit Logs", link: "/dashboard/audit-logs/candidate-logs/candidate-audit-logs", icon: <OtpIcon /> },

          { name: "OTP Logs", link: "/dashboard/audit-logs/candidate-logs/otp-logs", icon: <OtpIcon /> },
        ],
      },
    ],
  },
  {
    name: "Reports",
    icon: <ReportIcon />,
    items: [
      { name: "Detailed Reports", link: "/dashboard/reports/detailed-report", icon: <DetailedReportIcon /> },
      {
        name: "Summary Report",
        icon: <SummaryReportIcon />,
        items: [
          { name: "Candidate List", link: "/dashboard/reports/summary-report/candidate-list", icon: <CandidateListIcon /> },
          { name: "OTR Detail", link: "/dashboard/reports/summary-report/otr-detail", icon: <OtrDetailIcon /> },
        ],
      },
    ],
  },
];

export default Sidebar2;
