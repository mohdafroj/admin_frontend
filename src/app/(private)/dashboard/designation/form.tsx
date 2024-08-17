"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, MenuItem, FormControlLabel } from "@mui/material";
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
    .MuiInputLabel-root {
      color: "primary";
    }
  }
`;

const Form = ({ initialData, isEditMode, onClose, onRefresh }: any) => {
  console.log(isEditMode, "status");
  // const designation=  [
  //   { label: "Joint Secretary", value: "joint_secretary" },
  //   { label: "Assistant Director", value: "assistant_director" },
  //   { label: "Assistant Section Officer", value: "assistant_section_officer" },
  //   { label: "Consultant", value: "consultant" },
  //   { label: "Deputy Director", value: "deputy_director" },
  //   { label: "Data Entry Operator", value: "data_entry_operator" },
  //   { label: "Director", value: "director" },
  //   { label: "Data Processing Assistant", value: "data_processing_assistant" },
  //   { label: "Deputy Director", value: "deputy_director" },
  //   { label: "Joint Director", value: "joint_director" },
  //   { label: "Junior Review Officer", value: "junior_review_officer" },
  //   { label: "Review Officer", value: "review_officer" },
  //   { label: "System Analyst", value: "system_analyst" },
  //   { label: "Scorer", value: "scorer" },
  //   { label: "Section Officer", value: "section_officer" },
  //   { label: "Senior Review Officer", value: "senior_review_officer" },
  //   { label: "Senior System Analyst", value: "senior_system_analyst" },
  //   { label: "Superintendent", value: "superintendent" },
  //   { label: "Under Secretary", value: "under_secretary" },
  //   { label: "District Magistrate", value: "district_magistrate" },
  //   { label: "District Collector", value: "district_collector" },
  //   { label: "Principal", value: "principal" },
  //   { label: "Vice Principal", value: "vice_principal" }
  // ];
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      designationId: isEditMode ? initialData?.designationId : "",
      designationNameEn: initialData?.designationNameEn || "",
      designationNameHi: initialData?.designationNameHi || "",
      designationShortName: initialData?.designationShortName || "",
      isActive: initialData?.isActive || "N",
      createdBy: "1",
      modifiedBy: "1",
    },
  });

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    "http://172.16.11.16:8101/UserMgmt/API/v1/master_data";

  const onSubmit = (data: any) => {
    alert("kjnkjn");
    const url = isEditMode
      ? `${backendBaseUrl}/editDesignation/${initialData?.designationId}`
      : `${backendBaseUrl}/createDesignation`;

    fetch(url, {
      method: isEditMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onClose(); // Close the dialog
        onRefresh(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="designationId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Designation ID"
                  variant="outlined"
                  fullWidth
                  value={isEditMode ? field.value : "--<System Generated>--"}
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="designationNameEn"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Designation Name (Eng)"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="designationNameHi"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Designation Name (Hin)"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  multiline
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="designationShortName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Designation Short Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value === "Y"}
                      onChange={(e) =>
                        field.onChange(e.target.checked ? "Y" : "N")
                      }
                      color="primary"
                    />
                  }
                  label="Status"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
