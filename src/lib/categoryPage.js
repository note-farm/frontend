import axios from 'axios'

axios.get('http://localhost:2672/categories')
    .then(function (myCategories) {
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myCategories.data.length; i++) {
            for (var key in myCategories.data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1); // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myCategories.data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myCategories.data[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showCategories");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    });

axios.get('http://localhost:2672/categories')
    .then(function (categoryList) {
        $('#delete-category-chooser').empty();
        $('#delete-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#delete-category-chooser').append($('<option>').text(obj.title));
        });
    })

axios.get('http://localhost:2672/categories')
    .then(function (categoryList) {
        $('#update-category-chooser').empty();
        $('#update-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#update-category-chooser').append($('<option>').text(obj.title));
        });
    })