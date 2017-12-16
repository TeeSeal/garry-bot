const Intent = require('../struct/Intent.js');

class MathIntent extends Intent {
    constructor(handler) {
        super(handler, 'math');
    }

    exec(data, res) {
        const eq = data.params.equation;
        if (!eq) return res.addMessage('What are you trying to calculate?').send();

        let result;
        try {
            result = eval(eq).toString();
        } catch (err) {
            result = 'Sorry, that is not a valid equation.';
        }

        return res.addMessage(result).send();
    }
}

module.exports = MathIntent;
