const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Sorts through the CSV data to let us manipulate it.
async function getData(){
  let csvData = [];

    await new Promise((resolve, reject) => {fs.createReadStream(path.join(__dirname, 'book2.csv'))
    .pipe(csv())
    .on('data', function(data){
        try {

          let temp = {
            title: data.bookTitle,
            author: data.bookAuthors,
            genre: data.bookGenres,
            img_link: data.bookImage,
            rating: data.bookRating
          }
          csvData.push(temp);

        }
        catch(err) {
            console.log(err);
        }
    })
    .on('end',function(){
      resolve();
    })});

    return csvData;
  };

module.exports = getData;