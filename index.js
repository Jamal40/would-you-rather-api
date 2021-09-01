const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//import routes
const authRoute = require("./routes/auth");

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

app.listen(1001, () => {
  console.log("Server is running on port 1001");
});
