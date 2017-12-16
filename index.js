const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST request received.');
});

app.listen(port, () => console.log(`Listening on ${port}`));
