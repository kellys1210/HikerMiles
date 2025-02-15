// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addForm = document.getElementById("add-trail-form");

// Modify the objects we need
addForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get input data
    let parkID = document.getElementById("input-park").value;
    let trailName = document.getElementById("input-name").value;
    let latitude = document.getElementById("input-latitude").value;
    let longitude = document.getElementById("input-longitude").value;
    let length = document.getElementById("input-length").value;

    // Create data object to insert
    let data = {
        park_id: parkID,
        name: trailName,
        latitude: latitude,
        longitude: longitude,
        length: length
    };

    console.log(data);

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/trails", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Refresh page to requery updated table after successfull post
            location.reload()

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


function deleteTrail(ID) {
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
        success: function (result) {
            // Refresh page to requery updated table
            location.reload()
        },
    });
}
