const express = require("express");
const {
  registerUser,
  verifyRegisterOTP,
  loginUser,
  verifyLoginOTP,
  logoutUser,
  authMiddleware,
  resendRegisterOTP, // Add this line
  resendLoginOTP, // Add this line
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/register-verify-otp", verifyRegisterOTP);
router.post("/login", loginUser);
router.post("/login-verify-otp", verifyLoginOTP);
router.post("/logout", logoutUser);

// --- Add these routes for Resend OTP ---
router.post("/register-resend-otp", resendRegisterOTP);
router.post("/login-resend-otp", resendLoginOTP);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
