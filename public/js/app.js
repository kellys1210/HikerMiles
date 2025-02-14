// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// EXPRESS SETUP:
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 65009;

// HANDLEBARS SETUP:
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// DATABASE:
const db = require("../../database/db-connector");

// ROUTES:

// PAGE RENDER ROUTES:  ***** EVENTUALLY THE ENTITY SPECIFIC ROUTES WILL BE COMBINED WITH QUERIES LIKE SEEN BELOW IN PATRONS. 
// These are to allow pages to render for now.
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/brain_implants", (req, res) => {
  res.render("brain_implants");
});

app.get("/parks", (req, res) => {
  res.render("parks");
});

app.get("/patron_parks", (req, res) => {
  res.render("patron_parks");
});

app.get("/patron_trails", (req, res) => {
  res.render("patron_trails");
});

app.get("/rewards_points", (req, res) => {
  res.render("rewards_points");
});

app.get("/trails", (req, res) => {
  res.render("trails");
});


// QUERIES:

// PATRONS:

// SELECT
app.get("/patrons", function (req, res) {
  let query1 = "SELECT * FROM Patrons;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render("patrons", { data: rows }); // Render the patrons.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
}); // received back from the query

// INSERT
app.post("/add-patron", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Capture NULL values - this only applies to ints, commented this out to use later when needed
  // let address = parseInt(data.address);
  // if (isNaN(address)) {
  //   address = "NULL";
  // }

  // Create the query and run it on the database
  query1 = `INSERT INTO Patrons (name, date_of_birth, address) VALUES ('${data.name}', '${data.date_of_birth}', '${data.address}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Patrons
      query2 = `SELECT * FROM Patrons;`;
      db.pool.query(query2, function (error, rows, fields) {
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
app.delete("/delete-patron/", function (req, res, next) {
  let data = req.body;
  console.log(`data after: ${JSON.stringify(data)}`);
  let patronID = parseInt(data.id);
  console.log(`patronID: ${patronID}`);
  // let deletePatronTrails_Patron = `DELETE FROM PatronTrails WHERE patron_id = ${patronID}`;
  let deletePatrons_Patron = `DELETE FROM Patrons WHERE patron_id = ${patronID}`;

  // ***** This code below is from the Node setup guide, it said it is to delete a Patron from both tables? ************/
  // Run the 1st query
  // db.pool.query(
  //   deletePatronTrails_Patron,
  //   [patronID],
  //   function (error, rows, fields) {
  //     if (error) {
  //       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
  //       console.log(error);
  //       res.sendStatus(400);
  //     } else {
  // Run the second query
  db.pool.query(
    deletePatrons_Patron,
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

// LISTENER:
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
