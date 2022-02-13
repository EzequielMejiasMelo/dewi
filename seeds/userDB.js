const User = require('../models/User');
const sequelize = require('../config/config');

const userData = require('./userSeeds.json');

const createTable = async () => {
    await sequelize.sync({ force: true });

    const users = await User.createTable(userData, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0);

}

createTable();