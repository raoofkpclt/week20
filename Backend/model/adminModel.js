const mongoose = require("mongoose");

const adminSheema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModal = mongoose.model("admin", adminSheema);

module.exports = adminModal;
