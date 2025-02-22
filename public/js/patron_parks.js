// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addPatronParkForm = document.getElementById("add-patron-park-form");

// Modify the objects we need
addPatronParkForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPatronID = document.getElementById("input-patron");
  let inputPark = document.getElementById("input-park");
  let inputVisitCount = document.getElementById("input-visit-count");

  console.log(`input park: ${inputPark}`);

  // Get the values from the form fields
  let patronIDValue = inputPatronID.value;
  let parkIDValue = inputPark.value;
  let visitCountValue = inputVisitCount.value;

  console.log(
    `patron_id: ${patronIDValue}, park: ${parkIDValue}`,
    `visit_count: ${visitCountValue}`
  );

  // Put our data we want to send in a javascript object
  let data = {
    patron_id: patronIDValue,
    park_id: parkIDValue,
    visit_count: visitCountValue,
  };

  console.log(
    `data.patron_id: ${data.patron_id}, data.park_id: ${data.park_id}`,
    `data.visit_count: ${data.visit_count}`
  );

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/patron_parks", true);
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
function editPatronPark(curName, curPark, curVisit) {
  console.log("editing: ", curName)
  let editForm = document.getElementById("add-patron-park-form");
  let editDescription = document.getElementById("add-description");
  
  // Change insert form to edit form
  editDescription.innerHTML =
    "To edit a visit, please enter the details below and click 'Save Changes'!";

  editForm.innerHTML = `
    <label for="edit-patron-name">Patron Name:* </label>
    <input type="text" id="edit-patron-name" value="${curName}" disabled> 

    <label for="edit-park-name">Park Name:* </label>
    <input type="text" id="edit-park-name" value="${curPark}" disabled> 

    <label for="edit-visit">Visit Count:* </label>
    <input type="number" id="edit-visit" value=${curVisit}>

    <button type="button" onclick="savePatronParkEdit(${rewardID})">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;  
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

// Save the edit and send data to server
function savePatronParkEdit(rewardID) {
  console.log("Grabing new reward information from EDIT form");
  
  let newReward = document.getElementById("edit-reward").value;
  let newName = document.getElementById("edit-patron-name").value;

  let data = {
    reward_id: rewardID,
    name: newName,
    reward: newReward,
  };
  
  let link = "/rewards_points";

  $.ajax({
    url: link,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      alert("Reward Edited!");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function deletePatronPark(patronName, parkName) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
    let link = "/patron_parks";
    let data = {
      patron_name: patronName,
      park_name: parkName,
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
