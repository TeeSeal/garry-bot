const Intent = require('../struct/Intent.js');

class CategorySpendingsIntent extends Intent {
    constructor(handler) {
        super(handler, 'category_spendings');
    }

    exec(data, res) {
        let { accountName, category, fromDate } = data.params;
        category = this.client.bank.findCategory(category);

        if (!category) return res.addMessage('There is no such category.').send();

        if (!accountName) {
            const replies = this.client.bank.accounts.map(acc => ({ title: acc.name, payload: `category_spendings: ${category}; ${acc.name}; ${fromDate}` }));
            return res
                .addQuickReply('For which account?', replies)
                .send();
        }


        const account = this.client.bank.accounts.find('name', accountName);
        if (!account) return res.addMessage('Sorry, couldn\'t find such an account.').send();

        const transactions = this.client.bank.filterTransactions({ fromDate, account, category });
        const amount = transactions.reduce((am, tr) => am + tr.amount, 0).toFixed(2);
        let response = `Your spent ${amount} ${account.currencyCode} on ${category}`;

        if (fromDate) response += ` since ${fromDate}.`;
        else response += ' in total.';

        res.addMessage(response).send();
    }
}

module.exports = CategorySpendingsIntent;
