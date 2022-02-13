const searchResultDisplay = $('#searchResultDisplay');


async function init() {
    console.log("hello!");
    const params = (new URL(document.location)).searchParams;
    const tags = params.get("tagsearch").split(",");
    const pagenum = parseInt(params.get("pagenum"));
    console.log(JSON.stringify({ tags }));
    const books = await fetch(`/api/tags/searchbooks?pagenum=${pagenum}`, {
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
    console.log(books);
    for (const book of books) {
        let taglist=``;
        for(const tags of book.book_tags){
            taglist = taglist + `<span class="tag is-danger m-1 is-medium">
            ${tags.name}
        </span>`;
        }
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
                    <h5 class="title is-5">tags:
                        ${taglist}
                    </h5>
                    <a class="button"
                        href="https://www.amazon.com/s?k=${book.title.split(' ').join('+')}&i=stripbooks">Find it
                        on amazon</a>
                </div>
            </div>
        </div>
    </div>`);
    }
}


init();