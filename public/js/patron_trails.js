// // Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

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
