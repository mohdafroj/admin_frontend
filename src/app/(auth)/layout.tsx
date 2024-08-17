import * as React from "react";
import Header from "@/components/header/header";
import { Box, Grid } from "@mui/material";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/components/AuthContext/AuthContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure that the component only renders on the client side
  const token: any = cookies().get("token");
  if (token?.value) {
    redirect("/dashboard");
  }
  return (
    <AuthProvider>
      <Grid container display="flex" flexDirection="column">
        <Header />
        <Box sx={{ minHeight: "100vh" }}>{children}</Box>
        <Footer />
      </Grid>
    </AuthProvider>
  );
}
