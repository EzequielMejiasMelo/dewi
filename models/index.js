const Author = require('./Author');
const Books = require('./Books');
const Tags = require('./Tags');

Author.belongsToMany(Books, {through: 'AuthorBooks'});
Books.belongsToMany(Author, {through: 'AuthorBooks'});

Tags.belongsToMany(Books, {through: 'BookTags'});
Books.belongsToMany(Tags, {through: 'BookTags'});

module.exports = {Author, Books, Tags};