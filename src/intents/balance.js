const Intent = require('../struct/Intent.js');

class BalanceIntent extends Intent {
    constructor(handler) {
        super(handler, 'balance');
    }

    exec(data, respond) {
        const accountName = data.params.account;
        const account = accountName
            ? this.client.bank.accounts.find('name', accountName)
            : this.client.bank.accounts.first();


        if (!account) return respond('Sorry, couldn\'t find that account.');
        return respond(`The balance of your ${account.name} account is ${account.balance} ${account.currencyCode}`);
    }
}

module.exports = BalanceIntent;
