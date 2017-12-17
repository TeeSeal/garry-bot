const chrono = require('chrono-node');
const moment = require('moment');

class Util {
    static randInt() {
        return Math.floor((Math.random() * (9 - 0)) + 0);
    }

    static deepFreeze(obj) {
        Object.values(obj)
            .filter(value => value instanceof Object)
            .forEach(value => Util.deepFreeze(value));
        Object.freeze(obj);

        return obj;
    }

    static uniq(array) {
        return array.filter((element, index) => array.indexOf(element) === index);
    }

    static parseDate(string) {
        let date = moment(string, 'DD-MM-YYYY');
        if (date.isValid()) return date;

        date = chrono.parseDate(string);
        return moment(date);
    }
}

module.exports = Util;
