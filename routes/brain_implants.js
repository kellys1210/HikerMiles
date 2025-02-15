const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT implant_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = BrainImplants.patron_id) AS patron_name, expiration_date, berserk_mode FROM BrainImplants;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the brain_implants.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("brain_implants", { data: rows });
  });
});

module.exports = router;
