const Intent = require('../struct/Intent.js');

class CustomTransactionsIntent extends Intent {
    constructor(handler) {
        super(handler, 'custom_transactions');
    }

    exec(data, res) {
        const { fromDate, toDate, date, accountName } = data.params;
        const account = accountName ? this.client.bank.accounts.find('name', accountName) : null;
        let transactions = this.client.bank.filterTransactions({ date, fromDate, toDate, account });

        const response = transactions.map(t => `[${t.jsonDate}] ${t.description.slice(0, 15)}... | ${t.amount} ${t.currencyCode}`).reverse().slice(0, 10).join('\n');
        res
            .addMessage('Here are your last 10 transactions from that period:')
            .addMessage(response)
            .send();
    }
}

module.exports = CustomTransactionsIntent;
