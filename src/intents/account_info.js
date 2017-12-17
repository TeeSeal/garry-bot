const Intent = require('../struct/Intent.js');

class AccountInfoIntent extends Intent {
    constructor(handler) {
        super(handler, 'account_info');
    }

    exec(data, res) {
        const accountName = data.params.account;
        if (!accountName) {
            const replies = this.client.bank.accounts.map(acc => ({ title: acc.name, payload: `account: ${acc.name}` }));
            return res
                .addQuickReply('For which account?', replies)
                .send();
        }

        const account = this.client.bank.accounts.find('name', accountName);
        if (!account) return res.addMessage('Sorry, couldn\'t find such an account.').send();

        const response = [
            `Number: ${account.id}`,
            `Name: ${account.name}`,
            `Balance: ${account.balance} ${account.currencyCode}`,
        ];

        if (account.availableAmount) response.push(`Available Amount: ${account.availableAmount} ${account.currencyCode}`);
        if (account.blockedAmount) response.push(`Blocked Amount: ${account.availableAmount} ${account.currencyCode}`);
        response.push(`Transactions: ${account.transactions.size}`);

        res.addMessage(response.join('\n')).send();
    }
}

module.exports = AccountInfoIntent;
