const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Tags extends Model {};

//Tags requires ID and Tag Name
Tags.init(
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, 
        },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'tag',
      tableName: 'tags',
    }
)

module.exports = Tags;