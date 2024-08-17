"use client";
import RedirectModal from "@/component/common/RedirectModal";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AuthContextProps {
  isAuthenticated: boolean;
  useLogin: (forms: any) => Promise<any>;
  useSendOTP: (forms: any) => Promise<string>;
  useVerifyOTP: (forms: any) => Promise<any>;
  useForgotOTP: (forms: any) => Promise<any>;
  useChangePassword: (forms: any) => Promise<any>;
  useForgotPassword: (forms: any) => Promise<any>;
  useSendOTROTP: (forms: any) => Promise<any>;
  useGetUser: (forms: any) => Promise<any>;
  useVerifyRegisterOTP: (forms: any) => Promise<any>;
  logout: () => void;
}

const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3300/v1";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const useLogin = async (data: any) => {
    // console.log(data);
    try {
      const response = await axios.post(`${backendBaseUrl}/auth/login`, data);
      console.log(response.data);
      if (response?.data?.candidate?.firstTimeLogin === "Y") {
        console.log(122);
        const tokenString = JSON.stringify(response.data.tokens);
        localStorage.setItem("tokens", tokenString);
        setIsAuthenticated(true);
        localStorage.setItem(
          "candidate",
          JSON.stringify(response?.data?.candidate)
        );
        router.push("/candidate/change-password");
      } else {
        console.log(1);
        const tokenString = JSON.stringify(response.data.tokens);
        localStorage.setItem("tokens", tokenString);
        localStorage.setItem(
          "candidate",
          JSON.stringify(response?.data?.candidate)
        );
        setIsAuthenticated(true);
        router.push("/candidate/dashboard");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const useSendOTP = async (data: any) => {
    try {
      console.log(backendBaseUrl);
      let response: any;
      if (data?.otpType === "email") {
        response = await axios.post(
          `${backendBaseUrl}/candidate/verifyContact`,
          data
        );
      } else if (data?.otpType === "mobile") {
        response = await axios.post(
          `${backendBaseUrl}/candidate/verifyContact`,
          data
        );
      }
      console.log(32);
      if (!response.data.error) {
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return response.data;
      } else {
        // if (response?.data?.type === "firstTimeLogin") {
        console.log(122);
        //   return <RedirectModal open={true} text={response?.data?.msg} />;
        //   // return (window.location.href = "/candidate/login");
        // }
        // else
        //  {
        return response.data;
        // }
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const useVerifyOTP = async (data: any) => {
    // console.log(data)
    const { form } = data;
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/verifyOtp`,
        data
      );
      console.log(response);
      if (!response.data.error) {
        // console.log(1);
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (form === "forgot") {
          // if (response?.data?.candidate?.firstTimeLogin === "N") {
          const tokenString = JSON.stringify(response.data.tokens);
          localStorage.setItem("tokens", tokenString);
          // setIsAuthenticated(true);
          // }
          return response?.data?.error;
        } else {
          if (response?.data?.candidate?.firstTimeLogin === "N") {
            const tokenString = JSON.stringify(response.data.tokens);
            localStorage.setItem("tokens", tokenString);
            setIsAuthenticated(true);
            return router.push("/candidate/dashboard");
          } else {
            const tokenString = JSON.stringify(response.data.tokens);
            localStorage.setItem("tokens", tokenString);
            setIsAuthenticated(true);
            return router.push("/candidate/change-password");
          }
        }
      } else {
        console.log(2);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e: any) {
      if (e?.response?.status == 409) {
        toast.error(e?.response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      return e;
    }
  };

  const useVerifyRegisterOTP = async (data: any) => {
    // console.log(data)
    const { form } = data;
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/verifyOtp`,
        data
      );
      console.log(response);
      if (!response.data.error) {
        // console.log(1);
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return response;
      } else {
        console.log(2);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return e;
    }
  };
  const useForgotOTP = async (data: any) => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/register/verifyEmailOtp`,
        data
      );
      console.log(response.data);
      if (!response.data.error) {
        console.log(1);
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // localStorage.setItem("token", response.data.token);
        // setIsAuthenticated(true);
        router.push("/candidate/login");
      } else {
        console.log(2);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const useChangePassword = async (data: any) => {
    const retrievedTokenString = localStorage.getItem("tokens") || "";
    const tokenObject = JSON.parse(retrievedTokenString);
    console.log(tokenObject);
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/changePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenObject.access.token}`,
          },
        }
      );
      console.log(response);
      if (!response?.data?.error) {
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return router.push("/candidate/login");
      }
      return response.data;
    } catch (e: any) {
      console.log(e);
      return e?.response?.data;
    }
  };
  const useForgotPassword = async (data: any) => {
    const retrievedTokenString = localStorage.getItem("tokens") || "";
    const tokenObject = JSON.parse(retrievedTokenString);
    console.log(tokenObject);
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/changePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenObject.access.token}`,
          },
        }
      );
      console.log(response);
      if (!response?.data?.error) {
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return router.push("/candidate/login");
      }
      return response.data;
    } catch (e: any) {
      return e?.response?.data;
      // console.log(e, "errrr");
    }
  };
  const useGetUser = async (data: any) => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/candidate/get`,
        data
      );
      return response?.data;
    } catch (e) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const useSendOTROTP = async (data: any) => {
    try {
      console.log(backendBaseUrl);
      let response: any;
      if (data?.otpType === "email") {
        response = await axios.post(
          `${backendBaseUrl}/candidate/verifyContact`,
          data
        );
      } else if (data?.otpType === "mobile") {
        response = await axios.post(
          `${backendBaseUrl}/candidate/verifyContact`,
          data
        );
      }
      if (!response.data.error) {
        toast.success(response?.data?.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return response.data;
      } else {
        // if (response?.data?.type === "firstTimeLogin") {
        console.log(122);
        //   return <RedirectModal open={true} text={response?.data?.msg} />;
        //   // return (window.location.href = "/candidate/login");
        // }
        // else
        //  {
        return response.data;
        // }
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("candidate");
    setIsAuthenticated(false);
    router.push("/candidate/login");
  };

  useEffect(() => {
    // Check authentication status on initial load
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        useLogin,
        useSendOTP,
        useVerifyOTP,
        useForgotOTP,
        useChangePassword,
        useForgotPassword,
        useVerifyRegisterOTP,
        useGetUser,
        useSendOTROTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};