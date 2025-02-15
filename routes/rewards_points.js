const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
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

module.exports = router;
