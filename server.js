require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./routes/myRoutes");

const { PORT = 5000, MONGODB_USER, MONGODB_PASS, MONGODB_DB } = process.env;

const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.xuroh.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Handlebars Template Setup
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/routes", routes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(
  // process.env.PORT,
  PORT,
  console.log(`Server listening at http://localhost:${PORT}`)
);
