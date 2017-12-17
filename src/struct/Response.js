class Response {
    constructor(res) {
        this.res = res;
        this.messages = [];
        this.followupEvent = {};
    }

    addMessage(speech) {
        this.messages.push({ type: 0, speech });
        return this;
    }

    addCard(opts) {
        this.messages.push({
            type: 1,
            imageUrl: opts.imageUrl,
            buttons: opts.buttons,
            title: opts.title,
            subtitle: opts.subtitle,
        });
        return this;
    }

    addQuickReply(title, replies) {
        this.messages.push({
            type: 4,
            payload: {
                facebook: {
                    text: title,
                    quick_replies: replies.map(re => ({ content_type: 'text', title: re.title, payload: re.payload })),
                },
            },
        });
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

    setFollowupEvent(opts) {
        this.followupEvent = opts;
        return this;
    }

    send() {
        return this.res.send({ messages: this.messages, followupEvent: this.followupEvent });
    }
}

module.exports = Response;
