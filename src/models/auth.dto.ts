import { User } from "./user.dto";

export interface LoginResponse {
    data: {
        user: Omit<User, 'password'>; 
    },
    token?: string;
}