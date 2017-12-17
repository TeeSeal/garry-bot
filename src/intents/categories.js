const Intent = require('../struct/Intent.js');

class CategoriesIntent extends Intent {
    constructor(handler) {
        super(handler, 'categories');
    }

    exec(data, res) {
        const categories = this.client.bank.transactionCategories;
        res.addMessage(categories.join(', ')).send();
    }
}

module.exports = CategoriesIntent;
