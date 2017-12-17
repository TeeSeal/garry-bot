const Intent = require('../struct/Intent.js');
const Plot = require('../struct/Plot.js');

class CategoriesIntent extends Intent {
    constructor(handler) {
        super(handler, 'categories');
    }

    exec(data, res) {
        const categories = this.client.bank.transactionCategories;
        const values = categories.map(cat => this.client.bank.transactions.filter(t => t.category === cat).size);

        Plot.plotPie(values, categories).then(url => {
            return res.addImage(url).send();
        });
    }
}

module.exports = CategoriesIntent;
