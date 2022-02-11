const sequelize = require('../config/config');
const { Author, Books, Tags } = require('../models');
const getData = require('../db/data/import_db');


const seedDatabase = async () => {
    const csvData = await getData();

    await sequelize.sync({ force: true });

    for (const data of csvData) {
        const authors = data.author.split(';');
        for (const author of authors){
            await Author.create({ name: author });
        };
        
        await Books.create({ title: data.title, image_link: data.img_link, rating: data.rating });
        
        const tags = data.genre.split(',');
        for (const tag of tags){
            await Tags.create({ name: tag });
        };
    }

    process.exit(0);
};

seedDatabase();