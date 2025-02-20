// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addPatronForm = document.getElementById("add-patron-form");

// Modify the objects we need
addPatronForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  console.log("Grabing new patron information from SUBMIT form");
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
      location.reload();
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Edit Button
let editButton = document.createElement("button");
editButton.innerText = "Edit";
editButton.onclick = function () {
  editPatron(newRow.patron_id, newRow.name, formattedDate, newRow.address);
};
// editCell.appendChild(editButton);

// Delete Button
deleteCell = document.createElement("button");
deleteCell.innerHTML = "Delete";
deleteCell.onclick = function () {
  deletePatron(newRow.patron_id);
};

// User clicks edit button
function editPatron(patronID, curName, curDateOfBirth, curAddress) {
  console.log("Editing patron:", patronID);
  let editForm = document.getElementById("add-patron-form");
  let editDescription = document.getElementById("add-description");

  // Change the bottom form to the edit form
  editDescription.innerHTML =
    "To edit an patron, please enter the details below and click 'Submit'!";

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
  console.log("Grabing new patron information from EDIT form");
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
    },
  });
}

function deletePatron(patronID) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
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
        location.reload();
      },
    });
  }
}
