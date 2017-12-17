const Intent = require('../struct/Intent.js');
const _ = require('lodash');
const Plot = require('../struct/Plot.js');

class SpendingGraphIntent extends Intent {
    constructor(handler) {
        super(handler, 'spending_graph');
    }

    exec(data, res) {
        const { accountName, fromDate, toDate } = data.params;
        if (!accountName) {
            const replies = this.client.bank.accounts.map(acc => ({ title: acc.name, payload: `spending_graph: ${acc.name}; ${fromDate} ${toDate}` }));
            return res
                .addQuickReply('For which account?', replies)
                .send();
        }

        const account = this.client.bank.accounts.find('name', accountName);
        const transactions = this.client.bank.filterTransactions({ fromDate, toDate, account })
            .filter(t => t.amount < 0);

        const grouped = _.groupBy(transactions.array(), tr => `${tr.madeOn.year()}-${tr.madeOn.month()}`);

        const labels = Object.keys(grouped);
        const values = Object.values(grouped).map(trs => {
            return trs.reduce((am, t) => am + Math.abs(t.amount), 0);
        });

        Plot.plotLine(labels, values).then(url => {
            return res.addImage(url).send();
        });
    }
}

module.exports = SpendingGraphIntent;
