import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { patientService } from "../../services/patientService";
import { AuthService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      setError("Please enter the complete 5-digit OTP");
      return;
    }

    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    setLoading(true);

    try {
      const response = await patientService.verifyOtp({
        otp: otpValue,
      });

      setSuccess("Verification successful! Logging you in...");

      try {
        const loginResponse = await AuthService.patientLogin({
          email,
          password: localStorage.getItem("tempPassword"),
        });

        localStorage.removeItem("tempPassword");

        if (loginResponse.data?.accessToken) {
          localStorage.setItem("accessToken", loginResponse.data.accessToken);
        }

        login(loginResponse.data.user || loginResponse.data);
        navigate("/patient/book-appointment");
      } catch (loginErr) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    setError("");
    setSuccess("OTP resent successfully!");

    try {
      await patientService.resendOtp({ email });
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#f0f7f9] to-[#e8f4f6]">
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#007a8a] hover:bg-[#005f6c] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <span className="material-symbols-outlined text-lg sm:text-xl">
          home
        </span>
      </button>
      <style>
        {`
                    .material-symbols-outlined {
                        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                    .clinical-gradient {
                        background: linear-gradient(135deg, #005f6c 0%, #007a8a 100%);
                    }
                `}
      </style>

      <main className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#007a8a]/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-[#007a8a]">
              mark_email_read
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-sm">
            We've sent a 5-digit OTP to
            <br />
            <span className="font-semibold text-[#007a8a]">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              {success}
            </p>
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
              Enter OTP
            </label>
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl font-bold bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#007a8a] focus:border-transparent transition-all"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full clinical-gradient text-white py-3 sm:py-4 px-6 rounded-lg font-bold text-sm sm:text-base shadow-lg shadow-[#007a8a]/20 hover:shadow-xl hover:shadow-[#007a8a]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">
                  progress_activity
                </span>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                Verify OTP
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              Didn't receive the OTP?
            </p>
            <button
              type="button"
              onClick={handleResend}
              className="text-[#007a8a] font-semibold hover:underline underline-offset-4 text-sm"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </main>

      <div className="fixed -bottom-32 -left-32 w-64 xl:w-96 h-64 xl:h-96 bg-[#007a8a]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed -top-32 -right-32 w-64 xl:w-96 h-64 xl:h-96 bg-[#1b4f72]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default VerifyOtp;
