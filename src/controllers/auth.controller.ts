import Bcrypt from "../utils/bcrypt";
import UserService from "../services/user";

class AuthController {
    private bcrypt: Bcrypt;
    private userService: UserService;

    constructor() {
        this.bcrypt = new Bcrypt();
        this.userService = new UserService();
    }

    async login(payload: { name: string, password: string }) {
        const user = await this.userService.getUserByName(payload.name);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await this.bcrypt.verifyPassword(payload.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        
        return user;
    }
}

export default AuthController;