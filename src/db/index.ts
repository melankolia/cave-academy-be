import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable, usersRelations } from '../schemas/user';
import { newsTable, newsRelations } from '../schemas/news';
import { eventTable, eventRelations } from '../schemas/event';
import { courseTable, courseRelations, contentCoveredTable, contentCoveredRelations } from '../schemas/course';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const schema = {
  usersTable,
  newsTable,
  eventTable,
  courseTable,
  contentCoveredTable,
  usersRelations,
  newsRelations,
  eventRelations,
  courseRelations,
  contentCoveredRelations
};

const db = drizzle(pool, { schema });

export { db };