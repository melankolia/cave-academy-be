import JsonWebToken from "../utils/jwt";
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError, JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
    user?: JwtPayload | string;
}

class Verification {
    static verifyToken(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json({ 
                status: 'error',
                error: 'Access denied',
                message: 'No token provided'
            });
            return;
        }

        try {
            const jsonWebToken = new JsonWebToken();
            const decoded = jsonWebToken.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                res.status(401).json({ 
                    status: 'error',
                    error: 'Token has expired',
                    message: 'Please log in again to get a new token'
                });
                return;
            }
            if (err instanceof JsonWebTokenError) {
                res.status(403).json({ 
                    status: 'error',
                    error: 'Invalid token',
                    message: 'The provided token is invalid'
                });
                return;
            }
            console.error('Token verification error:', err);
            res.status(500).json({ 
                status: 'error',
                error: 'Internal server error',
                message: 'An error occurred while verifying the token'
            });
            return;
        }
    }
}

export default Verification;