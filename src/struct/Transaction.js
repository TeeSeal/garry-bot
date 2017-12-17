const moment = require('moment');

class Transaction {
    constructor(bank, accountID, opts) {
        this.bank = bank;
        this.id = opts.id;
        this.accountID = accountID;

        this.madeOn = moment(opts.madeOn);
        this.amount = opts.amount;
        this.currencyCode = opts.currencyCode;
        this.description = opts.description;
        this.mode = opts.mode;
        this.category = opts.extra ? opts.extra.originalCategory : opts.category;
    }

    get jsonDate() {
        return this.madeOn.format().split('T')[0];
    }

    toJSON() {
        return {
            id: this.id,
            accountID: this.accountID,
            madeOn: this.jsonDate,
            amount: this.amount,
            currencyCode: this.currencyCode,
            description: this.description,
            mode: this.mode,
            category: this.category,
        };
    }
}

module.exports = Transaction;
