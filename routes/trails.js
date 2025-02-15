const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
  let select_table_query =
    "SELECT trail_id, (SELECT name FROM Parks WHERE Parks.park_id = Trails.park_id) AS park_name, name, latitude, longitude, length FROM Trails;";

  let select_parks_query =
    "SELECT park_id, (SELECT name from Parks WHERE  Parks.park_id = Trails.park_id) AS park_name FROM Trails;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Save trails table  data
    data_table = rows;

    db.pool.query(select_parks_query, function (error, rows, fields) {
      // Save parks data
      data_parks = rows;

      // Render the trails.hbs file, and also send the renderer
      // an object where 'data' is equal to the 'rows' we
      // received back from the query

      res.render("trails", { trails: data_table, parks: data_parks });
    });
  });
});

module.exports = router;
