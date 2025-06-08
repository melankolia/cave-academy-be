import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable, usersRelations } from '../schemas/user';
import { newsTable, newsRelations } from '../schemas/news';
import { eventTable, eventRelations } from '../schemas/event';
import { courseTable, contentCoveredTable, courseRelations, contentCoveredRelations, subContentTable, subCourseTable, subContentRelations, subCourseRelations } from '../schemas/course';
import { wikiTable, topicTable, topicRelations, wikiRelations } from '../schemas/wiki';
import { studentTable, studentRelations } from '../schemas/student';
import { purchaseHistoryTable, purchaseHistoryRelations } from '../schemas/purchase_history';
import { activeStudentsTable, activeStudentsRelations } from '../schemas/active_students';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const schema = {
  usersTable,
  newsTable,
  eventTable,
  courseTable,
  contentCoveredTable,
  subContentTable,
  subCourseTable,
  courseRelations,
  usersRelations,
  newsRelations,
  eventRelations,
  contentCoveredRelations,
  subContentRelations,
  subCourseRelations,
  wikiTable,
  topicTable,
  topicRelations,
  wikiRelations,
  studentTable,
  purchaseHistoryTable,
  purchaseHistoryRelations,
  studentRelations,
  activeStudentsTable,
  activeStudentsRelations,
};

const db = drizzle(pool, { schema });

export { db };