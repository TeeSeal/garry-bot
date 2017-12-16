class Account {
    constructor(bank, opts) {
        this.bank = bank;
        this.id = opts.id;
        this.name = opts.name;
        this.currencyCode = opts.currencyCode;
        this.balance = opts.balance;
        this.availableAmount = opts.extra ? opts.extra.availableAmount : opts.availableAmount;
        this.blockedAmount = opts.extra ? opts.extra.blockedAmount : opts.blockedAmount;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            currencyCode: this.currencyCode,
            balance: this.balance,
            availableAmount: this.availableAmount,
            blockedAmount: this.blockedAmount,
        };
    }
}

module.exports = Account;
