// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// EXPRESS SETUP:
const express = require("express");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 65000;

// HANDLEBARS SETUP:
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// DATABASE:
const db = require("../../database/db-connector");

// ROUTES:
app.get("/", function (req, res) {
  let query1 = "SELECT * FROM Patrons;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render("index", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows' we
}); // received back from the query

// LISTENER:

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
