"use client";
import UserContext from "@/context/UserContext";
import { colors } from "@/utils/colors";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React, { useContext } from "react";
import Sidebar from "../sidebar";
import Sidebar2 from "../sidebar2";
import Cookies from "js-cookie";

function CardChild({ children }: { children: React.ReactNode }) {
  const type = Cookies.get('type');  
  const { title, toggle } = useContext(UserContext);
  
  return (
    <Box
      sx={{ display: "flex", marginTop: "64px", backgroundColor: "#f0eaea" }}
    >
      <Box 
        sx={{ 
          width: `${toggle ? '7%' : '18%'}`, 
          transition: "width 0.3s ease-in-out"
        }}
      >
        {type === "1" ? <Sidebar /> : <Sidebar2 />}
      </Box>
      <Box 
        sx={{ 
          width: `${toggle ? '93%' : '82%'}`, 
          padding: 5, 
          transition: "width 0.3s ease-in-out"
        }}
      >
        <Card>
          <CardHeader
            title={title}
            sx={{ backgroundColor: colors.primary, color: "#fff" }}
          />
          <CardContent sx={{ backgroundColor: "#eeeff3" }}>
            {children}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CardChild;
