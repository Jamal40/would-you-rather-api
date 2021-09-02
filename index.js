const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//import routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const questionRoute = require("./routes/questions");
const answersRoute = require("./routes/answer");
//env variables
const dotenv = require("dotenv");
dotenv.config();

//mogodb connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_CONNECT, () => {
    console.log("successfully connected to the database");
  })
  .then(() => console.log("ggg"))
  .catch((error) => console.log(error));

// Route middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/questions", questionRoute);
app.use("/api/answers", answersRoute);
app.listen(1001, () => {
  console.log("Server is running on port 1001");
});
