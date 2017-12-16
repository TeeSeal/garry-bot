const express = require('express');
const bodyParser = require('body-parser');

class WebhookServer {
    constructor(client, port) {
        this.client = client;
        this.port = process.env.PORT || port;
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.post('/', (req, res) => this.client.handleMessage(req, res));
    }

    init() {
        return new Promise(resolve => {
            this.app.listen(this.port, () => {
                console.log(`Listening on ${this.port}`);
                resolve(this);
            });
        });
    }
}

module.exports = WebhookServer;
