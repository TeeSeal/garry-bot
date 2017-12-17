const Intent = require('../struct/Intent.js');
const Plot = require('../struct/Plot.js');
const { uniq } = require('../struct/Util.js');

class CategorizeIntent extends Intent {
    constructor(handler) {
        super(handler, 'categorize');
    }

    exec(data, res) {
        const { accountName, fromDate, toDate } = data.params;
        if (!accountName) {
            const replies = this.client.bank.accounts.map(acc => ({ title: acc.name, payload: `categorize: ${acc.name}; ${fromDate} ${toDate}` }));
            return res
                .addQuickReply('For which account?', replies)
                .send();
        }

        const account = this.client.bank.accounts.find('name', accountName);
        const transactions = this.client.bank.filterTransactions({ fromDate, toDate, account });
        const categories = uniq(transactions.map(t => t.category.replace('&', 'and')));
        const values = categories.map(cat => {
            return transactions.filter(t => t.category === cat && t.amount < 0)
                .reduce((amount, tr) => amount + Math.abs(tr.amount), 0);
        });

        Plot.plotPie(values, categories).then(url => {
            return res.addImage(url).send();
        });
    }
}

module.exports = CategorizeIntent;
