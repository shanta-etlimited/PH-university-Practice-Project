import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
};
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
};


