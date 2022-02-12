const sequelize = require('../config/config');
const { Author, Books, Tags } = require('../models');
const getData = require('../db/data/import_db');


const seedDatabase = async () => {
    const csvData = await getData();
    console.log(csvData);

    await sequelize.sync({ force: true });

    for (const data of csvData) {
        const book = await Books.create({ title: data.title, image_link: data.img_link, rating: data.rating }).catch((err)=> console.log('Duplicate Book'));
        
        if(book){

            const authors = data.author.split(';');
            for (const author of authors){
                const temp_author = await Author.create({ name: author }).catch((err)=> console.log('Duplicate Author'));
                temp_author ? temp_author.addBooks(book) : console.log('Did not add duplicate author');
            };

            const tags = data.genre.split(',');
            for (const tag of tags){
                const temp_tag = await Tags.create({ name: tag }).catch((err)=> console.log('Duplicate Tag'));
                temp_tag ? temp_tag.addBooks(book) : console.log('Did not add duplicate tag');
            };
        };
    }

    process.exit(0);
};

seedDatabase();