axios.get('http://localhost:2609/api/categories')
    .then(function (categoryList) {
        $('#search-category-chooser').empty();
        $('#search-category-chooser').append($('<option>').text("Choose a Category"));
        $.each(categoryList.data, function (i, obj) {
            $('#search-category-chooser').append($('<option>').text(obj.title));
        });
    })

function searchNotes(category) {

}