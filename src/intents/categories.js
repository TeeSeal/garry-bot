const Intent = require('../struct/Intent.js');
const { uniq } = require('../struct/Util.js');

class CategoriesIntent extends Intent {
    constructor(handler) {
        super(handler, 'categories');
    }

    exec(data, respond) {
        console.log(data);
        const categories = this.client.bank.transactions.map(t => t.category);
        const response = uniq(categories).join(', ');
        return respond(response);
    }
}

module.exports = CategoriesIntent;
