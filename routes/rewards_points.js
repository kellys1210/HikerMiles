// Code for setting up routes, SQL queries, and dynamic data display adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT reward_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = RewardsPoints.patron_id) AS patron_name, reward FROM RewardsPoints;";

  let select_patrons_query =
    "SELECT patron_id, name AS patron_name FROM Patrons";
  // Execute the query for table
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Save table query
    let data_table = rows;

    // Execture  query  for patrons
    db.pool.query(select_patrons_query, function (error, rows, fields) {
      // Save patrons
      let data_patrons = rows;

      // Render the rewards_points.hbs file, and also send the renderer
      // an object where 'data' is equal to the 'rows' we
      // received back from the query

      res.render("rewards_points", {
        rewards_points: data_table,
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
  insert_query = `INSERT INTO RewardsPoints (patron_id, reward) VALUES ('${data.patron_id}', '${data.reward}')`;

  console.log(`Attempting to query: ${insert_query}`);

  db.pool.query(insert_query, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Patrons
      error_query = `SELECT * FROM RewardsPoints;`;
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
    UPDATE RewardsPoints
    SET patron_id = (SELECT patron_id FROM Patrons WHERE name = ?), 
      reward = ?
    WHERE reward_id = ?
  `;

  db.pool.query(
    query,
    [data.name, data.reward, data.reward_id],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      } else {
        res.status(200).send("reward updated");
      }
    }
  );
});

// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let rewardID = parseInt(data.id);
  console.log(`rewardID: ${rewardID}`);
  let delete_id_query = `DELETE FROM RewardsPoints WHERE reward_id = ${rewardID}`;

  // Run query
  db.pool.query(delete_id_query, [rewardID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
