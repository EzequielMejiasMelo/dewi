const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class TagBooks extends Model { };

//Tags requires ID and Tag Name
TagBooks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
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
        modelName: 'tagbook',
        tableName: 'tagbooks',
    }
)

module.exports = TagBooks;