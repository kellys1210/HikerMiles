// Code for setting up routes, SQL queries, and dynamic data display adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =`
    SELECT p.name AS patron_name, t.name AS trail_name, pt.hike_count
    FROM PatronTrails pt
    JOIN Patrons p ON pt.patron_id = p.patron_id
    JOIN Trails t ON pt.trail_id = t.trail_id;
  `;

  let select_patrons_query =
    "SELECT patron_id, name AS patron_name FROM Patrons";

  let select_trails_query = "SELECT trail_id, name AS trail_name FROM Trails";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    //  Save table query
    data_table = rows;

    db.pool.query(select_patrons_query, function (error, rows, fields) {
      // Save patrons query
      data_patrons = rows;

      db.pool.query(select_trails_query, function (error, rows, fields) {
        // Save trails query
        data_trails = rows;

        // Render the patron_trails.hbs file, and also send the renderer
        // an object where 'data' is equal to the 'rows' we
        // received back from the query

        res.render("patron_trails", {
          patron_trails: data_table,
          patrons: data_patrons,
          trails: data_trails,
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
  insert_query = `
    INSERT INTO PatronTrails (patron_id, trail_id, hike_count)
    VALUES ('${data.patron_id}', '${data.trail_id}', '${data.hike_count}')
  `;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.status(400).json({
        error:
          "ERROR: Please select a trail that has not been previously visited by this patron. If you wish to increase or decrease this patron's hike count number on the selected trail, please edit the existing trail hike record instead.",
      });
    } else {
      // If there was no error, perform a SELECT * on Patrons
      error_query = `SELECT * FROM PatronTrails;`;
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

// UPDATE
router.put("/", function (req, res) {
  let data = req.body;
  let query = `
    UPDATE PatronTrails pt
    JOIN Patrons p ON pt.patron_id = p.patron_id
    JOIN Trails t ON pt.trail_id = t.trail_id
    SET pt.hike_count = ?
    WHERE p.name = ?
    AND t.name = ?;
  `;

  db.pool.query(
    query,
    [data.hike, data.name, data.trail],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        res.status(200).send("patrontrail updated");
      }
    }
  );
});


// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  let patronName = data.patron_name;
  let trailName = data.trail_name;
  console.log(`patronID: ${patronName}, trailID: ${trailName}`);
  let delete_id_query = `
    DELETE pt FROM PatronTrails pt
    JOIN Patrons p ON pt.patron_id = p.patron_id
    JOIN Trails t ON pt.trail_id = t.trail_id
    WHERE p.name = ?
    AND t.name = ?;
  `;

  // Run query
  db.pool.query(
    delete_id_query,
    [patronName, trailName],
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

module.exports = router;