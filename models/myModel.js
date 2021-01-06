const mongoose = require("mongoose");
const formatDate = require("../api/dateFormatting");

const mySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Schema", mySchema, "mySchemas");
