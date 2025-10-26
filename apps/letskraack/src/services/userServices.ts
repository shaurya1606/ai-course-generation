import { db } from '@/config/db'
import { usersTable } from '@/config/schema'
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export const getUserFromDatabase = async (email: string) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  // drizzle returns an array of rows; return the first row or null for easier callers
  return (user && user.length > 0) ? user[0] : null;
}

export const createUserInDatabase = async (data: { email: string; name: string; subscriptionId?: string }) => {
  const newUser = await db.insert(usersTable).values({
    email: data.email,
    name: data.name,
    subscriptionId: data.subscriptionId ?? '',
  }).returning();
  // returning() returns an array of inserted rows — return the first one
  return (newUser && newUser.length > 0) ? newUser[0] : null;
}   