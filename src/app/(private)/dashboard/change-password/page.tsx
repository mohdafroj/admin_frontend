/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// @ts-ignore
import Captcha from "demos-react-captcha";
import { useAuth } from "@/components/AuthContext/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordChecklist from "react-password-checklist";

const CandidateForgotPassword = () => {
  const [forms, setForms] = useState<any>({
    password: "",
    confirm_password: "",
    captcha: "",
  });
  const [, setAlignment] = useState("1");
//   const { useChangePassword } = useAuth();
  const [showText, setShowText] = React.useState(null);
  const captchaRef = React.useRef<any>("ss");
  const [timerActive, setTimerActive] = useState(false);
  // const [textValue, setTextValue] = React.useState(false);
  console.log(captchaRef);
  const [textValue, setTextValue] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [ruleErrors, setRuleErrors] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = useState(false);

  const getData = (value: any) => {
    setTextValue(value);
    setShowText(value);
  };
  const inputCheck: any = (value: any, y: any) => {
    console.log("check input", value, y);
  };
  const onRefreshx = () => {
    console.log("Captcha refreshed");
    setTextValue(false);
    setShowText(null);
    // if (captchaRef.current) {
    //   captchaRef.current.refresh(); // Reset the captcha using the ref
    // }
  };
  //   useEffect(() => {
  //     let timer: any;
  //     if (timerActive && secondsLeft > 0) {
  //       timer = setInterval(() => {
  //         setSecondsLeft((prev) => prev - 1);
  //       }, 1000);
  //     } else if (secondsLeft === 0) {
  //       setTimerActive(false);
  //     }

  //     return () => clearInterval(timer);
  //   }, [timerActive, secondsLeft]);

  //   const startTimer = () => {
  //     setSecondsLeft(300); // Reset to 5 minutes
  //     setTimerActive(true);
  //   };

  //   const formatTime = (seconds: number) => {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  //   };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // if (name === "email") {
    //   const emailRegex =
    //     /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){1,63}@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    //   if (!emailRegex.test(value)) {
    //     setEmailError("Please enter a valid email address.");
    //   } else {
    //     setEmailError("");
    //   }
    // }
    // if (name === "mobile") {
    //   if (value.length === 11) {
    //     return;
    //   }
    //   if (value.length === 10) {
    //     if (parseInt(value[0]) < 6) {
    //       setMobileError("Please enter a valid mobile number.");
    //     } else {
    //       setMobileError("");
    //     }
    //   } else if (value.length < 10) {
    //     setMobileError("Please enter a valid mobile number.");
    //   } else {
    //     setMobileError("");
    //   }
    // }
    setAlert("");
    setForms((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    // const data: any = await useChangePassword({
    //   candidatePassword: forms?.password,
    // });
    // console.log(data, "data");
    // if (data && data?.error) {
    //   setAlert(data?.msg);
    // }
    captchaRef.current.refresh();
    // if (data) {
    //   return (window.location.href = "/dashboard/candidate");
    // }
    // return;
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  console.log(showPassword1, "pass");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // useEffect(() => {}, [alert]);
  console.log(alert);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid xs={12} md={12} item>
          <Box
            sx={{
              width: "660px",
              height: "auto",
              borderRadius: "4px 4px 0px 0px",
              //   display: "flex",
              paddingBottom: "20px",
              justifyContent: "center",
              //   alignItems: "center",
              margin: "0 0 20px 0",
              mx: "auto",
              //   my: "auto",
              background: "white",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
              //   my: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                border: "1px solid gray",
                height: "60px",
                width: "100%",
                borderRadius: "4px 4px 0px 0px",
                background: "#2947A3",

                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  padding: "0 16px",
                  fontSize: "20px",
                  fontWeight: 700,
                  alignItems: "center",
                }}
              >
                Change Password
              </Typography>
            </Box>
            <Box
              sx={{
                // border: "1px solid gray",
                height: "auto",
                width: "90%",
                mx: "auto",
                marginTop: "30px",
              }}
            >
              <Box>
                <Box>
                  <Typography sx={{ marginTop: "5px" }}>
                    New Password*
                  </Typography>
                  <TextField
                    size="small"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                        height: "41px",
                      },
                    }}
                    placeholder="Enter password"
                    name="password"
                    value={forms?.password}
                    onChange={handleFormChange}
                    error={!!passwordError}
                    helperText={passwordError}
                  ></TextField>
                  {alert && (
                    <Alert severity="error" color="error">
                      {alert}
                    </Alert>
                  )}
                </Box>
                <Box>
                  <Typography sx={{ marginTop: "20px" }}>
                    Confirm Password*
                  </Typography>
                  <TextField
                    size="small"
                    type={showPassword1 ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                        height: "41px",
                      },
                    }}
                    // disabled={ruleErrors === "match" ? false : true}
                    placeholder="Enter confirm password"
                    name="confirm_password"
                    value={forms?.confirm_password}
                    onChange={handleFormChange}
                    error={!!confirmPassError}
                    helperText={confirmPassError}
                  ></TextField>
                </Box>
                {forms.password && (
                  <PasswordChecklist
                    rules={[
                      "number",
                      "capital",
                      "minLength",
                      "lowercase",
                      "match",
                      "specialChar",
                    ]}
                    minLength={8}
                    value={forms.password}
                    valueAgain={forms.confirm_password}
                    onChange={(isValid, rules) => {
                      setRuleErrors(rules[0]);
                      if (isValid) {
                        setPasswordError("");
                        setConfirmPassError("");
                      } else {
                        if (ruleErrors === "match") {
                          setConfirmPassError(
                            "Confirm Password must be matches with New Password."
                          );
                        }
                      }
                    }}
                    messages={{
                      minLength: "Password has at least 8 characters.",
                      specialChar: "Password has special characters..",
                      number: "Password has a number.",
                      capital: "Password has a capital letter.",
                      match: "New Password matches with Confirm Password.",
                      lowercase: "Password has a lowercase letter",
                    }}
                  />
                )}
              </Box>
              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px" }}>Captcha*</Typography>
                {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
                <Box>
                  <Captcha
                    oninput={inputCheck}
                    ref={captchaRef}
                    placeholder="Enter captcha" // optional
                    length={6} // default
                    onRefresh={onRefreshx}
                    onChange={getData}
                  />
                  {showText === null
                    ? null
                    : !showText && (
                        <span style={{ color: "red" }}>
                          Please enter valid captcha
                        </span>
                      )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                // border: "1px solid gray",
                width: "90%",
                mx: "auto",
                marginTop: "15px",
              }}
            >
              <span>(*) Mandatory fields</span>
              <br />
              <Button
                variant="contained"
                fullWidth
                onClick={handleChangePassword}
                sx={{
                  backgroundColor: "#2947A3",
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CandidateForgotPassword;
