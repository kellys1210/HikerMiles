const express = require("express");
const router = express.Router();
const db = require("../database/db-connector");

// SELECT
router.get("/", (req, res) => {
  // Define our query
  let select_table_query =
    "SELECT implant_id, (SELECT name FROM Patrons WHERE Patrons.patron_id = BrainImplants.patron_id) AS patron_name, expiration_date, (CASE WHEN berserk_mode = 1 THEN 'True' ELSE 'False' END) AS berserk_mode FROM BrainImplants;";

  let select_patrons_query =
    "SELECT patron_id, (SELECT name from Patrons WHERE  Patrons.patron_id = BrainImplants.patron_id) AS patron_name FROM BrainImplants;";

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

      res.render("brain_implants", {
        brain_implants: data_table,
        patrons: data_patrons,
      });
    });
  });
});

// // INSERT
// router.post("/", function (req, res) {
//   // Capture the incoming data and parse it back to a JS object
//   let data = req.body;

//   // Create the query and run it on the database
//   query1 = `INSERT INTO BrainImplants (name, expiration_date, berserk_mode) VALUES ('${data.name}', '${data.expiration_date}', '${data.berserk_mode}')`;
//   db.pool.query(query1, function (error, rows, fields) {
//     // Check to see if there was an error
//     if (error) {
//       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       // If there was no error, perform a SELECT * on BrainImplants
//       query2 = `SELECT * FROM BrainImplants;`;
//       db.pool.query(query2, function (error, rows, fields) {
//         // If there was an error on the second query, send a 400
//         if (error) {
//           // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//           console.log(error);
//           res.sendStatus(400);
//         }
//         // If all went well, send the results of the query back.
//         else {
//           res.send(rows);
//         }
//       });
//     }
//   });
// });

// // DELETE
// router.delete("/", function (req, res, next) {
//   let data = req.body;
//   console.log(`data after: ${JSON.stringify(data)}`);
//   let patronID = parseInt(data.id);
//   console.log(`implantID: ${implantID}`);
//   // let deletePatronTrails_Patron = `DELETE FROM PatronTrails WHERE patron_id = ${patronID}`;
//   let deleteBrainImplants_BrainImplant = `DELETE FROM BrainImplants WHERE implant_id = ${implantID}`;

//   // ***** This code below is from the Node setup guide, it said it is to delete a Patron from both tables? ************/
//   // Run the 1st query
//   // db.pool.query(
//   //   deletePatronTrails_Patron,
//   //   [patronID],
//   //   function (error, rows, fields) {
//   //     if (error) {
//   //       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//   //       console.log(error);
//   //       res.sendStatus(400);
//   //     } else {
//   // Run the second query
//   db.pool.query(
//     deleteBrainImplants_BrainImplant,
//     [implantID],
//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//         res.sendStatus(400);
//       } else {
//         res.sendStatus(204);
//       }
//     }
//   );
// });

module.exports = router;
