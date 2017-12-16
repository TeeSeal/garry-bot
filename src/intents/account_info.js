const Intent = require('../struct/Intent.js');

class AccountInfoIntent extends Intent {
    constructor(handler) {
        super(handler, 'account_info');
    }

    exec(data, respond) {
        const accountName = data.params.account;
        if (!accountName) return respond('What account do you want information on?');
        const account = this.client.bank.accounts.find('name', accountName);
        if (!account) return respond('Sorry, couldn\'t find such an account.');

        const response = [
            `Number: ${account.id}`,
            `Name: ${account.name}`,
            `Balance: ${account.balance} ${account.currencyCode}`,
        ];

        if (account.availableAmount) response.push(`Available Amount: ${account.availableAmount} ${account.currencyCode}`);
        if (account.blockedAmount) response.push(`Blocked Amount: ${account.availableAmount} ${account.currencyCode}`);
        response.push(`Transactions: ${account.transactions.size}`);

        respond(response.join('\n'));
    }
}

module.exports = AccountInfoIntent;
