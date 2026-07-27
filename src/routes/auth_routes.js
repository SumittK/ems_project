const express = require("express");

const {
  register,
  users,
  login,
  refreshToken,
  logout,
  forgotPassword,
  setNewPassword,
} = require("../controller/authController");

const authMiddleWare = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.get("/getUserList", users);
router.post("/login", login);

router.post("/forgetPassword", forgotPassword);
router.post("/setNewPassword", setNewPassword);

router.get("/refreshToken", refreshToken);

router.get("/profile", authMiddleWare, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched",
  });
});

router.post("/logout", logout);

module.exports = router;
