const mongoose = require("mongoose");
const formatDate = require("../api/dateFormatting");

const mySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Schema", mySchema, "mySchemas");
