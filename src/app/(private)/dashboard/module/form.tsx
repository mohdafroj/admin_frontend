"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, MenuItem } from "@mui/material";
import { colors } from "@/utils/colors";


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
    .MuiInputLabel-root{
      color: "primary";
    }
  }
`;

const Form = () => {
  const status = [
    
    { value: "Y", label: "Active" },
    { value: "N", label: "Inactive" },
  ];
  const module = [
    { value: " ", label: "" },
    { value: "Y", label: "OTR" },
    { value: "N", label: "SOAP" },
    { value: " ", label: "CDR" },
    { value: "Y", label: "DAF" },
    { value: "N", label: "ORA" },
    { value: " ", label: "E- Admit" },
    { value: "Y", label: "SAL" },
    { value: "N", label: "Chance Verification" },
    { value: " ", label: "IBR" },
    { value: "Y", label: "Panel Data Bank" },
    { value: "N", label: "VMS" },
    { value: " ", label: "Payment gateway" },
    { value: "Y", label: "ORA Pre Processing" },
    { value: "N", label: "ORA Post Processing" },
    { value: " ", label: "E-Summon" },
    { value: "Y", label: "Expert Management System" },
    { value: "N", label: "Hindi to English" },
    { value: " ", label: "Email & SMS Portal" },
    { value: "Y", label: "Marksheet System" },
    { value: "N", label: "Requisition Index Card" },
    { value: "Y", label: "Socio Economic Analysis" },
    { value: "N", label: "QPRep" },
    { value: " ", label: "PT Board" },
    { value: "Y", label: "Alpha Query System" },
    { value: "N", label: "Item Analysis Report" },
    { value: " ", label: "SSB Marks System" },
    { value: "Y", label: "SSB conventional" },
    { value: "N", label: "Change Slip" },
    { value: " ", label: "GIGW 3.0" },
  ];
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
                  multiline
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="module_description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Module Description"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>
   
          <Grid item xs={12}>
            <Controller
              name="record_version"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Record Version"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="audit_log_id"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Audit Log ID"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Status"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  select
                >
                  {status &&
                    status?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Input>
              )}
            />
          </Grid>
      
          <Grid item xs={12}>
         
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
