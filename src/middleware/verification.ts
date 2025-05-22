import JsonWebToken from "../utils/jwt";
import { Request, Response, NextFunction } from 'express';

class Verification {
    static async verifyToken(req: Request, res: Response, next: NextFunction) {

        const token = req.cookies?.token;

        console.log(token);
        if (!token) return res.status(401).json({ error: 'Access denied' });

        try {
          const jsonWebToken: JsonWebToken = new JsonWebToken();

          const decoded = jsonWebToken.verify(token);
          req.user = decoded;
          next();
        } catch (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
    }
}

export default Verification;