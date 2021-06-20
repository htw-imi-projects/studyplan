const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./routes/index");

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/studyplan";

mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public")); //In order to use static file

app.use(cors());

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs"); //To use EJS

// const userController = require("./controller/userController.js"),

app.use("/", router);
// router.get("/users", userController.index); //shows you a table of everyone who signed up to be a user ... do we have any?

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
