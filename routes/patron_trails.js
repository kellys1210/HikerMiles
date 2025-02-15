const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronTrails.patron_id) AS patron_name, (SELECT name FROM Trails WHERE Trails.trail_id = PatronTrails.trail_id) AS trail_name,  hike_count  FROM PatronTrails;";

  let select_patrons_query =
    "SELECT patron_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = PatronTrails.patron_id) AS patron_name FROM PatronTrails"

  let select_trails_query =
    "SELECT trail_id, (SELECT name FROM Trails WHERE Trails.trail_id = PatronTrails.trail_id) AS trail_name FROM PatronTrails"

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {

    //  Save table query
    data_table = rows;

    db.pool.query(select_patrons_query, function(error, rows, fields) {

      // Save patrons query
      data_patrons = rows;

      db.pool.query(select_trails_query, function (error, rows, fields) {
        // Save parks query
        data_trails = rows;

        // Render the patron_trails.hbs file, and also send the renderer
        // an object where 'data' is equal to the 'rows' we
        // received back from the query

        res.render("patron_trails", { patron_trails: data_table, patrons: data_patrons, trails: data_trails });
      });
    });
  });
});

module.exports = router;
