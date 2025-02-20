// Code for setting up routes, SQL queries, and dynamic data display adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT park_id, name, state, county, (CASE WHEN has_ranger_station = 1 THEN 'True' ELSE 'False' END) AS has_ranger_station FROM Parks;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Render the parks.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("parks", { data: rows });
  });
});

module.exports = router;

// INSERT
router.post("/", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  let insert_query = `INSERT INTO Parks (name, state, county, has_ranger_station) 
                      VALUES ('${data.name}', '${data.state}', '${data.county}', '${data.has_ranger_station}')`;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, return the updated table
      let select_query = `SELECT * FROM Parks;`;
      db.pool.query(select_query, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(rows);
        }
      });
    }
  });
});

// UPDATE
router.put("/", function (req, res) {
  let data = req.body;
  let query = `UPDATE Parks
      SET name = ?, 
      state = ?, 
      county = ?,
      has_ranger_station = ?
    WHERE park_id = ?`;

  db.pool.query(
    query,
    [data.name, data.state, data.county, data.has_ranger_station, data.park_id],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        res.status(200).send("parks updated");
      }
    }
  );
});

// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let id = parseInt(data.id);
  console.log(`parksID: ${id}`);
  let delete_id_query = `DELETE FROM Parks WHERE park_id = ${id}`;

  // Run the query
  db.pool.query(delete_id_query, [id], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
