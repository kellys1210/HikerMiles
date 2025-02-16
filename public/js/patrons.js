// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addPatronForm = document.getElementById("add-patron-form");

// Modify the objects we need
addPatronForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputName = document.getElementById("input-name");
  let inputDateOfBirth = document.getElementById("input-dateofbirth");
  let inputAddress = document.getElementById("input-address");

  // Get the values from the form fields
  let nameValue = inputName.value;
  let dateOfBirthValue = inputDateOfBirth.value;
  let addressValue = inputAddress.value;

  console.log(`name: ${nameValue}, dob: ${dateOfBirthValue}, add: ${addressValue}
  `);

  // Put our data we want to send in a javascript object
  let data = {
    name: nameValue,
    date_of_birth: dateOfBirthValue,
    address: addressValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/patrons", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      // addRowToTable(xhttp.response);

      // Refresh page to requery updated table
      location.reload()

      // // Clear the input fields for another transaction
      // inputName.value = "";
      // inputDateOfBirth.value = "";
      // inputAddress.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// // Creates a single row from an Object representing a single record from
// // Patrons
// addRowToTable = (data) => {
//   // Get a reference to the current table on the page and clear it out.
//   let currentTable = document.getElementById("patrons-table");

//   // Get the location where we should insert the new row (end of table)
//   let newRowIndex = currentTable.rows.length;

//   // Get a reference to the new row from the database query (last object)
//   let parsedData = JSON.parse(data);
//   let newRow = parsedData[parsedData.length - 1];

//   // Formats date to YYYY/MM/DD
//   const formattedDate = new Date(newRow.date_of_birth).toLocaleDateString(
//     "en-CA"
//   );

  // Create a row and 4 cells
  let row = document.createElement("TR");
  let idCell = document.createElement("TD");
  let nameCell = document.createElement("TD");
  let dateOfBirthCell = document.createElement("TD");
  let addressCell = document.createElement("TD");
  let editCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");

//   // Fill the cells with correct data
//   idCell.innerText = newRow.patron_id;
//   nameCell.innerText = newRow.name;
//   dateOfBirthCell.innerText = formattedDate;
//   addressCell.innerText = newRow.address;

  // Edit Button
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    editPatron(newRow.patron_id, newRow.name, formattedDate, newRow.address);
  };
  editCell.appendChild(editButton);

  // Delete Button
  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deletePatron(newRow.patron_id);
  };

  // Add the cells to the row
  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(dateOfBirthCell);
  row.appendChild(addressCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

//   // Add a row attribute so the deleteRow function can find a newly added row
//   row.setAttribute("data-value", newRow.patron_id);

  // Add the row to the table
  currentTable.appendChild(row);

// User clicks edit button
function editPatron(patronID, curName, curDateOfBirth, curAddress) {
  console.log("Editing patron:", patronID);
  let editForm = document.getElementById("add-patron-form");
  let editDescription = document.getElementById("add-description");

  // Change the bottom form to the edit form
  editDescription.innerHTML = "Edit a Patron by updating each field."
  editForm.innerHTML = `
    <label for="edit-name">Name:* </label>
    <input type="text" id="edit-name" value="${curName}" required />

    <label for="edit-dateofbirth">Date of Birth:* </label>
    <input type="date" id="edit-dateofbirth" value="${curDateOfBirth}" required />

    <label for="edit-address">Address:* </label>
    <input type="text" id="edit-address" value="${curAddress}" required />

    <button type="submit">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    savePatronEdit(patronID); 
  });
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

// Save the edit and send data to server
function savePatronEdit(patronID) {
  let newName = document.getElementById("edit-name").value;
  let newDateofBirth = document.getElementById("edit-dateofbirth").value;
  let newAddress = document.getElementById("edit-address").value;

  let data = {
    patron_id: patronID,
    name: newName,
    date_of_birth: newDateofBirth,
    address: newAddress,
  };
  let link = "/patrons";

  $.ajax({
    url: link,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function (response) {
      console.log("patron edited");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    } 
  });
}


function deletePatron(patronID) {
  let link = "/patrons";
  let data = {
    id: patronID,
  };

  console.log(`data before: ${JSON.stringify(data)}`);

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      // Refresh page to requery updated table
      location.reload()
      // deleteRow(patronID);
    },
  });
}

// function deleteRow(patronID) {
//   let table = document.getElementById("patrons-table");
//   for (let i = 0, row; (row = table.rows[i]); i++) {
//     if (table.rows[i].getAttribute("data-value") == patronID) {
//       table.deleteRow(i);
//       break;
//     }
//   }
// }
