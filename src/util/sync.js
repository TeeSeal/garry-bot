const Bank = require('../struct/Bank.js');
const SequelizeDatabase = require('../db/SequelizeDatabase.js');
const config = require('../../config.json');

new SequelizeDatabase(config.databasePath).init().then(db => {
    const bank = new Bank(null, db).initJSON();
    bank.sync().then(() => {
        console.log('DONE!');
        process.exit();
    });
});

