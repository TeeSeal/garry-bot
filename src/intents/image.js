const Intent = require('../struct/Intent.js');

class ImageIntent extends Intent {
    constructor(handler) {
        super(handler, 'image');
    }

    exec(data, res) {
        return res
            .addImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/1200px-Bucephala-albeola-010.jpg')
            .addMessage('Hello')
            .addMessage('There')
            .addFile('http://www.pdf995.com/samples/pdf.pdf')
            .send();
    }
}

module.exports = ImageIntent;
