import JsonWebToken from "../utils/jwt";
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

class Verification {
    static verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ 
                status: 'error',
                error: 'Access denied',
                message: 'No token provided'
            });
        }

        try {
            const jsonWebToken = new JsonWebToken();
            const decoded = jsonWebToken.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ 
                    status: 'error',
                    error: 'Token has expired',
                    message: 'Please log in again to get a new token'
                });
            }
            if (err instanceof JsonWebTokenError) {
                return res.status(403).json({ 
                    status: 'error',
                    error: 'Invalid token',
                    message: 'The provided token is invalid'
                });
            }
            console.error('Token verification error:', err);
            return res.status(500).json({ 
                status: 'error',
                error: 'Internal server error',
                message: 'An error occurred while verifying the token'
            });
        }
    }
}

export default Verification;