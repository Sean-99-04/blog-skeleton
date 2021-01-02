const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./routes/myRoutes");

// Mongoose
// Production
// const URI = "mongodb+srv://Sean:"+process.env.MONGODB_PASS+"@cluster0.xuroh.mongodb.net/Articles?retryWrites=true&w=majority";
// Development
// const URI = "mongodb+srv://Sean:m0ngoPass@cluster0.xuroh.mongodb.net/Articles?retryWrites=true&w=majority";
// const URI = "mongodb://localhost/dev";
const URI = "mongodb://127.0.0.1:27017/blog-1";
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
  process.env.PORT || 5000,
  console.log("Server listening at http://localhost:5000")
);
