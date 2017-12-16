const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const bank = require('./src/struct/Bank.js');

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hi there'));
app.post('/', (req, res) => {
    console.log(req.body);

    const accCount = bank.accounts.size;
    const names = bank.accounts.map(acc => acc.name).join(', ');
    res.send({ speech: `You have ${accCount} accounts: ${names}.` });
});

app.listen(port, () => console.log(`Listening on ${port}`));
