"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, MenuItem } from "@mui/material";
import { colors } from "@/utils/colors";
//import { officerType , department, department,userType,status } from "@/utils/Data";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export const Input = styled(TextField)`
  && {
    .MuiInputBase-root {
      font-size: 16px;
      border-color: "primary";
      height: 2.8em;
    }
    .MuiInputLabel-root {
      color: "primary";
    }
  }
`;

const Form = () => {
    const moduleName = [
        { value: "1", label: "OTR" },
        { value: "2", label: "SOAP" },
        { value: "3", label: "CDR" },
        { value: "4", label: "DAF" },
        { value: "5", label: "ORA" },
        { value: "6", label: "E- Admit" },
        { value: "7", label: "SAL" },
        { value: "8", label: "Chance Verification" },
        { value: "9", label: "IBR" },
        { value: "10", label: "Panel Data Bank" },
        { value: "11", label: "VMS" },
        { value: "12", label: "Payment gateway" },
        { value: "13", label: "ORA Pre Processing" },
        { value: "14", label: "ORA Post Processing" },
        { value: "15", label: "E-Summon" },
        { value: "17", label: "Expert Management System" },
        { value: "18", label: "Hindi to English" },
        { value: "19", label: "Email & SMS Portal" },
        { value: "20", label: "Marksheet System" },
        // { value: "N", label: "Requisition Index Card" },
        // { value: "Y", label: "Socio Economic Analysis" },
        // { value: "N", label: "QPRep" },
        // { value: " ", label: "PT Board" },
        // { value: "Y", label: "Alpha Query System" },
        // { value: "N", label: "Item Analysis Report" },
        // { value: " ", label: "SSB Marks System" },
        // { value: "Y", label: "SSB conventional" },
        // { value: "N", label: "Change Slip" },
        // { value: " ", label: "GIGW 3.0" },
      ]

      const subModuleNameEn= [
        { value: '1', label: "Candidate-Registration" },
        { value: "2", label: "Permission Management" },
        { value: "2", label: "History" },
        { value: "2", label: "Master Rule" },
        { value: "2", label: "Candidate Profilling" },
        { value: "2", label: "Reports" },
        { value: "2", label: "Rule - Center allocation" },
        { value: "2", label: "Exam Rule" },
        { value: "3", label: "Candidate Profilling" },
        { value: "3", label: "Login" },
        { value: "11", label: "Single DAF" },
        { value: "12", label: "Notification" },
        { value: "13", label: "Notification template" },
        { value: "14", label: "Reports" },
        { value: "15", label: "Logs" },
        { value: "16", label: "Candidate Profilling" },
        { value: "17", label: "Login" },
        { value: "18", label: "Notice" },
        { value: "19", label: "Proforma" },
        { value: "20", label: "Post" },
        { value: "21", label: "Description" },
        { value: "22", label: "Post Module" },
        { value: "23", label: "Rules" },
        { value: "24", label: "Post qualification" },
        { value: "25", label: "IFC" },
        { value: "26", label: "Vacancy" },
        { value: "27", label: "Post term and condition" },
        { value: "28", label: "Permission Management" },
        { value: "29", label: "Masters" },
        { value: "30", label: "Change Request" },
        { value: "31", label: "History" },    
      ]
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = () => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="module_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Module Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  select
                >
                  {moduleName && moduleName?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sub_module_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Sub Module Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
