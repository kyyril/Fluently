import express from 'express';
import app from '../src/server';

const debugApp = express();

// Pasang aplikasi utama di bawah prefix /api jika diperlukan, 
// atau langsung saja jalankan server.
debugApp.use('/', app);

export default debugApp;
