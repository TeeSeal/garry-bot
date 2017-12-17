const plotly = require('plotly')({
    username: 'MihaiGaidau',
    apiKey: 'wrCKH6AvHdo9LSITUjAL',
});
// const plot = require('util').promisify(plotly.plot);

class Plot {
    static plotPie(values, labels) {
        return new Promise((resolve, reject) => {
            const data = [{ values, labels, type: 'pie' }];

            const layout = {
                height: 1000,
                width: 1200,
                fileopt: 'overwrite',
                filename: 'simple-node-example',
            };

            plotly.plot(data, layout, (err, msg) => {
                if (err) return reject(err);
                return resolve(`${msg.url}.png`);
            });
        });
    }
}

module.exports = Plot;
