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
//       .get("${API_BASE_URL}/api/generateOTP", { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
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
//       .post("${API_BASE_URL}/api/resetPassword", { email, password })
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
//             style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "4px", backgroundColor: "#B40404", color: "#fff", cursor: "pointer" }}
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
//             style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "4px", backgroundColor: "#B40404", color: "#fff", cursor: "pointer" }}
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
//       .get("${API_BASE_URL}/api/generateOTP", { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
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
//       .post("${API_BASE_URL}/api/resetPassword", { email, password })
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
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from 'src/api/index';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sending, setSending] = useState(false); // State for sending status
  const [validating, setValidating] = useState(false); // State for validating OTP
  const [updating, setUpdating] = useState(false); // State for updating password
  const navigate = useNavigate();

  const handleSendOTP = () => {
    setSending(true); // Set sending status to true
    axios
      .get(`${API_BASE_URL}/api/generateOTP`, { params: { email, name: "User", reason: "FORGOTPASSWORD" } })
      .then(() => {
        setOtpSent(true);
        setSending(false); // Reset sending status
        setTimeout(() => {
          // Enable the button again after 90 seconds
          setOtpSent(false);
        }, 90000);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.response?.data?.message);
        setSending(false); // Reset sending status
      });
  };

  const handleValidateOTP = () => {
    setValidating(true); // Set validating status to true
    axios
      .post(`${API_BASE_URL}/api/validateOTP`, { email, otp })
      .then(() => {
        setOtpValidated(true);
        setValidating(false); // Reset validating status
        // Show success message and then navigate
        // setTimeout(() => {
        //   // // Navigate after 2 seconds
        //   // navigate("/reset-success"); // Change to your success page route if necessary
        // }, 2000);
      })
      .catch((error) => {
        console.error("Error validating OTP:", error.response?.data?.message);
        setValidating(false); // Reset validating status
      });
  };

  const handleResetPassword = async () => {
    setUpdating(true); // Set updating status to true
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match"); // Change from toast to alert
        setUpdating(false); // Reset updating status
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/resetPassword`, { email, password });

      if (response.status === 200) {
        setTimeout(() => {
          // Show success message and then navigate
          navigate("/login");
        }, 0);
      } else {
        alert("Unexpected error occurred. Please try again later."); // Change from toast to alert
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "Error resetting password. Please try again later."); // Change from toast to alert
    } finally {
      setUpdating(false); // Reset updating status
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
            disabled={sending} // Disable button while sending
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: sending ? "#B40404" : "#B40404", // Change color when sending
              color: "#fff",
              cursor: sending ? "not-allowed" : "pointer" // Change cursor when sending
            }}
          >
            {sending ? "Sending..." : "Send OTP"} {/* Change button text based on sending status */}
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
                disabled={validating} // Disable button while validating
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#B40404", // Change to your preferred color
                  color: "#fff",
                  cursor: validating ? "not-allowed" : "pointer" // Change cursor when validating
                }}
              >
                {validating ? "Validating..." : "Validate OTP"} {/* Change button text based on validating status */}
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
                disabled={updating} // Disable button while updating
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#B40404", // Change to your preferred color
                  color: "#fff",
                  cursor: updating ? "not-allowed" : "pointer" // Change cursor when updating
                }}
              >
                {updating ? "Updating..." : "Reset Password"} {/* Change button text based on updating status */}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
