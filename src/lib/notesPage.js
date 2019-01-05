import axios from 'axios'

axios.get('http://localhost:2672/notes')
    .then(function (myNotes) {
        console.log(myNotes.data);
        var col = [];
        for (var i = 0; i < myNotes.data.length; i++) {
            for (var key in myNotes.data[i]) {
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
        for (var i = 0; i < myNotes.data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myNotes.data[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showNotes");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    })

axios.get('http://localhost:2672/categories')
    .then(function (categoryList) {
        $('#category-chooser').empty();
        $('#category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#category-chooser').append($('<option>').text(obj.title));
        });
    })

axios.get('http://localhost:2672/notes')
    .then(function (noteList) {
        $('#note-chooser').empty();
        $('#note-chooser').append($('<option>').text("Choose a Note"));
        $.each(noteList.data, function (i, obj) {
            $('#note-chooser').append($('<option>').text(obj.title));
        });
    })