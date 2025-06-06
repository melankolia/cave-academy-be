import jwt, { JwtPayload } from 'jsonwebtoken';

class JsonWebToken {
    private secretKey: string;
    private expiresIn: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'secret';
        this.expiresIn = '1h';
    }

    sign(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    verify(token: string): string | JwtPayload {
        return jwt.verify(token, this.secretKey);
    }
}

export default JsonWebToken;
