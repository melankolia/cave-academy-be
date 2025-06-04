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

            const { data: { user }, token } = await this.authService.login(name, password);

            // Set HttpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Only over HTTPS in production
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            return res.status(200).json({
                status: 'success',
                message: 'Logged in',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    };
}

export default AuthController;