const activeTags = $('#usedTags');
const searchTag = $('#searchTag');
const popularTag = $('#popularTags');
const searchButton = $('#startSearch');

const taglist = ["Fiction"];

activeTags.on("click","button", function (event) {
    console.log("Clicking!");
    taglist.splice($(this).parent().index(), 1);
    renderTagList();
})

popularTag.on("click", "button", function (event) {
    console.log("working");
    taglist.push($(this).text());
    renderTagList();
})

searchButton.on('click', function(){
    document.location.replace(`/search?tagsearch=${taglist.join(',')}`)
});

searchTag.autocomplete({
    source: function (request, response) {
        $.ajax({
            url: `/api/tags/autocomp/${request.term}`,
            dataType: "json",
            success: function (data) {
                response($.map(data, function (item) {
                    return {
                        value: item.name
                    };
                }));
            }
        });
    },
    select: function (event, ui) {
        event.preventDefault();
        taglist.push(ui.item.value);
        renderTagList();
        searchTag.val("");
    }
});

function renderTagList(){
    activeTags.empty();
    if(!taglist.length){
        searchButton.prop("disabled",true);
        return;
    }
    for(const tag of taglist){
        activeTags.append(`<span class="tag is-danger m-1 is-large">
    ${tag}
    <button class="delete"></button>
</span>`);
    };
    searchButton.prop("disabled",false);
}
