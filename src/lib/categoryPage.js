$.ajax({
    url: 'http://localhost:2672/categories',
    type: 'GET',
    success: function (myCategories) {
        console.log(myCategories)
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myCategories.length; i++) {
            for (var key in myCategories[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myCategories.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myCategories[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showCategories");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
});

$.getJSON("http://localhost:2672/categories", function (json) {
    $('#category-chooser').empty();
    $('#category-chooser').append($('<option>').text("Choose a Category"));
    $.each(json, function (i, obj) {
        $('#category-chooser').append($('<option>').text(obj.title));
    });
});