const express = require("express");
const app = express();

//import routes
const authRoute = require("./routes/auth");

//env variables
const dotenv = require("dotenv");
dotenv.config();

//mogodb connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("successfully connected to the database");
});

// Route middlewares

app.use("/api/user", authRoute);
app.use(express.json());
app.listen(1001, () => {
  console.log("Server is running on port 1001");
});
