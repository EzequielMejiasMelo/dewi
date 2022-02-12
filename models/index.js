const Author = require('./Author');
const Books = require('./Books');
const Tags = require('./Tags');
const AuthorBooks = require('./AuthorBooks');
const TagBooks = require('./TagBooks');

Author.belongsToMany(Books, {through: {
    model: AuthorBooks,
    unique: false
  },
  as: 'authored-books'});
Books.belongsToMany(Author, {through: {
    model: AuthorBooks,
    unique: false
  },
  as: 'my-authors'});

Tags.belongsToMany(Books, {through: {
    model: TagBooks,
    unique: false
  },
  as: 'tagged-books'});
Books.belongsToMany(Tags, {through: {
    model: TagBooks,
    unique: false
  },
  as: 'book-tags'});

module.exports = {Author, Books, Tags, AuthorBooks, TagBooks};