// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deletePatron(patronID) {
  let link = "/delete-patron/";
  let data = {
    id: patronID,
  };

  console.log(`data before: ${JSON.stringify(data)}`);

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(patronID);
    },
  });
}

function deleteRow(patronID) {
  let table = document.getElementById("patrons-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].getAttribute("data-value") == patronID) {
      table.deleteRow(i);
      break;
    }
  }
}
