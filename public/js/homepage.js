const activeTags = $('#usedTags');
const searchTag = $('#searchTag');
const popularTag = $('#popularTags');
const searchButton = $('#startSearch');
const tagFinder = $('#tagFinder')

// Stores list of tags to be searched.
let taglist = [];

// Removes tags, and re-renders them.
activeTags.on('click', 'button', function (event) {
  taglist.splice($(this).parent().index(), 1);
  renderTagList();
});

// Adds tags from the popular tag button, and re-renders them.
popularTag.on('click', 'button', function (event) {
  taglist.push($(this).text());
  renderTagList();
});

// Sends the taglist to the search page to be searched.
searchButton.on('click', function () {
  document.location.replace(`/search?tagsearch=${taglist.join(',')}&pagenum=1`);
});

// Adds an autocomplete function that gets data from the API.
searchTag.autocomplete({
  source: function (request, response) {
    $.ajax({
      url: `/api/tags/autocomp/${request.term}`,
      dataType: 'json',
      success: function (data) {
        response(
          $.map(data, function (item) {
            return {
              value: item.name,
            };
          })
        );
      },
    });
  },
  select: function (event, ui) {
    event.preventDefault();
    taglist.push(ui.item.value);
    renderTagList();
    searchTag.val('');
  },
});

// Stops the autocomplete from reloading the page.
tagFinder.on('submit', function(event){
    event.preventDefault();
});

// Renders the list of tags.
function renderTagList() {
  activeTags.empty();
  // This removes any duplicate tags before rendering.
  taglist = [...new Set(taglist)];
  if (!taglist.length) {
    searchButton.prop('disabled', true);
    return;
  }
  for (const tag of taglist) {
    activeTags.append(`  <span class="tag is m-1 is-large" id="text">
    ${tag}
    <button class="delete"></button>
</span>`);
  }
  searchButton.prop('disabled', false);
}

// Removes strange formatting from the active tags.
$(function () {
  for (let i = 0; i < activeTags.children().length; i++) {
    taglist.push(activeTags.children().eq(i).text().trim());
  }
});
