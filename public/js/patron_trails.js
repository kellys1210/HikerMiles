// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addPatronTrailForm = document.getElementById("add-patron-trail-form");

// Modify the objects we need
addPatronTrailForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPatronID = document.getElementById("input-patron");
  let inputTrail = document.getElementById("input-trail");
  let inputHikeCount = document.getElementById("input-hike-count");

  console.log(`input Trail: ${inputTrail}`);

  // Get the values from the form fields
  let patronIDValue = inputPatronID.value;
  let trailIDValue = inputTrail.value;
  let hikeCountValue = inputHikeCount.value;

  console.log(
    `patron_id: ${patronIDValue}, trail_id: ${trailIDValue}`,
    `hike_count: ${hikeCountValue}`
  );

  // Put our data we want to send in a javascript object
  let data = {
    patron_id: patronIDValue,
    trail_id: trailIDValue,
    hike_count: hikeCountValue,
  };

  console.log(
    `data.patron_id: ${data.patron_id}, data.trail_id: ${data.trail_id}`,
    `data.hike_count: ${data.hike_count}`
  );

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/patron_trails", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Refresh page to requery updated table after successfull post
      location.reload();
    } else if (xhttp.status == 400) {
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
function editPatronTrail(curName, curTrail, curHike) {
  console.log("editing: ", curName)
  let editForm = document.getElementById("add-patron-trail-form");
  let editDescription = document.getElementById("add-description");
  
  // Change insert form to edit form
  editDescription.innerHTML =
    "To edit a hike, please enter the details below and click 'Save Changes'!";

  editForm.innerHTML = `
    <label for="edit-patron-name">Patron Name:* </label>
    <input type="text" id="edit-patron-name" value="${curName}" disabled> 

    <label for="edit-trail-name">Trail Name:* </label>
    <input type="text" id="edit-trail-name" value="${curTrail}" disabled> 

    <label for="edit-hike">Hike Count:* </label>
    <input type="number" id="edit-hike" value=${curHike}>

    <button type="button" onclick="savePatronTrailEdit()">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;  
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

// Save the edit and send data to server
function savePatronTrailEdit() {
  console.log("Grabing new reward information from EDIT form");
  
  let newHike = document.getElementById("edit-hike").value;
  let newName = document.getElementById("edit-patron-name").value;
  let newTrail = document.getElementById("edit-trail-name").value;

  let data = {
    hike: newHike,
    name: newName,
    trail: newTrail,
  };
  console.log(data);
  let link = "/patron_trails";

  $.ajax({
    url: link,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      alert("PatronTrails Edited!");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function deletePatronTrail(patronName, trailName) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
    let link = "/patron_trails";
    let data = {
      patron_name: patronName,
      trail_name: trailName,
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
