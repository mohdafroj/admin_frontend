"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, MenuItem } from "@mui/material";
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

 const officerType = [
  {
    value: "EUR",
    label: " ",
  },
  {
    value: "EUR",
    label: "Gazetted",
  },
  {
    value: "BTC",
    label: "Non Gazetted",
  },
  {
    value: "JPY",
    label: "Not Applicable",
  },
];
 const department = [
  {
    value: "EUR",
    label: " ",
  },
  {
    value: "EUR",
    label: " IS Wing",
  },
  {
    value: "BTC",
    label: "Confidential Branch",
  },
  {
    value: "JPY",
    label: "Exam Branch",
  },
  {
    value: "EUR",
    label: " Arrangement Branch",
  },
  {
    value: "BTC",
    label: "VMS",
  },
  {
    value: "JPY",
    label: "Expert Branch",
  },
];
 const designation = [
  {
    value: "EUR",
    label: " ",
  },
  {
    value: "EUR",
    label: "Joint Secretary",
  },
  {
    value: "BTC",
    label: " Assitant Director",
  },
  {
    value: "JPY",
    label: " Assitant Section Officer",
  },
  {
    value: "EUR",
    label: " Consultant",
  },
  {
    value: "EUR",
    label: " Deputy Director",
  },
  {
    value: "BTC",
    label: " Data Entry Operator",
  },
  {
    value: "JPY",
    label: " Director",
  },
  {
    value: "EUR",
    label: "  Data Processing Assistant ",
  },
  {
    value: "EUR",
    label: "  Deputy Director",
  },
  {
    value: "BTC",
    label: "Joint Director",
  },
  {
    value: "JPY",
    label: "Junior Review Officer",
  },
  {
    value: "EUR",
    label: " Review Officer",
  },
  {
    value: "EUR",
    label: "System Analyst",
  },
  {
    value: "BTC",
    label: "Scorer",
  },
  {
    value: "JPY",
    label: "Section Officer",
  },
  {
    value: "JPY",
    label: " Senior Review Officer",
  },
  {
    value: "EUR",
    label: "Senior System Analyst",
  },
  {
    value: "EUR",
    label: "Superintendent",
  },
  {
    value: "BTC",
    label: "Under Secretary",
  },
  {
    value: "JPY",
    label: "District Magistrate",
  },
  {
    value: "EUR",
    label: "District Collector",
  },
  {
    value: "EUR",
    label: "System Analyst",
  },
  {
    value: "BTC",
    label: "Principal",
  },
  {
    value: "JPY",
    label: "Vice Principal",
  },
];
 const status = [
  { value: " ", label: "" },
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
 const userType = [
  {
    value: "EUR",
    label: "Employee ",
  },
  {
    value: "EUR",
    label: "Temporary",
  },
  {
    value: "BTC",
    label: "Contractual",
  },
  {
    value: "JPY",
    label: "Consultant",
  },
  {
    value: "EUR",
    label: "Advisor",
  },
  {
    value: "EUR",
    label: "Centre Coordinator ",
  },
  {
    value: "BTC",
    label: " Venue Coordinator ",
  },
  {
    value: "JPY",
    label: "Others",
  },
];

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = () => {

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <Input {...field} label="UserID" value='--<System Generated>--' variant="outlined" fullWidth margin="dense" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="employeeCode"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Employee Code" variant="outlined" fullWidth margin="dense" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Name" variant="outlined" fullWidth margin="dense" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="module"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Module" variant="outlined" fullWidth margin="dense" select>
                  {module && module.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Department" variant="outlined" fullWidth margin="dense" select>
                  {department && department?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Designation" variant="outlined" fullWidth margin="dense" select>
                  {designation && designation.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="officerType"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Officer Type" variant="outlined" fullWidth margin="dense" select>
                  {officerType && officerType?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                <Input {...field} label="User Type" variant="outlined" fullWidth margin="dense" select>
                  {userType && userType?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Input>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Date of Joining"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Date of Retirement"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
       
          <Grid item xs={12}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Status" variant="outlined" fullWidth margin="dense" select>
                  {status && status?.map((option) => (
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