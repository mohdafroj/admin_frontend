"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { TextField, Button, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

const Input = styled(TextField)`
  && {
    .MuiInputBase-root {
      font-size: 16px;
      height: 2.8em;
    }
    .MuiInputLabel-root {
      color: "primary";
    }
  }
`;

const Form = ({ initialData, isEditMode, onClose, onRefresh }: any) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      departmentId: isEditMode ? initialData?.departmentId : "",
      departmentNameEn: initialData?.departmentNameEn || "",
      departmentNameHi: initialData?.departmentNameHi || "",
      isActive: initialData?.isActive || "Y",
      createdBy: "1",
      modifiedBy: "1",
    },
  });

  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    "http://172.16.16.20:8351/UserMgmt/API/v1/master_data";

  const onSubmit = (data: any) => {
    // alert("kjnkjn");
    const url = isEditMode
      ? `${backendBaseUrl}/editDepartment/${initialData?.departmentId}`
      : `${backendBaseUrl}/createDepartment`;

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Department ID"
                value={isEditMode ? field.value : "--<System Generated>--"}
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
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabets and spaces are allowed",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Department Name (Eng)"
                variant="outlined"
                fullWidth
                margin="dense"
                // error={!!errors.departmentNameEn} // Access error from errors object
                // helperText={errors.departmentNameEn?.message}
                multiline
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="departmentNameHi"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Department Name (Hin)"
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                error={!!error}
                helperText={error ? error.message : ""}
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
  );
};

export default Form;
