import 'dotenv/config';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable, usersRelations } from '../schemas/user';
import { newsTable, newsRelations } from '../schemas/news';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const schema = {
  usersTable,
  newsTable,
  usersRelations,
  newsRelations
};

const db = drizzle(pool, { schema });

export { db };