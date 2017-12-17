const axios = require('axios');
const xml2js = require('xml2js');
axios.get('https://bnm.md/en/official_exchange_rates?date=17.12.2017').then(res => {
    xml2js.parseString(res.data, (err, p) => {
        if (err) throw err;
        console.log(p.ValCurs.Valute.map(v => [v.CharCode[0], v.Value[0]]));
    });
});
