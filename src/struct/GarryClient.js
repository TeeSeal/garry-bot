const WebhookServer = require('./WebhookServer.js');
const Bank = require('./Bank.js');
const SequelizeDatabase = require('../db/SequelizeDatabase.js');
const IntentHandler = require('./IntentHandler.js');
const { EventEmitter } = require('events');

class GarryClient extends EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.db = null;
        this.bank = null;
        this.server = null;
        this.intentHandler = null;
    }

    async init() {
        this.db = await new SequelizeDatabase(this.config.databasePath).init();
        this.bank = new Bank(this, this.db).init();
        this.server = await new WebhookServer(this, this.config.port).init();
        this.intentHandler = new IntentHandler(this, this.config.intentsPath).init();
        return this;
    }

    handleMessage(req, res) {
        this.intentHandler.handleIntent(req, res);
    }
}

module.exports = GarryClient;
