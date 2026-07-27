const jwtToken = require("jsonwebtoken");

const generateaccessToken = (user) => {
  console.log(user);
  return jwtToken.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
};

const generaterefreshToken = (user) => {
  return jwtToken.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
  );
};

module.exports = {
  generateaccessToken,
  generaterefreshToken,
};
