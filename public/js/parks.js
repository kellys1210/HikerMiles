// Code for all CRUD data handling and HTTP requests adapted from: 
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addForm = document.getElementById("add-park-form");

// Modify the objects we need
addForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get input data
    let parkName = document.getElementById("input-name").value;
    let state = document.getElementById("input-state").value;
    let county = document.getElementById("input-county").value;
    let hasRangerStation = document.getElementById("input-ranger").value;

    // Create data object to insert
    let data = {
        name: parkName,
        state: state,
        county: county,
        has_ranger_station: hasRangerStation
    };

    console.log("Sending data:", data);

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/parks", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Refresh page to requery updated table after successful post
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// User clicks edit button
function editParks(parkID, curName, curState, curCounty, curRangerStation) {
    console.log("Editing park:", parkID);
    let editForm = document.getElementById("add-park-form");
    let editDescription = document.getElementById("add-description");
  
    // Change the bottom form to the edit form
    editDescription.innerHTML =
      "To edit a park, please enter the details below and click 'Submit'!";
  
    editForm.innerHTML = `
      <label for="edit-name">Name:* </label>
      <input type="text" id="edit-name" value="${curName}" required />
  
      <label for="edit-state">State:* </label>
      <input type="text" id="edit-state" value="${curState}" required />
  
      <label for="edit-county">County:* </label>
      <input type="text" id="edit-county" value="${curCounty}" required />

      <label for="edit-ranger-station">Has Ranger Station:* </label>
      <select name="input-ranger" id="edit-ranger-station" required>
        <option value="0" ${curRangerStation == 0 ? "selected" : ""}>False</option>
        <option value="1" ${curRangerStation == 1 ? "selected" : ""}>True</option>
      </select>
      <button type="submit">Save Changes</button>
      <button type="button" onclick="cancelEdit()">Cancel</button>
    `;
  
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveParkEdit(parkID);
    });
  }
  
  // User clicks cancel to put back Insert Form
  function cancelEdit() {
    location.reload();
  }
  
  // Save the edit and send data to server
  function saveParkEdit(parkID) {
    let newName = document.getElementById("edit-name").value;
    let newState = document.getElementById("edit-state").value;
    let newCounty = document.getElementById("edit-county").value;
    let newRangerStation = document.getElementById("edit-ranger-station").value;
  
    let data = {
      park_id: parkID,
      name: newName,
      state: newState,
      county: newCounty,
      has_ranger_station: newRangerStation
    };
    let link = "/parks";
   
    $.ajax({
      url: link,
      type: "PUT",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log("park edited");
        location.reload();
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  }


function deletePark(ID) {
    if (
        window.confirm(
          "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
        )
      ) {
    let link = "/parks";
    let data = {
        id: ID,
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
        },
    });
}};
