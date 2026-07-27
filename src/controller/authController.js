const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/mail_service");
const db = require("../config/sql_db");
let userName = "";
const {
  generateaccessToken,
  generaterefreshToken,
} = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "name fields is required",
    });
  } else if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  } else if (!password) {
    return res.status(400).json({
      success: false,
      message: "password is required",
    });
  } else if (!mobile) {
    return res.status(400).json({
      success: false,
      message: "mobile is required",
    });
  }

   const existingUser = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);
  //const sql = "INSERT INTO users(name,email,password,mobile) VALUES(?,?,?,?)";

    if(existingUser !=  null){
     return res.status(500).json({
        status: false,
        message: "User Already exist",
        errMsg: err.toString(),
      });
    }

     sendEmail({ receiverEmail: email });

    return res.status(200).json({
      status: true,
      message: "User Registerd successfully",
      user: {
        id: result.insertId,
        name,
        email,
        mobile,
      },
    });

  // db.query(sql, [name, email, hashedPassword, mobile], (err, result) => {
  //   if (err) {
  //     return res.status(500).json({
  //       status: false,
  //       message: "User Already exist",
  //       errMsg: err.toString(),
  //     });
  //   }
  //   sendEmail({ receiverEmail: email });

  //   return res.status(200).json({
  //     status: true,
  //     message: "User Registerd successfully",
  //     user: {
  //       id: result.insertId,
  //       name,
  //       email,
  //       mobile,
  //     },
  //   });
  // });
  // sendEmail({ receiverEmail: email });

  // if (existingUser) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "User is already registerd.Try Login",
  //   });
  // }

  // const user = await User.create({
  //   name,
  //   mobile: `+91${mobile}`,
  //   email,
  //   password: hashedPassword,
  // });

  // res.status(201).json({
  //   status: true,
  //   user,
  // });
};

const users = async (req, res) => {
  try {
    const allUsers = await User.find(); // returns whole list of users

    res.status(200).json({
      status: true,
      userLength: allUsers.length,
      allUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No User Found",
    });
  }
};

const login = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const existUser = await User.findOne({ email }); // returns single  user object

    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    console.log(existUser);

    const accessToken = generateaccessToken(existUser);
    const refreshToken = generaterefreshToken(existUser);

    existUser.refreshToken = refreshToken;
    await existUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      user: existUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({
        message: "No Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const mailId = decoded.email;
    const user = await User.findOne({ email: mailId });

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateaccessToken(user);

    res.json({
      accessToken,
    });
  } catch (err) {
    res.status(403).json({
      message: "Token Expired",
    });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  const user = await User.findOne({ refreshToken: token });
  userName = user.name;
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken");
  await User.deleteMany({ role: "user" });
  await sendEmail();

  res.json({
    message: "Logged Out",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).json({
      message: "User Not Found",
    });
  }

  const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetURl = `http://localhost:5173/reset-password/${refreshToken}`;
  await sendEmail({
    receiverEmail: user.email,
    mailContent: `Click on this link to reset your password\n ${resetURl}`,
  });

  return res.status(200).json({
    succcess: true,
    message: "An email with reset password link has been sent to your email Id",
  });
};

const setNewPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SERET);

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashPassword;

  await user.save();

  res.status(200).json({
    status: true,
    message: "Password successfully updated",
  });
};

module.exports = {
  register,
  users,
  login,
  refreshToken,
  logout,
  forgotPassword,
  setNewPassword,
};
