"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, MenuItem } from "@mui/material";
import { colors } from "@/utils/colors";
//import { officerType , designation, department,userType,status } from "@/utils/Data";

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
  const role = [
    { label: "SuperAdmin(IT)", value: "superadmin(it)" },
    { label: "SuperAdmin(Dept)", value: "superadmin(dept)" },
    { label: "HelpDeskSupport", value: "helpdesksupport" },
    { label: "Local Inspecting Officer", value: "local_inspecting_officer" },
    { label: "Inspecting Officer", value: "inspecting_officer" },
    { label: "Venue Supervisor", value: "venue_supervisor" },
    {
      label: "Assistant Venue Supervisor",
      value: "assistant_venue_supervisor",
    },
    { label: "Bel Supervisor", value: "bel_supervisor" },
    { label: "Maker", value: "maker" },
    { label: "Checker", value: "checker" },
    { label: "Approver", value: "approver" },
  ];

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = () => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Controller
              name="role_ID"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Role ID"
                  variant="outlined"
                  fullWidth
                  value='--<System Generated>--'
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="role_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Role Name"
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
              name="role_description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Role Description"
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
              name="role_short-code"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Role Short Code"
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
