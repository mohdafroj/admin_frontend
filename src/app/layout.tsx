"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/components/theme";
import UserContextProvider from "@/context/UserContextProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
              <>{children}</>
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
