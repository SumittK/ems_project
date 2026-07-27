const mongoose = require("mongoose");

const userInfo = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);
