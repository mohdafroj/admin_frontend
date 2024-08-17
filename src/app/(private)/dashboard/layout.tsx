import React from "react";
import { Box} from "@mui/material";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CardChild from "@/components/layoutChildren";
import LoggedHeader from "@/components/loggedHeader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token: any = cookies().get("token");
  if (!token?.value) {
    redirect("/");
  }
  return (
    // <body>  
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }}>
            <LoggedHeader />
          </Box>
          <Box sx={{ width: "100%" }}>
            <CardChild children={children} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Footer />
          </Box>
        </Box>
    // </body>
  );
}
