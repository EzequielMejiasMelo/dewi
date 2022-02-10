const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Author extends Model {};

Author.init(
    {
        author_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'author',
        tableName: 'authors'
    }
);

module.exports = Author;