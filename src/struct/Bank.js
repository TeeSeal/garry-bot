const data = require('../../assets/data.json');
const Collection = require('./Collection.js');
const Account = require('./Account.js');
const Transaction = require('./Transaction.js');
const Util = require('./Util.js');
const moment = require('moment');
class Bank {
    constructor(client, db) {
        this.client = client;
        this.db = db;
        this.accounts = new Collection();
        this.transactions = new Collection();
    }

    init() {
        for (const acc of this.db.accounts.items.values()) {
            if (!acc.id) acc.id = this.generateAccountID();
            const account = new Account(this, acc);
            this.accounts.set(account.id, account);

            const transactions = this.db.transactions.items.filter(t => t.accountID === account.id);
            for (const tr of transactions.values()) {
                if (!tr.id) tr.id = this.generateTransactionID();
                const transaction = new Transaction(this, account.id, tr);
                this.transactions.set(transaction.id, transaction);
            }
        }

        return this;
    }

    initJSON() {
        for (const acc of data.data.accounts) {
            if (!acc.id) acc.id = this.generateAccountID();
            const account = new Account(this, acc);
            this.accounts.set(account.id, account);

            for (const tr of acc.transactions) {
                if (!tr.id) tr.id = this.generateTransactionID();
                const transaction = new Transaction(this, account.id, tr);
                this.transactions.set(transaction.id, transaction);
            }
        }

        return this;
    }

    generateAccountID() {
        const id = Array.from({ length: 12 }, () => Util.randInt()).join('');
        if (this.accounts.has(id)) return this.generateAccountID();
        return id;
    }

    generateTransactionID() {
        const id = Array.from({ length: 15 }, () => Util.randInt()).join('');
        if (this.transactions.has(id)) return this.generateTransactionID();
        return id;
    }

    async sync() {
        for (const account of this.accounts.values()) {
            await this.db.accounts.set(account.id, account.toJSON());
        }

        for (const transaction of this.transactions.values()) {
            await this.db.transactions.set(transaction.id, transaction.toJSON());
        }

        return true;
    }

    get transactionCategories() {
        return Util.uniq(this.client.bank.transactions.map(t => t.category));
    }

    filterTransactions(opts) {
        if (opts.date) {
            const date = moment(date, 'DD-MM-YYYY');
            return this.transactions.filter(t => t.madeOn === date);
        }

        let transactions = this.transactions;

        if (opts.fromDate) {
            const fromDate = moment(opts.fromDate, 'DD-MM-YYYY');
            transactions.filter = transactions.filter(t => t.madeOn > fromDate);
        }

        if (opts.toDate) {
            const toDate = moment(opts.toDate, 'DD-MM-YYYY');
            transactions = transactions.filter(t => t.madeOn < toDate);
        }

        if (opts.account) transactions = transactions.filter(t => t.accountID === opts.account.id);
        if (opts.category) transactions = transactions.filter(t => t.category === opts.category);

        return transactions;
    }
}

module.exports = Bank;
