import { Request, Response } from 'express';
import AuthService from "../services/auth.service";
import { handleError } from '../utils/errorHandler';

class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async login(req: Request, res: Response) {
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Name and password are required'
                });
            }

            const token = await this.authService.login(name, password);

            // Set HttpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Only over HTTPS in production
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000 // 1 hour
            });

            return res.status(200).json({
                status: 'success',
                message: 'Logged in'
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    };
}

export default AuthController;