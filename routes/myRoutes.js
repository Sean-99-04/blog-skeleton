const express = require("express");
const router = express.Router();
const Model = require("./../models/myModel");
const formatDate = require("../api/dateFormatting");

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/form", (req, res) => {
  const model = new Model({
    author: req.body.author,
    age: req.body.age,
  });
  console.log(model);
  res.redirect(`/routes/${model.author}/${model.age}`);
});

router.get("/:author/:age", (req, res) => {
  const obj = {
    author: req.params.author,
    age: req.params.age,
    createdAt: formatDate(new Date()),
  };
  console.log(new Date());
  console.log(obj);
  res.render("data", { obj });
});

module.exports = router;
