const searchResultDisplay = $('#searchResultDisplay');
const prevButton = $('#previous');
const numberDisplay = $('#number');
const nextButton = $('#next');

async function init() {
    console.log("hello!");
    const params = (new URL(document.location)).searchParams;
    const tags = params.get("tagsearch").split(",");
    const pagenum = parseInt(params.get("pagenum"));
    console.log(JSON.stringify({ tags }));
    const searchResult = await fetch(`/api/tags/searchbooks?pagenum=${pagenum}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags })
    }).then(function (response) {
        if (response.status === 401) {
            console.log("You failed!");
        }
        return response.json();
    }).then(function (data) {
            //   renderRecipes(data.results);
            return data;
        });
    
    pagenum > 1 ? prevButton.attr("href", `/search?tagsearch=${taglist.join(',')}&pagenum=${pagenum-1}`) : prevButton.attr("href", `/search?tagsearch=${taglist.join(',')}&pagenum=1`);
    pagenum*10 < searchResult.totalcount ? nextButton.attr("href", `/search?tagsearch=${taglist.join(',')}&pagenum=${pagenum+1}`) : prevButton.attr("href", `/search?tagsearch=${taglist.join(',')}&pagenum=${Math.ceil(searchResult.totalcount/10)}`);
    numberDisplay.text(`${searchResult.pagestart}-${searchResult.pagestart + 9} of ${searchResult.totalcount}`);
    
    for (const book of searchResult.books) {
        let taglist=``;
        for(const tags of book.book_tags){
            taglist = taglist + `<span class="tag m-1 is-medium has-text-weight-light" id="bookTag">
            ${tags.name}
        </span>`;
        }
        console.log(book.my_authors);
        let authors = `by ${book.my_authors.map(element => {
            return element.name;
        }).join(', ')}.`;
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
                    <a class="button"
                        href="https://www.amazon.com/s?k=${book.title.split(' ').join('+')}+by+${book.my_authors[0].name.split(' ').join('+')}&i=stripbooks" target="_blank">Find it
                        on Amazon</a>
                </div>
            </div>
        </div>
    </div>`);
    }
}


init();