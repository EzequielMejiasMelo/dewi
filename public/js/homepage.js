const activeTags = $('#usedTags');
const searchTag = $('#searchTag');
const popularTag = $('#popularTags');
const searchButton = $('#startSearch');

const taglist = [];

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
    document.location.replace(`/search?tagsearch=${taglist.join(',')}&pagenum=1`)
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
        activeTags.append(`  <span class="tag is m-1 is-large" id="text">
    ${tag}
    <button class="delete"></button>
</span>`);
    };
    searchButton.prop("disabled",false);
}

$(function(){
    for(let i=0; i< activeTags.children().length; i++){
        taglist.push(activeTags.children().eq(i).text().trim());
    }
})

