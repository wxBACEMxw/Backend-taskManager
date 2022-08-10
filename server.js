const express = require("express");
const connectDb = require("./config/connectDb");
const authRoute = require("./routes/auth");
const commentRoute = require("./routes/comment");
const tacheRoute = require("./routes/tache");
require("dotenv").config();
const app = express();
app.use(express.json());

connectDb();

app.use("/api/user", authRoute);
app.use("/api/tache", tacheRoute);
app.use("/api/comment", commentRoute);

app.listen(process.env.port, () =>
  console.log(`server is running on port :${process.env.port}`)
);
