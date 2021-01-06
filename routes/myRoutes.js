require("dotenv").config();
const express = require("express");
const router = express.Router();
const Model = require("./../models/myModel");
const formatDate = require("../api/dateFormatting");

const { PROD } = process.env;

router.get("/", (req, res) => {
  console.log(PROD);
  res.render("home", { header: "Home" });
});

router.get("/form", (req, res) => {
  res.render("form", { header: "Form" });
});

router.post("/form", (req, res) => {
  const { name, email } = req.body;
  const model = new Model({
    name,
    email,
  });
  if (!PROD) {
    console.log(model);
  } else if (PROD) {
    model
      .save()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  res.redirect(`/${model.name}/${model.email}`);
});

router.get("/:name/:email", (req, res) => {
  let { name, email } = req.params;
  const obj = [
    {
      name,
      email,
      subDate: formatDate(new Date()),
    },
  ];
  // console.log(obj);
  res.render("home", { obj: obj, header: "Home" });
});

module.exports = router;
