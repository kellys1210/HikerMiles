const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronParks.patron_id) AS patron_name, (SELECT name FROM Parks WHERE Parks.park_id = PatronParks.park_id) AS park_name,  visit_count  FROM PatronParks;";

  let select_patrons_query =
    "SELECT patron_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = PatronParks.patron_id) AS patron_name FROM PatronParks GROUP BY patron_name";

  let select_parks_query =
    "SELECT park_id, (SELECT name FROM Parks WHERE Parks.park_id = PatronParks.park_id) AS park_name FROM PatronParks GROUP BY park_name";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    //  Save table query
    data_table = rows;

    db.pool.query(select_patrons_query, function (error, rows, fields) {
      // Save patrons query
      data_patrons = rows;

      db.pool.query(select_parks_query, function (error, rows, fields) {
        // Save parks query
        data_parks = rows;

        // Render the patron_parks.hbs file, and also send the renderer
        // an object where 'data' is equal to the 'rows' we
        // received back from the query

        res.render("patron_parks", {
          patron_parks: data_table,
          patrons: data_patrons,
          parks: data_parks,
        });
      });
    });
  });
});

module.exports = router;
