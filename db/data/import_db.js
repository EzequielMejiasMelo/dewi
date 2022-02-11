const fs = require('fs'); 
const csv = require('csv-parser');

let csvData = [];
function getData(){

    fs.createReadStream('books.csv')
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
        console.log(csvData);
    });
};

getData();