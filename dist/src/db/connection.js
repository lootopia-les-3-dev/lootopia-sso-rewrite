import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
function getDb() {
    if (!globalThis.__db) {
        globalThis.__db = drizzle(process.env.DATABASE_URL);
    }
    return globalThis.__db;
}
const db = getDb();
export default db;
