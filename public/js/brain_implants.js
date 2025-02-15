// // Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// // Get the objects we need to modify
// let addBrainImplantForm = document.getElementById("add-brain-implant-form");

// // Modify the objects we need
// addBrainImplantForm.addEventListener("submit", function (e) {
//   // Prevent the form from submitting
//   e.preventDefault();

//   // Get form fields we need to get data from
//   let inputName = document.getElementById("input-patron");
//   let inputExpirationDate = document.getElementById("input-expiration-date");
//   let inputBerserkMode = document.getElementById("input-berserk-mode");

//   // Get the values from the form fields
//   let nameValue = inputName.value;
//   let expirationDateValue = inputExpirationDate.value;
//   let berserkModeValue = inputBerserkMode.value;

//   console.log(`name: ${nameValue}, dob: ${expirationDateValue}, add: ${berserkModeValue}
//   `);

//   // Put our data we want to send in a javascript object
//   let data = {
//     name: nameValue,
//     expiration_date: expirationDateValue,
//     berserk_mode: berserkModeValue,
//   };

//   // Setup our AJAX request
//   var xhttp = new XMLHttpRequest();
//   xhttp.open("POST", "/brain_implants", true);
//   xhttp.setRequestHeader("Content-type", "application/json");

//   // Tell our AJAX request how to resolve
//   xhttp.onreadystatechange = () => {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//       // Add the new data to the table
//       addRowToTable(xhttp.response);

//       // Clear the input fields for another transaction
//       inputName.value = "";
//       inputExpirationDate.value = "";
//       inputBerserkMode.value = "";
//     } else if (xhttp.readyState == 4 && xhttp.status != 200) {
//       console.log("There was an error with the input.");
//     }
//   };

//   // Send the request and wait for the response
//   xhttp.send(JSON.stringify(data));
// });

// // Creates a single row from an Object representing a single record from
// // Patrons
// addRowToTable = (data) => {
//   // Get a reference to the current table on the page and clear it out.
//   let currentTable = document.getElementById("brain-implants-table");

//   // Get the location where we should insert the new row (end of table)
//   let newRowIndex = currentTable.rows.length;

//   // Get a reference to the new row from the database query (last object)
//   let parsedData = JSON.parse(data);
//   let newRow = parsedData[parsedData.length - 1];

//   // Formats date to YYYY/MM/DD
//   const formattedDate = new Date(newRow.expiration_date).toLocaleDateString(
//     "en-CA"
//   );

//   // Create a row and 4 cells
//   let row = document.createElement("TR");
//   let idCell = document.createElement("TD");
//   let nameCell = document.createElement("TD");
//   let expirationDateCell = document.createElement("TD");
//   let berserkModeCell = document.createElement("TD");
//   let deleteCell = document.createElement("TD");

//   // Fill the cells with correct data
//   idCell.innerText = newRow.implant_id;
//   nameCell.innerText = newRow.name;
//   expirationDateCell.innerText = formattedDate;
//   berserkModeCell.innerText = newRow.berserk_mode;

//   deleteCell = document.createElement("button");
//   deleteCell.innerHTML = "Delete";
//   deleteCell.onclick = function () {
//     deletePatron(newRow.implant_id);
//   };

//   // Add the cells to the row
//   row.appendChild(idCell);
//   row.appendChild(nameCell);
//   row.appendChild(expirationDateCell);
//   row.appendChild(berserkModeCell);
//   row.appendChild(deleteCell);

//   // Add a row attribute so the deleteRow function can find a newly added row
//   row.setAttribute("data-value", newRow.implant_id);

//   // Add the row to the table
//   currentTable.appendChild(row);
// };

// function deleteBrainImplant(implantID) {
//   let link = "/brain_implants";
//   let data = {
//     id: implantID,
//   };

//   console.log(`data before: ${JSON.stringify(data)}`);

//   $.ajax({
//     url: link,
//     type: "DELETE",
//     data: JSON.stringify(data),
//     contentType: "application/json; charset=utf-8",
//     success: function (result) {
//       deleteRow(implantID);
//     },
//   });
// }

// function deleteRow(implantID) {
//   let table = document.getElementById("brain-implants-table");
//   for (let i = 0, row; (row = table.rows[i]); i++) {
//     if (table.rows[i].getAttribute("data-value") == implantID) {
//       table.deleteRow(i);
//       break;
//     }
//   }
// }
