// Minimal test - tidak import apapun yang kompleks
module.exports = (req, res) => {
    res.status(200).json({
        message: 'Vercel Function is working!',
        timestamp: new Date().toISOString(),
        path: req.url
    });
};
