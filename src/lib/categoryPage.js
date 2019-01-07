const axios = {
    get: (s) => Promise.resolve({
        data: [{
            "_id": "5c3296f4c7728833bf7cf334",
            "title": "Update styling",
            "content": "Don't forget to update the styling on the website",
            "category": "Cat2",
            "createdAt": "2019-01-07T00:01:56.375Z",
            "updatedAt": "2019-01-07T00:01:56.375Z",
            "__v": 0
        }]
    })
};

// ------------------------------------------

window.addEventListener('load', async () => {
    const res = await axios.get('http://localhost:2672/categories');
    const div = document.getElementById("showCategories");

    div.innerHTML = createTableWithData(res.data);
});

function createTableWithData(data) {
    // Create a dictionary of keys and names for the header cells.
    const columns = {
        title: 'Title',
        content: 'Content',
        category: 'Category'
    };
    // Create header row by mapping columns into HTML strings.
    const headerCells = Object.values(columns).map(name => `<th>${name}</th>`);
    const headerRow = `<tr>${headerCells.join('')}</tr>`;
    // Create data rows by doing the same for each object in the data.
    const dataRows = data.map(obj =>
        Object.keys(columns).map(key => `<td>${obj[key]}</td>`).join('')
    );

    // Finally we set the header and data rows to be the innerHTML of the table.
    return `<table>${headerRow + dataRows.join('')}</table>`;
}

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