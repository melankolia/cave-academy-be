import { Response } from 'express';
import { AppError, NotFoundError, BadRequestError } from './errors';

export const handleError = (error: Error, res: Response) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    }

    if (error instanceof NotFoundError) {
        return res.status(404).json({
            status: 'error',
            message: error.message
        });
    }

    if (error instanceof BadRequestError) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }

    console.error('Unexpected error:', error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}; 