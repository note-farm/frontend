axios.get('http://localhost:2609/api/categories')
    .then(function (categoryList) {
        $('#search-category-chooser').empty();
        $('#search-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#search-category-chooser').append($('<option>').text(obj.title));
        });
    })

function searchNotes(categorySelected) {
    axios.get('http://localhost:2609/api/categories')
        .then(function (catList) {
            console.log(catList.data);
            let json = catList.data
            json.forEach(entry => {
                if (entry.title === categorySelected) {
                    return entry["_id"];
                }
                console.log('operation completed?')
            });
        });
}