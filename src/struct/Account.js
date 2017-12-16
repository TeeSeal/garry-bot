class Account {
    constructor(opts) {
        this.name = opts.name;
        this.currencyCode = opts.currency_code;
        this.balance = opts.balance;

        this.extra = {
            availableAmount: opts.extra.available_amount,
            blockedAmount: opts.extra.blocked_amount,
        };

        this.transactions = null;
    }

    setTransactions(transactions) {
        this.transactions = transactions;
    }
}

module.exports = Account;
