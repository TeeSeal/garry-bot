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

    static sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
}

module.exports = Util;
