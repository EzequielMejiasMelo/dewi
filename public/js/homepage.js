const activeTags = $('#usedTags');
const searchTag = $('#searchTag');
const enterTag = $('#tagFinder');
const popularTag = $('#popularTags');

activeTags.on("click", function (event) {
    console.log("Clicking!");
    if (event.target.tagName.toLowerCase() === "button") {
        $(event.target).parent().remove();
    }
})

popularTag.on("click", "button", function (event) {
    console.log("working");
    activeTags.append(`<span class="tag is-danger m-1 is-large">
    ${$(this).text()}
    <button class="delete"></button>
</span>`);
})

enterTag.on("submit", function (event) {
    event.preventDefault();
    if (searchTag.val()) {
        activeTags.append(`<span class="tag is-danger m-1 is-large">
    ${searchTag.val()}
    <button class="delete"></button>
</span>`);
        searchTag.val("");
    }
});