require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoDBConfig = require("./config/db");


const app = express();

mongoDBConfig();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// routes
app.use("/api", require("./routes/index"));

// server configurations.
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
