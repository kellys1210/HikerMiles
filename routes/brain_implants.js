const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT implant_id, COALESCE((SELECT name FROM Patrons WHERE Patrons.patron_id = BrainImplants.patron_id), 'N/A') AS patron_name, DATE_FORMAT(expiration_date, '%Y-%m-%d') as expiration_date, (CASE WHEN berserk_mode = 1 THEN 'True' ELSE 'False' END) AS berserk_mode FROM BrainImplants;";

  let select_patrons_query =
    "SELECT patron_id, name AS patron_name FROM Patrons";
  // Execute the query for table
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Save table query
    let data_table = rows;

    // Execute query for patrons
    db.pool.query(select_patrons_query, function (error, rows, fields) {
      // Save patrons
      let data_patrons = rows;

      // Render the rewards_points.hbs file, and also send the renderer
      // an object where 'data' is equal to the 'rows' we
      // received back from the query

      res.render("brain_implants", {
        brain_implants: data_table,
        patrons: data_patrons,
      });
    });
  });
});

// INSERT
router.post("/", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  insert_query = `INSERT INTO BrainImplants (patron_id, expiration_date, berserk_mode) VALUES (${data.patron_id}, '${data.expiration_date}', ${data.berserk_mode})`;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.status(400).json({
        error:
          "ERROR: Please select a patron that has not already been implanted. If you wish to edit the selected patron's implant record, please use the option to edit the existing implant record instead.",
      });
    } else {
      // If there was no error, perform a SELECT * on BrainImplants
      error_query = `SELECT * FROM BrainImplants;`;
      db.pool.query(error_query, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let implantID = parseInt(data.id);
  console.log(`implantID: ${implantID}`);
  let delete_id_query = `DELETE FROM BrainImplants WHERE implant_id = ${implantID}`;

  // Run query
  db.pool.query(delete_id_query, [implantID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
