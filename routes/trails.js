const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

router.get("/", (req, res) => {
  let select_table_query =
    "SELECT trail_id, (SELECT name FROM Parks WHERE Parks.park_id = Trails.park_id) AS park_name, name, latitude, longitude, length FROM Trails;";

  let select_parks_query =
    "SELECT park_id, name AS park_name FROM Parks;";

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

// INSERT
router.post("/", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  let insert_query = `INSERT INTO Trails (park_id, name, latitude, longitude, length) 
                VALUES ('${data.park_id}', '${data.name}', '${data.latitude}', '${data.longitude}', '${data.length}')`;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, return the newly inserted trail
      let error_query = `SELECT * FROM Trails;`;
      db.pool.query(error_query, function (error, rows, fields) {
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
  let query = 
    `UPDATE Trails
      SET 
      park_id = (SELECT park_id FROM Parks WHERE name = ?), 
      name = ?, 
      latitude = ?,
      longitude = ?,
      length = ?
    WHERE trail_id = ?`;
  
  db.pool.query(query, [data.park_name, data.name, data.latitude, data.longitude, data.length, data.trail_id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else {
      res.status(200).send("trail updated")
    }
  });
});


// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let id = parseInt(data.id);
  console.log(`trailsID: ${id}`);
  let delete_id_query = `DELETE FROM Trails WHERE trail_id = ${id}`;

  // Run the query
  db.pool.query(
    delete_id_query,
    [id],
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
