const Intent = require('../struct/Intent.js');

class BalanceIntent extends Intent {
    constructor(handler) {
        super(handler, 'balance');
    }

    exec(data, res) {
        const accountName = data.params.account;
        const account = accountName ? this.client.bank.accounts.find('name', accountName) : null;

        if (account) {
            return res.addMessage(`The balance of your ${account.name} account is ${account.balance} ${account.currencyCode}`).send();
        }

        const balances = this.client.bank.accounts.map(acc => `${acc.name}: ${acc.balance} ${acc.currencyCode}`);
        res.addMessage(`Here are your account balances:\n${balances.join('\n')}`).send();
    }
}

module.exports = BalanceIntent;
