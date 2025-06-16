import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/logo192.png";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId, context } = location.state || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!userId || !context) {
      navigate("/auth/login");
    }
    // Focus the first input on mount
    inputRefs.current[0]?.focus();
  }, [userId, context, navigate]);

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Handle OTP input change and auto-move
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      setOtp((prev) => {
        const arr = [...prev];
        arr[idx] = "";
        return arr;
      });
      return;
    }
    setOtp((prev) => {
      const arr = [...prev];
      arr[idx] = value[0];
      return arr;
    });
    // Move to next input if not last and value entered
    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  async function handleVerifyOTP(e) {
    e.preventDefault();
    setLoading(true);
    const endpoint =
      context === "register"
        ? "http://localhost:5000/api/auth/register-verify-otp"
        : "http://localhost:5000/api/auth/login-verify-otp";
    let data;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp: otp.join("") }),
        credentials: "include",
      });
      data = await res.json();
    } catch {
      data = { success: false, message: "Server error or invalid response" };
    }
    setLoading(false);
    if (data.success && context === "register") {
      toast({ title: data.message });
      navigate("/auth/login");
    } else if (data.success && context === "login") {
      toast({ title: data.message });
      navigate("/");
    } else {
      toast({ title: data.message, variant: "destructive" });
    }
  }

  // RESEND OTP FEATURE
  async function handleResendOTP() {
    setResendLoading(true);
    let endpoint =
      context === "register"
        ? "http://localhost:5000/api/auth/register-resend-otp"
        : "http://localhost:5000/api/auth/login-resend-otp";
    let data;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      data = await res.json();
    } catch {
      data = { success: false, message: "Failed to resend OTP" };
    }
    setResendLoading(false);
    if (data.success) {
      toast({ title: "OTP resent successfully!" });
      setCooldown(30); // 30 seconds cooldown
    } else {
      toast({ title: data.message, variant: "destructive" });
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#635985] to-[#D0BFFF] overflow-hidden font-sans">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#D0BFFF]/30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#635985]/30 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-[#443C68]/10 rounded-full blur-2xl z-0" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-12 flex flex-col justify-center mx-4">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-full shadow-lg border-4 border-[#635985] bg-white mb-4"
          />
          <h2 className="text-3xl font-extrabold text-[#443C68] mb-2 tracking-tight drop-shadow-lg">
            Verify OTP
          </h2>
          <p className="text-[#635985] text-base font-medium text-center">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <form
          onSubmit={handleVerifyOTP}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex justify-center gap-3 mb-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-14 text-2xl text-center border-2 border-[#635985] rounded-lg focus:outline-none focus:border-[#443C68] bg-white shadow transition"
                disabled={loading}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#443C68] text-white rounded-lg font-semibold text-lg shadow hover:bg-[#635985] transition"
            disabled={loading || otp.some((d) => d === "")}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <button
            type="button"
            className="text-[#443C68] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleResendOTP}
            disabled={resendLoading || cooldown > 0}
          >
            {resendLoading
              ? "Resending..."
              : cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
