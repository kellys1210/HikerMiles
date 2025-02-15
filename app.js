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

<<<<<<< Updated upstream
app.get("/parks", (req, res) => {
  // Define our query
  let select_table_query = "SELECT * FROM Parks;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the parks.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("parks", { data: rows });
  });
});

app.get("/patron_parks", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronParks.patron_id) AS patron_name, (SELECT name FROM Parks WHERE Parks.park_id = PatronParks.park_id) AS park_name,  visit_count  FROM PatronParks;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the patron_parks.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("patron_parks", { data: rows });
  });
});

app.get("/patron_trails", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronTrails.patron_id) AS patron_name, (SELECT name FROM Trails WHERE Trails.trail_id = PatronTrails.trail_id) AS trail_name,  hike_count  FROM PatronTrails;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the patron_trails.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("patron_trails", { data: rows });
  });
});

app.get("/rewards_points", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT reward_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = RewardsPoints.patron_id) AS patron_name, reward FROM RewardsPoints;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the rewards_points.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("rewards_points", { data: rows });
  });
});

app.get("/trails", (req, res) => {
  // Define our query
  let select_table_query = "SELECT * FROM Trails;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the trails.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("trails", { data: rows });
  });
});

=======
>>>>>>> Stashed changes
// LISTENER:
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
