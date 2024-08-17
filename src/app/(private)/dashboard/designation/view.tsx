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

const View = ({ designationId }: any) => {
  const [formData, setFormData] = React.useState({
    designationId: "",
    designationNameEn: "",
    designationNameHi: "",
    designationShortName: "",
    isActive: "",
  });

  const { control, reset } = useForm();

  React.useEffect(() => {
    if (designationId) {
      getDesignationDetails(designationId);
    }
  }, [designationId]);

  const getDesignationDetails = (id: string) => {
    fetch(
      `http://172.16.11.16:8101/UserMgmt/API/v1/master_data/getDesignation/${id}`,
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
          designationId: data.departmentId || "",
          designationNameEn: data.designationNameEn || "",
          designationNameHi: data.designationNameHi || "",
          designationShortName: data.designationShortName || "",
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
          name="designationId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Designation ID"
              value={formData.designationId}
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
              value={formData.designationNameEn}
              disabled
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
              value={formData.designationNameHi}
              disabled
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
              multiline
              value={formData.designationShortName}
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
