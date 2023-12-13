const mainRoute = require("./src/routes/api/main");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const app = express();
const port = process.env.PORT || "8000";

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use(cors());

app.use("/api", mainRoute);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
