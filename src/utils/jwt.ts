import jwt from 'jsonwebtoken';

class JsonWebToken {
    private secretKey: string;
    private expiresIn: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'secret';
        this.expiresIn = '1h';
    }

    async sign(payload: any) {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    async verify(token: string) {
        return jwt.verify(token, this.secretKey);
    }
}

export default JsonWebToken;
