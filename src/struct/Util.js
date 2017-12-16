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
}

module.exports = Util;
