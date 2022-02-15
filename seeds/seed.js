const sequelize = require('../config/config');
const {
    Author,
    Books,
    Tags,
    AuthorBooks,
    TagBooks,
    User,
} = require('../models');
const getData = require('../db/data/import_db');
const userData = require('./userSeeds.json');

const seedDatabase = async () => {
    // Get's the CSV data
    const csvData = await getData();
    console.log(csvData);

    await sequelize.sync({ force: true });
    // Creates the user data.
    for (const newUser of userData) {
        await User.create(newUser);
    }

    // Loops through the data and build books, authors, and tags.
    for (const data of csvData) {
        // Creates the book.
        const book = await Books.create({
            title: data.title,
            image_link: data.img_link,
            rating: data.rating,
        }).catch((err) => console.log('Duplicate Book'));

        if (book) {
            // Loops through the authors to see if they already exist.
            // If they do, link the one that exists. If not, create a new one and link it.
            const authors = data.author.split(',');
            for (const author of authors) {
                const temp_author = await Author.findOrCreate({
                    where: { name: author },
                }).catch((err) => console.log('Duplicate Author'));
                console.log(temp_author);
                const authorRef = await AuthorBooks.create({
                    author_id: temp_author[0].id,
                    book_id: book.id,
                }).catch((err) => console.log('Duplicate Tag'));
            }

            // Loops through the tags to see if they already exist.
            // If they do, link the one that exists. If not, create a new one and link it.
            const tags = data.genre.split(/\/[0-9\,]+\|?/);
            for (const tag of tags) {
                const temp_tag = await Tags.findOrCreate({
                    where: { name: tag },
                }).catch((err) => console.log('Duplicate Tag'));
                const tagRef = await TagBooks.create({
                    tag_id: temp_tag[0].id,
                    book_id: book.id,
                }).catch((err) => console.log('Duplicate Tag'));
            }
        }
    }

    // Remove the blank tag always generated from the dataset.
    await Tags.destroy({
        where: {
            id: 11,
        },
    });
    process.exit(0);
};

seedDatabase();
