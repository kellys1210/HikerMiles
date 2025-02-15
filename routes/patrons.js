const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query = "SELECT * FROM Patrons;";

  // Execute the query
  db.pool.query(select_table_query, function (error, rows, fields) {
    // Reformats all dates to YYYY-MM-DD
    rows.forEach((row) => {
      row.date_of_birth = new Date(row.date_of_birth).toLocaleDateString(
        "en-CA"
      );
    });

    // Render the patrons.hbs file, and also send the renderer
    // an object where 'data' is equal to the 'rows' we
    // received back from the query

    res.render("patrons", { data: rows });
  });
});

// INSERT
router.post("/", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  insert_query = `INSERT INTO Patrons (name, date_of_birth, address) VALUES ('${data.name}', '${data.date_of_birth}', '${data.address}')`;
  db.pool.query(insert_query, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Patrons
      error_query = `SELECT * FROM Patrons;`;
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
  let query = 
    `UPDATE Patrons
      SET name = ?, 
      date_of_birth = ?, 
      address = ?
    WHERE patron_id = ?`;
  
  db.pool.query(query, [data.name, data.date_of_birth, data.address, data.patron_id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else {
      res.status(200).send("patron updated")
    }
  });
});

// DELETE
router.delete("/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let patronID = parseInt(data.id);
  console.log(`patronID: ${patronID}`);
  // let deletePatronTrails_Patron = `DELETE FROM PatronTrails WHERE patron_id = ${patronID}`;
  let delete_id_query = `DELETE FROM Patrons WHERE patron_id = ${patronID}`;

  // Run query
  db.pool.query(
    delete_id_query,
    [patronID],
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
