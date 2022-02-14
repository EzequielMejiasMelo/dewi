const shelfDisplay = document.querySelector('#shelfdisplay');
const viewFavorite = async () => {
    const response = await fetch('/api/userbookRoutes/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        for (const book of response.books) {
            let authors = `by ${book.my_authors.map(element => element.name).join(', ')}.`;
            shelfDisplay.append(`<div id="${book.id}" class="box p-0">
        <div class="columns  is-mobile m-0">
            <div class="column is-one-fifth">
                <figure class="image">
                    <img
                        src="${book.image_link}"
                </figure>
            </div>
            <div class="column">
                <div class="content">
                    <h4 class="title is-4">${book.title}</h4>
                    <h5 class="title is-5">${authors}</h5>
                    <a class="button"
                        href="https://www.amazon.com/s?k=${book.title.split(' ').join('+')}+by+${book.my_authors[0].name.split(' ').join('+')}&i=stripbooks" target="_blank">Find it
                        on amazon</a>
                    <button class="button removebutton" bookid="${book.id}">remove from Favorites</button>
                </div>
            </div>
        </div>
    </div>`);

        }
     } else {
            alert(response.statusText);
        }
    };


const removeFavorite = async (event) => {
    let book_id = event.target.getAttribute('bookid');
    let response = await fetch('/api/userbookroutes/' + book_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        document.querySelector(book_id).remove();
    }
}
document.querySelector('.removebutton').addEventListener('click', removeFavorite);

viewFavorite();