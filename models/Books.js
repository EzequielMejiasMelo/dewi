const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Books extends Model {};

Books.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'book',
        tableName: 'books',
    }
)

module.exports = Books;