const Intent = require('../struct/Intent.js');
const { uniq } = require('../struct/Util.js');

class CategoriesIntent extends Intent {
    constructor(handler) {
        super(handler, 'categories');
    }

    exec(data, res) {
        const response = this.client.bank.transactionCategories.join(', ');
        return res.addMessage(response).send();
    }
}

module.exports = CategoriesIntent;
