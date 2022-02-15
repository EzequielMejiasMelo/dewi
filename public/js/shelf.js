const shelfDisplay = $('#shelfdisplay');

// Fetches the user's favorited books, and renders them to the page.
const viewFavorite = async () => {
    const favorites = await fetch('/api/user/favorites', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        if (response.status === 400){
            console.log("Bad Response");
        }
        return response.json()
    }).then((data) => data);

    if (favorites) {
        for (const book of favorites.books) {
            console.log(book.title);
            let authors = `by ${book.my_authors.map(element => element.name).join(', ')}.`;
            shelfDisplay.append(`<div id="${book.id}" class="box p-0">
            <div class="columns  is-mobile m-0">
                <div class="column is-one-fifth">
                    <figure class="image">
                        <img
                            src="${book.image_link}">
                    </figure>
                </div>
                <div class="column">
                    <div class="content">
                        <h4 class="title is-4">${book.title}</h4>
                        <h4 class="title is-5">${authors}</h4>
                        <a class="button is-medium has-text-weight-light" id="bookTag"
                            href="https://www.amazon.com/s?k=${book.title.split().join('+')}&i=stripbooks" target="_blank">Find it
                            on Amazon</a>
                        <button class="button removebutton is-medium" id="selectedTag" bookid="${book.id}">Remove from Favorites</button>
                    </div>
                </div>
            </div>
        </div>`);

        }
    } else {
        alert(response.statusText);
    }

    $('.removebutton').on('click', removeFavorite);
};

// Removes the favorited book via API call.
// If successful, remove the display block of that book.
const removeFavorite = async (event) => {
    let book_id = event.target.getAttribute('bookid');
    let response = await fetch('/api/userbook/' + book_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        $(`#${book_id}`).remove();
    }
};


viewFavorite();