const Collection = require('./Collection');
const fs = require('fs');
const path = require('path');

class IntentHandler {
    constructor(client, intentsPath) {
        this.client = client;
        this.intentsPath = intentsPath;
        this.intents = new Collection();
    }

    init() {
        const files = fs.readdirSync(this.intentsPath);
        const constructors = files.map(file => require(path.join('../..', this.intentsPath, file)));

        for (const constructor of constructors) {
            const instance = new constructor(this);
            this.intents.set(instance.id, instance);
        }

        return this;
    }

    handleIntent(req, res) {
        const intentName = req.body.result.metadata.intentName;
        const intent = this.intents.get(intentName);
        if (!intent) return null;

        const data = this.parse(req.body.result);
        return intent.exec(data, speech => res.send({ speech }));
    }

    parse(result) {
        return {
            text: result.resolvedQuery,
            params: result.parameters,
        };
    }
}

module.exports = IntentHandler;
