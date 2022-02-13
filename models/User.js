const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user',
        tableName: 'users'
    }
);

module.exports = User;