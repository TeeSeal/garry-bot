const Sequelize = require('sequelize');

module.exports = {
    accounts: {
        schema: {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            name: Sequelize.STRING,
            currencyCode: Sequelize.STRING,
            balance: Sequelize.FLOAT,
            availableAmount: Sequelize.FLOAT,
            blockedAmount: Sequelize.FLOAT,
        },
        cacheOnInit: true,
    },

    transactions: {
        schema: {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            accountID: Sequelize.STRING,
            madeOn: Sequelize.STRING,
            amount: Sequelize.FLOAT,
            currencyCode: Sequelize.STRING,
            description: Sequelize.STRING,
            mode: Sequelize.STRING,
            category: Sequelize.STRING,
        },
        cacheOnInit: true,
    },
};
