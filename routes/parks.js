const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
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

module.exports = router;
