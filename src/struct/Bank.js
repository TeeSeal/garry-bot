const data = require('../../assets/data.json');
const Collection = require('./Collection.js');
const Account = require('./Account.js');
const Transaction = require('./Transaction.js');

class Bank {
    constructor() {
        this.accounts = new Collection();
        this.transactions = new Collection();
    }

    init() {
        for (const opts of data.data.accounts) {
            const account = new Account(opts);
            const transactions = new Collection(
                opts.transactions.map(t => [t.checksum, new Transaction(account, t)])
            );

            account.setTransactions(transactions);
            this.accounts.set(account.name, account);
            this.transactions = this.transactions.concat(transactions);
        }

        return this;
    }
}

module.exports = new Bank().init();
