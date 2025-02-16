const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronParks.patron_id) AS patron_name, (SELECT name FROM Parks WHERE Parks.park_id = PatronParks.park_id) AS park_name,  visit_count  FROM PatronParks;";

  let select_patrons_query =
    "SELECT patron_id, name AS patron_name FROM Patrons";

  let select_parks_query = "SELECT park_id, name AS park_name FROM Parks";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    //  Save table query
    data_table = rows;

    db.pool.query(select_patrons_query, function (error, rows, fields) {
      // Save patrons query
      data_patrons = rows;

      db.pool.query(select_parks_query, function (error, rows, fields) {
        if (error) {
          console.error("Error executing select_parks_query:", error);
          return res.status(500).send("Database error: Duplicate ID chosen");
        }

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

// INSERT
router.post("/", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  insert_query = `INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES ('${data.patron_id}', '${data.park_id}', '${data.visit_count}')`;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.status(400).json({
        error:
          "ERROR: Please select a park that has not been previously visited by this patron. If you wish to increase or decrease the patron's visit count number to the selected park, please edit the existing visit park record instead.",
      });
    } else {
      // If there was no error, perform a SELECT * on Patrons
      error_query = `SELECT * FROM PatronParks;`;
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
  let patronName = data.patron_name;
  let parkName = data.park_name;
  console.log(`patronID: ${patronName}, parkID: ${parkName}`);
  let delete_id_query = `DELETE FROM PatronParks WHERE patron_id = (SELECT patron_id FROM Patrons where name = '${patronName}') AND park_id = (SELECT park_id FROM Parks WHERE name = '${parkName}')`;

  // Run query
  db.pool.query(
    delete_id_query,
    [patronName, parkName],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// These were the original queries in SELECT (from PatronTrails, forgot to save these ones first), saving them here if needed later:

// let select_table_query =
// "SELECT (SELECT name FROM  Patrons WHERE Patrons.patron_id = PatronTrails.patron_id) AS patron_name, (SELECT name FROM Trails WHERE Trails.trail_id = PatronTrails.trail_id) AS trail_name,  hike_count  FROM PatronTrails;";

// let select_patrons_query =
// "SELECT patron_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = PatronTrails.patron_id) AS patron_name FROM PatronTrails GROUP BY patron_name";

// let select_trails_query =
// "SELECT trail_id, (SELECT name FROM Trails WHERE Trails.trail_id = PatronTrails.trail_id) AS trail_name FROM PatronTrails GROUP BY trail_name";

module.exports = router;
