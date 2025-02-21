// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addImplantForm = document.getElementById("add-implant-form");

// Modify the objects we need
addImplantForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPatronID = document.getElementById("input-patron");
  let inputExpiration = document.getElementById("input-expiration-date");
  let inputBerserk = document.getElementById("input-berserk-mode");

  // Get the values from the form fields
  let patronIDValue = inputPatronID.value;
  let expirationValue = inputExpiration.value;
  let berserkValue = inputBerserk.value;

  // Put our data we want to send in a javascript object
  let data = {
    patron_id: patronIDValue,
    expiration_date: expirationValue,
    berserk_mode: berserkValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/brain_implants", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Refresh page to requery updated table after successfull post
      location.reload();
    } else if (xhttp.status == 400) {
      // Receives and displays error when non-unique foreign key is chosen by user:
      // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
      let response = JSON.parse(xhttp.responseText);
      let errorMessage = response.error;

      // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
      let errorMessageDisplay = document.getElementById("errorMessage");
      errorMessageDisplay.textContent = errorMessage;
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// User clicks edit button
function editImplant(implantID, patronName, curExpirationDate, curBerserkMode) {
  console.log("editing: ", implantID);
  let editForm = document.getElementById("add-implant-form");
  let editDescription = document.getElementById("add-description");

  // Change insert form to edit form
  editDescription.innerHTML =
    "To edit a implant, please enter the details below and click 'Save Changes'!";

  editForm.innerHTML = `

    <label for="edit-expiration-date">Expiration Date:* </label>
    <input type="date" id="edit-expiration-date" value=${curExpirationDate}>

    <label for="edit-berserk-mode">Berserk Mode:* </label>
    <select name="edit-berserk-mode" id="edit-berserk-mode" value=${curBerserkMode}>
      <option value="0">False</option>
      <option value="1">True</option>
    </select>

    <button type="button" onclick="saveImplantEdit(${implantID})">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

// Save the edit and send data to server
function saveImplantEdit(implantID) {
  console.log("Grabing new implant information from EDIT form");

  let newExpirationDate = document.getElementById("edit-expiration-date").value;
  let newBerserkMode = document.getElementById("edit-berserk-mode").value;

  let data = {
    implant_id: implantID,
    expiration_date: newExpirationDate,
    berserk_mode: newBerserkMode,
  };

  let link = "/brain_implants";

  $.ajax({
    url: link,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      alert("Implant Edited!");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function deleteImplant(implantID) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
    let link = "/brain_implants";
    let data = {
      id: implantID,
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
