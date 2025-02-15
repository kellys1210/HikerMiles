const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
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

module.exports = router;
