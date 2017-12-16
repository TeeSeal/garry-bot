const moment = require('moment');

class Transaction {
    constructor(account, opts) {
        this.checksum = opts.checksum;
        this.account = account;

        this.madeOn = moment(opts.made_on);
        this.amount = opts.amount;
        this.currencyCode = opts.currency_code;
        this.description = opts.description;
        this.mode = opts.mode;
        this.categroy = opts.extra.original_category;
    }
}

module.exports = Transaction;
