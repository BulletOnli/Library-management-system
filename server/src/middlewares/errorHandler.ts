import { Request, Response, NextFunction } from "express";

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode || 500;

    res.status(statusCode).json({
        error: {
            message: error.message,
            stack: error.stack,
        },
    });
};

export default errorHandler;
