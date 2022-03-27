require("dotenv").config();
const express = require("express");
const app = express();
const { connctDb } = require("./config/mySQL");

// mySQL
connctDb();

// middleware
app.use(express.json());

// routes
app.use("/api", require("./apis/users"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
