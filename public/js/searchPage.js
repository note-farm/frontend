axios.get('http://localhost:2609/api/categories')
    .then(function (categoryList) {
        $('#search-category-chooser').empty();
        $('#search-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#search-category-chooser').append($('<option>').text(obj.title));
        });
        console.log(categoryList.data);
    })

let url = 'http://localhost:2609/api/notes/search/';

function searchNotes(categoryData) {
    $.ajax({
        url: url + categoryData,
        type: 'GET',
        success: function (notesList) {
            console.log(notesList)
            // EXTRACT VALUE FOR HTML HEADER. 
            var col = [];
            for (var i = 0; i < notesList.length; i++) {
                for (var key in notesList[i]) {
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
            for (var i = 0; i < notesList.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = notesList[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("listNotes");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }
    });
}