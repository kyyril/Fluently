// Vercel Serverless Function Entry Point
module.exports = async (req, res) => {
    try {
        const app = require('../src/server').default;
        return app(req, res);
    } catch (error) {
        console.error('STARTUP ERROR:', error);
        res.status(500).json({
            error: 'App failed to start',
            message: error.message,
            stack: error.stack
        });
    }
};
