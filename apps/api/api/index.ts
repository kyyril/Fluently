const app = require('../src/server').default;

module.exports = (req, res) => {
    return app(req, res);
};
