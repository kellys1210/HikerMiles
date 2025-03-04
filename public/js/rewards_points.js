// Code for all CRUD data handling and HTTP requests adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addRewardForm = document.getElementById("add-reward-form");

// Modify the objects we need
addRewardForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPartronID = document.getElementById("input-patron_id");
  let inputReward = document.getElementById("input-reward");

  // Get the values from the form fields
  let patronIDValue = inputPartronID.value;
  let rewardValue = inputReward.value;

  console.log(`patron_id: ${patronIDValue}, reward_value: ${rewardValue}`);

  // Put our data we want to send in a javascript object
  let data = {
    patron_id: patronIDValue,
    reward: rewardValue,
  };

  console.log(`data.patron_id: ${data.patron_id}, data.reward: ${data.reward}`);

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/rewards_points", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Refresh page to requery updated table after successfull post
      location.reload();
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// User clicks edit button
function editReward(rewardID, curName, curReward) {
  console.log("editing: ", rewardID);
  let editForm = document.getElementById("add-reward-form");
  let editDescription = document.getElementById("add-description");

  // Change insert form to edit form
  editDescription.innerHTML =
    "To edit a reward, please enter the details below and click 'Save Changes'!";

  editForm.innerHTML = `
    <label for="edit-patron-name">Patron Name:* </label>
    <input type="text" id="edit-patron-name" value="${curName}" disabled> 

    <label for="edit-reward">Reward:* </label>
    <input type="number" id="edit-reward" value=${curReward}>

    <button type="button" onclick="saveRewardEdit(${rewardID})">Save Changes</button>
    <button type="button" onclick="cancelEdit()">Cancel</button>
  `;
}

// User clicks cancel to put back Insert Form
function cancelEdit() {
  location.reload();
}

// Save the edit and send data to server
function saveRewardEdit(rewardID) {
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

function deleteReward(rewardID) {
  if (
    window.confirm(
      "Do you really want to delete this record? This cannot be undone. Click 'OK' to continue with deleting this record."
    )
  ) {
    let link = "/rewards_points";
    let data = {
      id: rewardID,
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
