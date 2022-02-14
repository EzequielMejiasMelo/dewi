const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class UserBooks extends Model { };

//Tags requires ID and Tag Name
UserBooks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
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
        modelName: 'userbooks',
        tableName: 'userbooks',
    }
);

module.exports = UserBooks;