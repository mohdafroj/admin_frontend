"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { TextField, FormControlLabel, Switch } from "@mui/material";

const Input = styled(TextField)`
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

const View = ({ departmentId }: any) => {
  const [formData, setFormData] = React.useState({
    departmentId: "",
    departmentNameEn: "",
    departmentNameHi: "",
    isActive: "",
  });

  const { control, reset } = useForm();

  React.useEffect(() => {
    if (departmentId) {
      getDepartmentDetails(departmentId);
    }
  }, [departmentId]);

  const getDepartmentDetails = (id: string) => {
    fetch(
      `http://172.16.16.20:8351/UserMgmt/API/v1/master_data/getDepartment/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setFormData({
          departmentId: data.departmentId || "",
          departmentNameEn: data.departmentNameEn || "",
          departmentNameHi: data.departmentNameHi || "",
          isActive: data.isActive || "",
        });
        reset(data); // Reset form with the fetched data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name="departmentId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Department ID"
              value={formData.departmentId}
              variant="outlined"
              fullWidth
              margin="dense"
              disabled
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="departmentNameEn"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Department Name (Eng)"
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
              value={formData.departmentNameEn}
              disabled
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="departmentNameHi"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Department Name (Hin)"
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
              value={formData.departmentNameHi}
              disabled
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
                  checked={formData.isActive === "Y"} // Check if isActive is "Y" to determine if checked
                  color="primary"
                  disabled
                />
              }
              label="Status"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default View;
