const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class AuthorBooks extends Model { };

//Tags requires ID and Tag Name
AuthorBooks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'author',
                key: 'id',
              },
              onDelete: "CASCADE"
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id',
              },
              onDelete: "CASCADE"
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'authorbook',
        tableName: 'authorbooks',
    }
)

module.exports = AuthorBooks;