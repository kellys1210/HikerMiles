// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

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
