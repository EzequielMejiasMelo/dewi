const { Mode, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

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
        },
    },
    
)

module.exports = Tags;