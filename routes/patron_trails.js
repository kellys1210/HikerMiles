const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
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

module.exports = router;
