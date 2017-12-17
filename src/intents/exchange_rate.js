const axios = require('axios');
const xml2js = require('xml2js');

const Intent = require('../struct/Intent.js');

class ExchangeRateIntent extends Intent {
    constructor(handler) {
        super(handler, 'exchange_rate');
    }

    exec(data, res) {
        const { from, to, amount } = data.params;

        axios.get('https://bnm.md/en/official_exchange_rates?date=17.12.2017').then(r => {
            xml2js.parseString(r.data, (err, p) => {
                if (err) throw err;
                const rates = p.ValCurs.Valute.map(v => [v.CharCode[0], parseFloat(v.Value[0])]);

                if (!to) return res.addMessage(rates.map(rate => rate.join(': ')).join('\n')).send();
                const toRate = rates.find(rate => rate[0] === to)[1];
                const fromRate = from && from !== 'MDL' ? rates.find(rate => rate[0] === from)[1] : 1;
                const amnt = parseInt(amount) || 1;

                return res.addMessage(`${amnt} ${to} is currently ${(toRate / fromRate * amnt).toFixed(4)} ${from}`).send();
            });
        });
    }
}

module.exports = ExchangeRateIntent;
