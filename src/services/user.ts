import { db as database } from "../db";
import { usersTable } from "../schemas/user";
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import Bcrypt from "../utils/bcrypt";
import { eq } from "drizzle-orm";
class UserService {
    private database: any;

    constructor() {
        this.database = database;
    }

    async createUser(payload: { name: string, role: string, password: string }) {
        const bcrypt = new Bcrypt();
        const hashedPassword = await bcrypt.hashPassword(payload.password);
        const user = {
            name: payload.name,
            role: payload.role,
            password: hashedPassword,
        }
        const result = await this.database.insert(usersTable).values(user).returning({ insertedId: usersTable.id });
        return result;
    }

    async getUserByName(name: string) {
        const result = await this.database.query.usersTable.findFirst({
            where: eq(usersTable.name, name),
        });
        return result;
    }
}

export default UserService;