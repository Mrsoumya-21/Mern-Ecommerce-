import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import CommonForm from "@/components/common/form";
import logo from "@/assets/logo192.png";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(registerUser(formData)).then((data) => {
      setLoading(false);
      if (data?.payload?.success && data?.payload?.userId) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/verify-otp", {
          state: { userId: data?.payload?.userId, context: "register" },
        });
      } else if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
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
          <h1 className="text-4xl font-extrabold text-[#443C68] mb-2 tracking-tight drop-shadow-lg">
            Create Your Account
          </h1>
          <p className="text-[#635985] text-base font-medium text-center">
            Join ShopEase and start your shopping journey!
          </p>
        </div>

        <CommonForm
          formControls={registerFormControls}
          buttonText={loading ? "Sending OTP..." : "Get OTP"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isBtnDisabled={loading}
        />

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-[#635985] text-sm">
            Already have an account?
          </span>
          <Link
            className="inline-block font-semibold text-[#443C68] hover:text-[#D0BFFF] transition-colors duration-200"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
        <div className="mt-8 text-center">
          <span className="text-xs text-[#635985]">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
