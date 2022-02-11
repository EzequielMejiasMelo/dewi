const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

async function getData(){
  let csvData = [];

    await new Promise((resolve, reject) => {fs.createReadStream(path.join(__dirname, 'books.csv'))
    .pipe(csv())
    .on('data', function(data){
        try {

          let temp = {
            title: data.title,
            author: data.authors,
            genre: data.categories,
            img_link: data.thumbnail,
            rating: data.average_rating
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