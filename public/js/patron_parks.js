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
}};
