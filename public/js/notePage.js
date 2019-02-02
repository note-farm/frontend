$.ajax({
    url: 'http://localhost:2609/api/notes',
    type: 'GET',
    success: function (myNotes) {
        console.log(myNotes)
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myNotes.length; i++) {
            for (var key in myNotes[i]) {
                if (col.indexOf(key) === -1 && (key === 'title' || key === 'content' || key == 'category')) {
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
        for (var i = 0; i < myNotes.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myNotes[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showNotes");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
});

axios.get('http://localhost:2609/api/categories')
    .then(function (categoryList) {
        $('#category-chooser').empty();
        $('#category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#category-chooser').append($('<option>').text(obj.title + ' - ' + obj._id));
        });
    })

axios.get('http://localhost:2609/api/notes')
    .then(function (noteList) {
        $('#note-chooser').empty();
        $('#note-chooser').append($('<option>').text("Choose a Note"));
        $.each(noteList.data, function (i, obj) {
            $('#note-chooser').append($('<option>').text(obj.title + ' - ' + obj._id));
        });
    })

axios.get('http://localhost:2609/api/notes')
    .then(function (noteList) {
        $('#update-note-chooser').empty();
        $('#update-note-chooser').append($('<option>').text("Choose a Note"));
        $.each(noteList.data, function (i, obj) {
            $('#update-note-chooser').append($('<option>').text(obj.title + ' - ' + obj._id));
        });
    })

axios.get('http://localhost:2609/api/categories')
    .then(function (noteList) {
        $('#update-category-chooser').empty();
        $('#update-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(noteList.data, function (i, obj) {
            $('#update-category-chooser').append($('<option>').text(obj.title + ' - ' + obj._id));
        });
    })