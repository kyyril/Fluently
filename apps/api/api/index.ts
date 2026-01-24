import { Request, Response } from 'express';
import app from '../src/server';

// Wrapper to catch execution errors
const handler = async (req: Request, res: Response) => {
    try {
        // App is already loaded via static import (ensures bundling)
        return app(req, res);
    } catch (error: any) {
        console.error('CRITICAL RUNTIME ERROR:', error);
        res.status(500).json({
            error: 'Server failed within handler',
            message: error.message,
            stack: error.stack
        });
    }
};

// CRITICAL: Force CommonJS export for Vercel
module.exports = handler;
