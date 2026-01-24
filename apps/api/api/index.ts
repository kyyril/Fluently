// api/index.ts
// Bulletproof Handler: Memastikan error ditangkap dan ditampilkan ke browser
module.exports = async (req, res) => {
    try {
        console.log('--- Vercel Function Started ---');

        // Lazy load server: Jika ada error di config/env/database, akan tertangkap di sini
        const appModule = require('../src/server');
        const app = appModule.default || appModule;

        // Jalankan aplikasi
        return app(req, res);
    } catch (error) {
        console.error('Vercel Entry Point Error:', error);

        // Kembalikan error sebagai JSON agar Anda tahu apa yang rusak
        res.status(500).json({
            error: 'Backend Crash during initialization',
            message: error.message,
            stack: error.stack,
            hint: 'Cek environment variables di Vercel Dashboard.'
        });
    }
};
