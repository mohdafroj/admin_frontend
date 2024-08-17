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
import { useAuth } from "../AuthContext/AuthContext";
// @ts-ignore
import Captcha from "demos-react-captcha";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
// @ts-ignore
import Cookies from 'js-cookie'
// import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [forms, setForms] = useState<any>({
    userId: "",
    candidatePassword: "",
    email: "",
    mobile: "",
    otpValue: "",
    otpValue2: "",
    captcha: "",
  });
  const [alignment, setAlignment] = useState("1");
  const { useLogin, useSendOTP, useVerifyOTP } = useAuth();
  const [showText, setShowText] = React.useState(null);
  const captchaRef = React.useRef<any>("ss");
  const [timerActive, setTimerActive] = useState(false);
  const [textValue, setTextValue] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300); // 300 seconds for 5 minutes
  const [emailError, setEmailError] = useState("");
  const [otrError, setOtrError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [alert, setAlert] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailOtp, setEmailOtp] = React.useState("");
  const [mobileOtp, setMobileOtp] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment) {
      setForms({
        userId: "",
        candidatePassword: "",
        email: "",
        mobile: "",
        otpValue: "",
        otpValue2: "",
        captcha: "",
      });
      setShowPassword(false);
      setAlert("");
      setEmailError("");
      setOtrError("");
      setMobileError("");
      setAlignment(newAlignment);
      captchaRef.current.refresh();
      setTimerActive(false);
      setTextValue(false);
      setSecondsLeft(300);
      return;
    }
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex =
        /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){1,63}@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
    if (name === "userId") {
      if (value.length === 7) {
        return;
      }
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length < 6) {
        setOtrError("Please enter a valid User ID");
      } else {
        setOtrError("");
      }
    }
    if (name === "mobile") {
      if (value.length === 11) {
        return;
      }
      if (value.length === 10) {
        if (parseInt(value[0]) < 6) {
          setMobileError("Please enter a valid mobile number.");
        } else {
          setMobileError("");
        }
      } else if (value.length < 10) {
        setMobileError("Please enter a valid mobile number.");
      } else {
        setMobileError("");
      }
    }
    if (name === "candidatePassword") {
      if (value.length === 16) {
        return;
      }
    }
    setAlert("");
    setForms((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    if(forms.userId === '123456' && forms.candidatePassword === '123456'){
      Cookies.set('token' , 'dummyToken')
      Cookies.set('type','1')
      router.replace('/dashboard')
    }
    else if(forms.userId === '654321' && forms.candidatePassword === '654321'){
      Cookies.set('token' , 'dummyToken')
      Cookies.set('type','2')
      router.replace('/dashboard')
    }
    else{
      window.alert('please enter correct credential')
    }
    // await useLogin({ ...forms, type: alignment });
    // if (data) {
    //   return window.location.href = '/dashboard/candidate';
    // }
    // return;
    // captchaRef.current.refresh();
  };

  const getData = (value: any) => {
    setTextValue(value);
    setShowText(value);
  };
  const inputCheck: any = (value: any, y: any) => {
    console.log("check input", value, y);
  };
  const onRefreshx = () => {
    setTextValue(false);
    setShowText(null);
  };
  const handleSendOtp = async (type: string) => {
    const data: any = await useSendOTP({
      otpType: type,
      form: "login",
      otpTypeId: type === "email" ? forms?.email : forms?.mobile,
      // message: "Login",
    });
    console.log(data);
    if (type === "email") {
      setEmailOtp(data?.otp);
    }
    if (type === "mobile") {
      setMobileOtp(data?.otp);
    }
    if (data && !data?.error) {
      console.log("dada");
      startTimer();
    } else {
      // if (data?.type === "firstLogin") {
      //   setOpen(true);
      //   setAlert(data?.msg);
      // } else {
      //   console.log(data);
      //   setAlert(data?.msg);
      // }
      setAlert(data?.msg);
    }
  };
  const handleVerifyOtp = async () => {
    const data: any = await useVerifyOTP({
      otpType: alignment === "2" ? "email" : "mobile",
      form: "login",
      otpTypeId: alignment === "2" ? forms?.email : forms?.mobile,
      otpValue:
        alignment === "2"
          ? parseInt(forms?.otpValue)
          : parseInt(forms?.otpValue2),
    });
    captchaRef.current.refresh();
    // if (data) {
    //   return (window.location.href = "/dashboard/candidate");
    // }
    // return;
  };
  useEffect(() => {
    let timer: any;
    if (timerActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [timerActive, secondsLeft]);

  const startTimer = () => {
    setSecondsLeft(300); // Reset to 5 minutes
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  console.log(otrError != "" || !showText || showText == null, "hshhshs");
  return (
    <Grid container maxWidth="xl" sx={{ height: "auto", fontFamily: "" }}>
      <Grid lg={3} md={3} sm={0} xs={0}/>
      <Grid lg={6} md={6} sm={12} xs={12}
        spacing={2}
        sx={{
          // height: "auto",
          borderRadius: "4px 4px 4px 4px",
          //   display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          mx: "auto",
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
            Admin Login
          </Typography>
        </Box>
        <Box
          sx={{
            // border: "1px solid gray",
            // height: "auto",
            width: "90%",
            mx: "auto",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          {/* <FormControl variant="standard"> */}
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Select Mode for Login*
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              size="medium"
              sx={{
                width: "100%",
                border: "1px solid blue",

                height: "50px",
              }}
              //   style={{ width: '500px', border: '1px solid red' }}
            >
              <ToggleButton
                value="1"
                sx={{
                  width: "34%",
                  height: "50px",
                  border: "1px solid blue",
                  fontWeight: 600,
                  fontSize: "18px",
                  backgroundColor:
                    alignment === "1" ? "#2947A3 !important" : "",
                  color: alignment === "1" ? "white !important" : "",
                }}
              >
                USER ID
              </ToggleButton>
              <ToggleButton
                value="2"
                sx={{
                  width: "33%",
                  border: "1px solid blue",
                  height: "50px",

                  fontWeight: 600,
                  fontSize: "18px",
                  backgroundColor:
                    alignment === "2" ? "#2947A3 !important" : "",
                  color: alignment === "2" ? "white !important" : "",
                }}
              >
                EMAIL
              </ToggleButton>
              <ToggleButton
                value="3"
                sx={{
                  width: "34%",
                  height: "50px",

                  border: "1px solid blue",
                  fontWeight: 600,
                  fontSize: "18px",
                  backgroundColor:
                    alignment === "3" ? "#2947A3 !important" : "",
                  color: alignment === "3" ? "white !important" : "",
                }}
              >
                MOBILE
              </ToggleButton>
              {/* <ToggleButton
                value="aadhaar"
                sx={{ width: "26%", border: "1px solid blue" }}
              >
                AADHAAR
              </ToggleButton> */}
            </ToggleButtonGroup>
          </Box>
          {alignment === "1" && (
            <Box>
              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  USER ID*
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    width: "100%",
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                  placeholder="Please enter USER ID"
                  name="userId"
                  value={forms?.userId}
                  onChange={handleFormChange}
                  type="number"
                  // InputProps={{
                  //   inputProps: {
                  //     max: 15,
                  //     min: 10,
                  //   },
                  // }}
                  inputProps={{
                    maxLength: 6,
                    // inputMode: "numeric",
                    // pattern: "[0-9]*",
                  }}
                  error={!!otrError}
                  helperText={otrError}
                ></TextField>
              </Box>
              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  Password*
                </Typography>
                <TextField
                  size="small"
                  sx={{ width: "100%" }}
                  placeholder="Please password"
                  name="candidatePassword"
                  type={showPassword ? "text" : "password"}
                  value={forms?.candidatePassword}
                  onChange={handleFormChange}
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
                ></TextField>
              </Box>
            </Box>
          )}

          {/*  */}
          {alignment === "2" && (
            <Box>
              <Box sx={{ alignItems: "center" }}>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  Email*
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    width: "75%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px 0 0 4px",
                      height: "41px",
                    },
                  }}
                  name="email"
                  value={forms?.email}
                  placeholder="Please enter email"
                  onChange={handleFormChange}
                  InputProps={{
                    readOnly: timerActive,
                  }}
                  error={!!emailError}
                  helperText={emailError}
                ></TextField>
                <Button
                  sx={{
                    width: "25%",
                    height: "41px",
                    borderRadius: "0 4px 4px 0",
                    backgroundColor: "#2947A3",
                  }}
                  variant="contained"
                  size="medium"
                  onClick={() => handleSendOtp("email")}
                  disabled={timerActive || emailError !== ""}
                >
                  Send OTP
                </Button>
                {alert && (
                  <Alert severity="error" color="error">
                    {alert}
                  </Alert>
                )}
              </Box>
              {emailOtp && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  {emailOtp}
                </span>
              )}
              <span style={{ fontSize: "12px", color: "red" }}>{}</span>
              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  Enter OTP*
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px 0 0 4px",
                      height: "41px",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                  placeholder="Enter OTP"
                  name="otpValue"
                  value={forms?.otpValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    if (value.length <= 6) {
                      // Max length check
                      handleFormChange(e);
                    }
                  }}
                ></TextField>
                {/* <Button
                  sx={{
                    width: "25%",
                    height: "41px",
                    borderRadius: "0 4px 4px 0",
                  }}
                  variant="contained"
                  size="medium"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button> */}
                <Box
                  sx={{
                    textAlign: "right",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "right",
                    // border: "1px solid teal",
                  }}
                >
                  {timerActive && (
                    <Typography
                      sx={{
                        marginRight: "10px",
                        color: "gray",
                        marginTop: "5px",
                      }}
                    >
                      Submitting otp in {formatTime(secondsLeft)} min
                    </Typography>
                  )}
                  <Button
                    variant="text"
                    sx={{
                      textDecoration: "underline", // Adds underline to the text
                      "&:hover": {
                        textDecoration: "underline", // Ensures the underline remains on hover
                      },
                    }}
                    disabled={timerActive}
                  >
                    Resend OTP
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {alignment === "3" && (
            <Box>
              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  Mobile*
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  sx={{
                    width: "75%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px 0 0 4px",
                      height: "41px",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                  name="mobile"
                  value={forms?.mobile}
                  onChange={handleFormChange}
                  placeholder="Please enter mobile no"
                  error={!!mobileError}
                  helperText={mobileError}
                ></TextField>
                <Button
                  sx={{
                    width: "25%",
                    height: "41px",
                    borderRadius: "0 4px 4px 0",
                    backgroundColor: "#2947A3",
                  }}
                  variant="contained"
                  size="medium"
                  onClick={() => handleSendOtp("mobile")}
                  disabled={timerActive || mobileError !== ""}
                >
                  Send OTP
                </Button>
                {alert && (
                  <Alert severity="error" color="error">
                    {alert}
                  </Alert>
                )}
              </Box>
              {mobileOtp && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  {mobileOtp}
                </span>
              )}

              <Box>
                {" "}
                <Typography sx={{ marginTop: "20px", fontWeight: 600 }}>
                  Enter OTP*
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px 0 0 4px",
                      height: "41px",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                  placeholder="Enter OTP"
                  name="otpValue2"
                  value={forms?.otpValue2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    if (value.length <= 6) {
                      // Max length check
                      handleFormChange(e);
                    }
                  }}
                ></TextField>
                <Box
                  sx={{
                    textAlign: "right",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "right",
                    // border: "1px solid teal",
                  }}
                >
                  {timerActive && (
                    <Typography
                      sx={{
                        marginRight: "10px",
                        color: "gray",
                        marginTop: "5px",
                      }}
                    >
                      Submitting otp in {formatTime(secondsLeft)} min
                    </Typography>
                  )}
                  <Button
                    variant="text"
                    sx={{
                      textDecoration: "underline", // Adds underline to the text
                      "&:hover": {
                        textDecoration: "underline", // Ensures the underline remains on hover
                      },
                    }}
                    disabled={timerActive}
                  >
                    Resend OTP
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          <Box>
            {" "}
            <Typography sx={{ marginTop: "5px", fontWeight: 600 }}>
              Captcha*
            </Typography>
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
            {/* <TextField
                  size="small"
                  sx={{ width: "100%", marginTop: "15px" }}
                  placeholder="Please captcha"
                  name="captcha"
                  value={forms?.captcha}
                  onChange={handleFormChange}
                ></TextField> */}
          </Box>
        </Box>
        {/* <span>(*) Mandatory fields</span>*/}
        <Box
          sx={{
            width: "90%",
            mx: "auto",
            // marginBottom: "30px",
          }}
        >
          <span>(*) Mandatory fields</span>
          <br />
          <Button
            variant="contained"
            fullWidth
            onClick={alignment === "1" ? handleLogin : handleVerifyOtp}
            sx={{
              backgroundColor: "#2947A3",
            }}
            disabled={
              alignment === "1"
                ? (
                  otrError != "" || 
                  !showText || showText == null)
                : timerActive && (!showText || showText == null)
            }
          >
            LOGIN
          </Button>
          <Box sx={{ display: "flex", justifyContent: "right", mb: "40px" }}>
            {/* <Button onClick={() => router.push("/candidate/forgot-password")}>
              Forgot Password
            </Button> */}
          </Box>
        </Box>
      </Grid>
      <Grid lg={3} md={3} sm={0} xs={0}/>
    </Grid>
  );
};

export default Login;