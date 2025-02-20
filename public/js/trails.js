// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addForm = document.getElementById("add-trail-form");

// Modify the objects we need
addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let parkID = document.getElementById("input-park").value;
  let trailName = document.getElementById("input-name").value;
  let latitude = document.getElementById("input-latitude").value;
  let longitude = document.getElementById("input-longitude").value;
  let length = document.getElementById("input-length").value;

  let data = {
    park_id: parkID,
    name: trailName,
    latitude: latitude,
    longitude: longitude,
    length: length,
  };

  console.log(data);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/trails", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      location.reload();
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
});

// User clicks edit button
function editTrail(
  trailID,
  parkName,
  curName,
  curLatitude,
  curLongitude,
  curLength
) {
  console.log("Editing trail:", trailID);
  let editForm = document.getElementById("add-trail-form");
  let editDescription = document.getElementById("add-description");

  // Change the bottom form to the edit form
  editDescription.innerHTML =
    "To edit an trail, please enter the details below and click 'Submit'!";

  editForm.innerHTML = `
    <label for="edit-park">Park Name:* </label>
    <input type="text" id="edit-park" value="${parkName}" required />
    
    <label for="edit-name">Trail Name:* </label>
    <input type="text" id="edit-name" value="${curName}" required />
    
    <label for="edit-latitude">Latitude:* </label>
    <input type="text" id="edit-latitude" value="${curLatitude}" required />
    
    <label for="edit-longitude">Longitude:* </label>
    <input type="text" id="edit-longitude" value="${curLongitude}" required />
    
    <label for="edit-length">Length:* </label>
    <input type="text" id="edit-length" value="${curLength}" required />
    
    <button type="submit">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    saveTrailEdit(trailID);
  });
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

function saveTrailEdit(trailID) {
  let newPark = document.getElementById("edit-park").value;
  let newName = document.getElementById("edit-name").value;
  let newLatitude = document.getElementById("edit-latitude").value;
  let newLongitude = document.getElementById("edit-longitude").value;
  let newLength = document.getElementById("edit-length").value;

  let data = {
    trail_id: trailID,
    park_name: newPark,
    name: newName,
    latitude: newLatitude,
    longitude: newLongitude,
    length: newLength,
  };

  console.log(data);

  $.ajax({
    url: "/trails",
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      console.log("Trail updated");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function deleteTrail(ID) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
    let link = "/trails";
    let data = {
      id: ID,
    };

    console.log(`data before: ${JSON.stringify(data)}`);

    $.ajax({
      url: link,
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function () {
        location.reload();
      },
    });
  }
}
