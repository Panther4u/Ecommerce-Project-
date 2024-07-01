// import React, { useState } from "react";
// import axios from "axios";
// import s from "./ForgotPassword.module.scss";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const { t } = useTranslation();

//   const handleSendOTP = () => {
//     axios
//       .get("http://localhost:8000/api/generateOTP", { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
//       .then(() => {
//         toast.success("OTP sent successfully");
//         setOtpSent(true);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error.response.data.message);
//         setError("Error sending OTP. Please try again later.");
//       });
//   };

//   const handleResetPassword = () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     axios
//       .post("http://localhost:8000/api/resetPassword", { email, password })
//       .then(() => {
//         toast.success("Password reset successfully");
//         // Redirect or show success message
//       })
//       .catch((error) => {
//         console.error("Error resetting password:", error.response.data.message);
//         setError("Error resetting password. Please try again later.");
//       });
//   };
//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>Forgot Password</h2>
//       {!otpSent ? (
//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
//           />
//           <button
//             onClick={handleSendOTP}
//             style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
//           >
//             Send OTP
//           </button>
//         </div>
//       ) : (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
//           />
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }}
//           />
//           <input
//             type="password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }}
//           />
//           <button
//             onClick={handleResetPassword}
//             style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
//           >
//             Reset Password
//           </button>
//         </div>
//       )}
//       {error && <div style={{ marginTop: "10px", color: "red" }}>{error}</div>}
//     </div>
//   );
// };

// export default ForgotPassword;





// // ForgotPassword.js
// import React, { useState } from "react";
// import axios from "axios";
// import s from "./ForgotPassword.module.scss";
// import { useTranslation } from "react-i18next";

// const ForgotPassword = () => {
  // const [email, setEmail] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  // const { t } = useTranslation();

//   const handleSendOTP = () => {
//     axios
//       .get("http://localhost:8000/api/generateOTP", { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
//       .then((response) => {
//         console.log("OTP sent successfully");
//         setOtpSent(true);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error.response ? error.response.data.message : error.message);
//         setError("Error sending OTP. Please try again later.");
//       });
//   };

//   const handleResetPassword = () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     axios
//       .post("http://localhost:8000/api/resetPassword", { email, password })
//       .then(() => {
//         console.log("Password reset successfully");
//         // Redirect or show success message
//       })
//       .catch((error) => {
//         console.error("Error resetting password:", error.response ? error.response.data.message : error.message);
//         setError("Error resetting password. Please try again later.");
//       });
//   };

//   return (
    // <form className={s.form}>
    //   <h2>{t("Forgot Password")}</h2>
    //   {!otpSent ? (
    //     <div className={s.inputs}>
    //       <input
    //         type="email"
    //         placeholder={t("Enter your email")}
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <button
    //         onClick={handleSendOTP}
    //         className={s.loginBtn}
    //       >
    //         {t("Send OTP")}
    //       </button>
    //     </div>
    //   ) : (
    //     <div className={s.inputs}>
    //       <input
    //         type="text"
    //         placeholder={t("Enter OTP")}
    //         value={otp}
    //         onChange={(e) => setOtp(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         placeholder={t("Enter new password")}
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         placeholder={t("Confirm new password")}
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //       <button
    //         onClick={handleResetPassword}
    //         className={s.loginBtn}
    //       >
    //         {t("Reset Password")}
    //       </button>
    //     </div>
    //   )}
    //   {error && <p className={s.error}>{error}</p>}
    // </form>
//   );
// };

// export default ForgotPassword;




import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    axios
      .get("http://localhost:8000/api/generateOTP", { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
      .then(() => {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.response?.data?.message);
        toast.error("Error sending OTP. Please try again later.");
      });
  };

  const handleValidateOTP = () => {
    axios
      .post("http://localhost:8000/api/validateOTP", { email, otp })
      .then(() => {
        toast.success("OTP validated successfully");
        setOtpValidated(true);
      })
      .catch((error) => {
        console.error("Error validating OTP:", error.response?.data?.message);
        toast.error("Invalid OTP. Please try again.");
      });
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/resetPassword", { email, password });

      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error("Unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Error resetting password. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>Forgot Password</h2>

      {!otpSent ? (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <button
            onClick={handleSendOTP}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          {!otpValidated ? (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              <button
                onClick={handleValidateOTP}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Validate OTP
              </button>
            </div>
          ) : (
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "10px" }}
              />
              <button
                onClick={handleResetPassword}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
