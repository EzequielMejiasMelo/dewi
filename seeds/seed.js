// const sequelize = require('../config/config');
// const { Author, Books, Tags } = require('../models');
// const getData = require('../db/data/import_db');


// const seedDatabase = async () => {
//     const csvData = await getData();
//     console.log(csvData);

//     await sequelize.sync({ force: true });

//     for (const data of csvData) {
        
//         const authors = data.author.split(',').map(element=>{
//             return {name: element.trim()};
//         });
        
//         const tags = data.genre.split(/\/[0-9\,]+\|?/).map(element=>{
//             return {name: element.trim()};
//         });
        
//         console.log(authors);
//         console.log(tags);

//         await Books.create({ 
//             title: data.title, 
//             image_link: data.img_link, 
//             rating: data.rating, 
//             authors: authors,
//             tags: tags
//             },
//             {
//                 include:[Author, Tags]
//             }).catch((err)=> console.log('Duplicate Book'));
        
//     }

//     process.exit(0);
// };

// seedDatabase();

const sequelize = require('../config/config');
const { Author, Books, Tags, AuthorBooks, TagBooks, User, UserBooks } = require('../models');
const getData = require('../db/data/import_db');
const userData = require('./userSeeds.json');

const seedDatabase = async () => {
    const csvData = await getData();
    console.log(csvData);

    await sequelize.sync({ force: false });
    // for(const newUser of userData){
    //     await User.create(newUser);
    // }
    // for (const data of csvData) {
    //     const book = await Books.create({ title: data.title, image_link: data.img_link, rating: data.rating }).catch((err)=> console.log('Duplicate Book'));
        
    //     if(book){

    //         const authors = data.author.split(',');
    //         for (const author of authors){
    //             const temp_author = await Author.findOrCreate({ where: {name: author }}).catch((err)=> console.log('Duplicate Author'));
    //             console.log(temp_author);
    //             const authorRef = await AuthorBooks.create({author_id: temp_author[0].id, book_id: book.id}).catch((err)=> console.log('Duplicate Tag'));
    //         };

    //         const tags = data.genre.split(/\/[0-9\,]+\|?/);
    //         for (const tag of tags){
    //             const temp_tag = await Tags.findOrCreate({ where: {name: tag }}).catch((err)=> console.log('Duplicate Tag'));
    //             const tagRef = await TagBooks.create({tag_id: temp_tag[0].id, book_id: book.id}).catch((err)=> console.log('Duplicate Tag'));
    //         };
    //     };
    // }
    await Tags.destroy({
        where: {
            id: 11
        }
    });
    process.exit(0);
};

seedDatabase();