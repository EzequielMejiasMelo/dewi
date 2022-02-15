const Author = require('./Author');
const Books = require('./Books');
const Tags = require('./Tags');
const AuthorBooks = require('./AuthorBooks');
const TagBooks = require('./TagBooks');
const User = require('./User');
const UserBooks = require('./UserBooks');

// Links all databases to there corresponding through tables.

Author.belongsToMany(Books, {through: {
    model: AuthorBooks,
    unique: false
  },
  as: 'authored-books'
});

Books.belongsToMany(Author, {through: {
    model: AuthorBooks,
    unique: false
  },
  as: 'my_authors'
});

Tags.belongsToMany(Books, {through: {
    model: TagBooks,
    unique: false
  },
  as: 'tagged_books'
});

Books.belongsToMany(Tags, {through: {
    model: TagBooks,
    unique: false
  },
  as: 'book_tags'
});

Books.belongsToMany(User, {through: {
    model: UserBooks,
    unique: false
  },
  as: 'user_books'
});

User.belongsToMany(Books, {through: {
    model: UserBooks,
    unique: false
  },
  as: 'books_user'
});

module.exports = {Author, Books, Tags, AuthorBooks, TagBooks, User, UserBooks};