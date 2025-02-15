const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT implant_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = BrainImplants.patron_id) AS patron_name, expiration_date, (CASE WHEN berserk_mode = 1 THEN 'True' ELSE 'False' END) AS berserk_mode FROM BrainImplants;";

  let select_patrons_query =
    "SELECT patron_id, (SELECT name from Patrons WHERE  Patrons.patron_id = BrainImplants.patron_id) AS patron_name FROM BrainImplants;"

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {

    // Save brain implants table  data
    data_table = rows;

    db.pool.query(select_patrons_query, function (error, rows, fields) {

      // Save patrons data
      data_patrons = rows;

      // Render the brain_implants.hbs file, and also send the renderer
      // an object where 'data' is equal to the 'rows' we
      // received back from the query

      res.render("brain_implants", { brain_implants: data_table, patrons: data_patrons });
    });
  });
});

module.exports = router;
