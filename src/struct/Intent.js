class Intent {
    constructor(handler, id) {
        this.id = id;
        this.client = handler.client;
        this.handler = handler;
    }

    exec(data, respond) {
        respond('Sorry, didn\'t get that.');
    }
}

module.exports = Intent;
