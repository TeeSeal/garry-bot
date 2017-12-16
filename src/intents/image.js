const Intent = require('../struct/Intent.js');

class ImageIntent extends Intent {
    constructor(handler) {
        super(handler, 'image');
    }

    exec(data, res) {
        return res
            .addCard({
                imageUrl: 'http://i0.kym-cdn.com/photos/images/original/001/248/525/3e4.jpg',
                title: 'BananaDuck',
                subtitle: 'Just look at it!',
                buttons: [
                    {
                        postback: 'https://youtu.be/',
                        text: 'Go To Youtube',
                    },
                ],
            })
            .send();
    }
}

module.exports = ImageIntent;
