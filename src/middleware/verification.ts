import JsonWebToken from "../utils/jwt";
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

class Verification {
    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({ error: 'Access denied' });

        try {
            const jsonWebToken: JsonWebToken = new JsonWebToken();
            const decoded = jsonWebToken.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ 
                    error: 'Token has expired',
                    message: 'Please log in again to get a new token'
                });
            }
            if (err instanceof JsonWebTokenError) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default Verification;