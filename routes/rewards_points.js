const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT reward_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = RewardsPoints.patron_id) AS patron_name, reward FROM RewardsPoints;";

  let select_patrons_query =
    "SELECT patron_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = RewardsPoints.patron_id) AS patron_name, FROM RewardsPoints"
  // Execute the query for table
  db.pool.query(select_table_query, function (error, rows, fields) {

    // Save table query
    let  data_table = rows;

    // Execture  query  for patrons
    db.pool.query(select_patrons_query, function (error, patrons, fields) {

      // Save patrons
      let data_patrons  = rows;

      // Render the rewards_points.hbs file, and also send the renderer
      // an object where 'data' is equal to the 'rows' we
      // received back from the query

      res.render("rewards_points", { rewards_points: data_table, patrons: data_patrons });
    });
  });
});


module.exports = router;
