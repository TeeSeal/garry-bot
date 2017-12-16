class Response {
    constructor(res) {
        this.res = res;
        this.messages = [];
    }

    addMessage(speech) {
        this.messages.push({ type: 0, speech });
        return this;
    }

    addImage(imageUrl) {
        this.messages.push({ type: 3, imageUrl });
        return this;
    }

    addFile(file) {
        this.messages.push({
            type: 4,
            payload: {
                facebook: {
                    attachment: {
                        type: 'file',
                        payload: { url: file },
                    },
                },
            },
        });
        return this;
    }

    send() {
        return this.res.send({ messages: this.messages });
    }
}

module.exports = Response;
