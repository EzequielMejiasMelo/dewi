const searchResultDisplay = $('#searchResultDisplay');
const prevButton = $('#previous');
const numberDisplay = $('#number');
const nextButton = $('#next');

async function init() {
  //Gets the parameters from the URL query.
  const params = new URL(document.location).searchParams;
  const tags = params.get('tagsearch').split(',');
  const pagenum = parseInt(params.get('pagenum'));

  // Fetches the search result from the API with the parameters.
  const searchResult = await fetch(`/api/tags/searchbooks?pagenum=${pagenum}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags }),
  })
    .then(function (response) {
      if (response.status === 401) {
        console.log('You failed!');
      }
      return response.json();
    })
    .then(function (data) {
      return data;
    });

  // Set's which page number will be displayed.
  pagenum > 1
    ? prevButton.attr(
        'href',
        `/search?tagsearch=${taglist.join(',')}&pagenum=${pagenum - 1}`
      )
    : prevButton.attr(
        'href',
        `/search?tagsearch=${taglist.join(',')}&pagenum=1`
      );
  pagenum * 10 < searchResult.totalcount
    ? nextButton.attr(
        'href',
        `/search?tagsearch=${taglist.join(',')}&pagenum=${pagenum + 1}`
      )
    : prevButton.attr(
        'href',
        `/search?tagsearch=${taglist.join(',')}&pagenum=${Math.ceil(
          searchResult.totalcount / 10
        )}`
      );
  numberDisplay.text(
    `${searchResult.pagestart}-${searchResult.pagestart + 9} of ${
      searchResult.totalcount
    }`
  );

  // Loops through the returned books and displays them.
  for (const book of searchResult.books) {
    let taglist = ``;
    for (const tags of book.book_tags) {
      taglist =
        taglist +
        `<span class="tag m-1 is-medium has-text-weight-light" id="bookTag">
            ${tags.name}
        </span>`;
    }
    console.log(book.my_authors);
    let authors = `by ${book.my_authors
      .map((element) => {
        return element.name;
      })
      .join(', ')}.`;
    searchResultDisplay.append(`<div class="box p-0">
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
                    <h5 class="title is-5">Tags:
                        ${taglist}
                    </h5>
                    <a class="button" id="selectedTag"
                        href="https://www.amazon.com/s?k=${book.title
                          .split(' ')
                          .join('+')}+by+${book.my_authors[0].name
      .split(' ')
      .join('+')}&i=stripbooks" target="_blank">Find it
                        on Amazon</a>
                    <button class="button favoritebutton" id="selectedTag" bookid="${
                      book.id
                    }">Add to Favorites</button>
                </div>
            </div>
        </div>
    </div>`);
  }

  // Sets up that when the book's favorite button is pressed,
  // They are added to favorites, unless the user is not logged in.
  $('.favoriteButton').on('click', async function () {
    console.log($(this).attr('bookid'));
    const response = await fetch(`/api/userbook/${$(this).attr('bookid')}`, {
      method: 'POST',
    });
    if (response.status === 200) {
      alert('The book has been added to your favorites.');
      $(this).prop('disabled', true);
    } else if (response.status === 401) {
      alert('Please login to save favorites.');
    } else {
      alert('Could not find book to favorite.');
    }
  });
}

init();
