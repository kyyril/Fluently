// api/index.ts
// Native Vercel Function Entry Point
// Zero configuration required in vercel.json for this to work.

const app = require('../src/server').default;

module.exports = (req, res) => {
    return app(req, res);
};
