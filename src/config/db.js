const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumitted_db_user:Sumitarya08%23@cluster1.g1ucsib.mongodb.net/?appName=Cluster1",
    );

    console.log("Mongo DB Connected successfully");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
