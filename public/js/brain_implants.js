// // Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

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

  console.log(
    `patron_id: ${patronIDValue}, expiration_date: ${expirationValue}`,
    `berserk_mode: ${berserkValue}`
  );

  // Put our data we want to send in a javascript object
  let data = {
    patron_id: patronIDValue,
    expiration_date: expirationValue,
    berserk_mode: berserkValue,
  };

  console.log(
    `data.patron_id: ${data.patron_id}, data.expiration_date: ${data.expiration_date}`,
    `data.berserk_mode: ${data.berserk_mode}`
  );

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/brain_implants", true);
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

function deleteImplant(implantID) {
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
