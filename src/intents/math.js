const Intent = require('../struct/Intent.js');

class MathIntent extends Intent {
    constructor(handler) {
        super(handler, 'math');
    }

    exec(data, respond) {
        const eq = data.params.equation;
        if (!eq) return respond('What are you trying to calculate?');

        let result;
        try {
            result = eval(eq);
        } catch (err) {
            result = 'Sorry, that is not a valid equation.';
        }

        return respond(result);
    }
}

module.exports = MathIntent;
