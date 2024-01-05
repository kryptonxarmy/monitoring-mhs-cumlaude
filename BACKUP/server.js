const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
const port = 8081;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload)

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monitoring-cumlaude",
});

// Tes koneksi
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});