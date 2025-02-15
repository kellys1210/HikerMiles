// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// EXPRESS SETUP:
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 65009;

// ROUTE IMPORTS:
const brainImplantsRoute = require("./routes/brain_implants");
const patronsRoute = require("./routes/patrons");
const parksRoute = require("./routes/parks");
const patronParksRoute = require("./routes/patron_parks");
const patronTrailsRoute = require("./routes/patron_trails");
const rewardsPointsRoute = require("./routes/rewards_points");
const trailsRoute = require("./routes/trails");

// HANDLEBARS SETUP:
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// DATABASE:
const db = require("./database/db-connector");

// RENDER HOME PAGE
app.get("/", (req, res) => {
  res.render("index");
});

// ROUTES
app.use("/brain_implants", brainImplantsRoute);
app.use("/patrons", patronsRoute);
app.use("/parks", parksRoute);
app.use("/patron_parks", patronParksRoute);
app.use("/patron_trails", patronTrailsRoute);
app.use("/rewards_points", rewardsPointsRoute);
app.use("/trails", trailsRoute);

// LISTENER:
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
