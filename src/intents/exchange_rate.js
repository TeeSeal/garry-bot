const axios = require('axios');
const xml2js = require('xml2js');
const moment = require('moment');

const Intent = require('../struct/Intent.js');

class ExchangeRateIntent extends Intent {
    constructor(handler) {
        super(handler, 'exchange_rate');
    }

    exec(data, res) {
        const { from, to, amount, date } = data.params;
        let d = moment(date);
        if (!d.isValid()) d = moment();

        axios.get(`https://bnm.md/en/official_exchange_rates?date=${d.format('DD.MM.YYYY')}`).then(r => {
            xml2js.parseString(r.data, (err, p) => {
                if (err) throw err;
                const rates = p.ValCurs.Valute.map(v => [v.CharCode[0], parseFloat(v.Value[0])]);

                if (!from && !to) return res.addMessage(rates.map(rate => rate.join(': ')).join('\n')).send();
                const toRate = to && to !== 'MDL' ? rates.find(rate => rate[0] === to)[1] : 1;
                const fromRate = from && from !== 'MDL' ? rates.find(rate => rate[0] === from)[1] : 1;
                const amnt = parseInt(amount) || 1;

                return res.addMessage(`${amnt} ${from} = ${(fromRate / toRate * amnt).toFixed(4)} ${to || 'MDL'}`).send();
            });
        });
    }
}

module.exports = ExchangeRateIntent;
