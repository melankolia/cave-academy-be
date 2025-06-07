import UserRepository from "../repositories/user";
import Bcrypt from "../utils/bcrypt";
import JsonWebToken from "../utils/jwt";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { LoginResponse } from "../models/auth.dto";

class AuthService {
    private userRepository: UserRepository;
    private jsonWebToken: JsonWebToken;
    private bcrypt: Bcrypt;

    constructor(userRepository: UserRepository, jsonWebToken: JsonWebToken) {
        this.userRepository = userRepository;
        this.jsonWebToken = jsonWebToken;
        this.bcrypt = new Bcrypt();
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            const user = await this.userRepository.findByUsername(username);

            if (!user) {
                throw new NotFoundError('User not found');
            }

            const isPasswordValid = await this.bcrypt.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new BadRequestError('Invalid credentials');
            }

            const token = await this.jsonWebToken.sign({ username, id: user.id });
            return {
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        role: user.role
                    }
                },
                token
            };

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error;
            }

            // Log unexpected errors for debugging
            console.error('Authentication error:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
                username: username
            });

            // Always return a generic error message to the client for security
            throw new BadRequestError('Authentication failed');
        }
    }
}

export default AuthService;