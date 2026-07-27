require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth_routes");

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth server is running at http://localhost:${PORT}`);
});
