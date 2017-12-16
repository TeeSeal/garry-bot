const GarryClient = require('./src/struct/GarryClient.js');
const config = require('./config.json');

new GarryClient(config).init();
