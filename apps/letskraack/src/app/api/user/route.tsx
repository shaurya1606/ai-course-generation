import { NextResponse } from 'next/server'
import { getUserFromDatabase, createUserInDatabase } from '@/services/userServices';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/config/schema';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get('email') || '';

  // If user exists in database, return user data
    const user = await getUserFromDatabase(email);
    console.log('User found:', user);
    return NextResponse.json(user ?? null);
}

export async function POST(request: Request) {
  const { email, name } = await request.json();

  // If user exists in database, return user data
  const user = await getUserFromDatabase(email);

  // If user does not exist, create new user
if(!user) {
  const newUser = await createUserInDatabase({ email, name });
  console.log('New user created:', newUser);
  return NextResponse.json(newUser, { status: 201 });
} else {
  // user already exists - return it
  return NextResponse.json(user, { status: 200 });
}
}

export async function PATCH(request: Request) {
    try {
        const { userEmail, credits } = await request.json();

        if (!userEmail) {
            return NextResponse.json({ error: 'userEmail is required' }, { status: 400 });
        }

        if (credits === undefined || credits === null) {
            return NextResponse.json({ error: 'credits must be provided for update' }, { status: 400 });
        }

        const parsedCredits = Number(credits)
        if (Number.isNaN(parsedCredits) || !Number.isFinite(parsedCredits)) {
            return NextResponse.json({ error: 'credits must be a valid number' }, { status: 400 })
        }

        const updatedRows = await db
            .update(usersTable)
            .set({ credits: parsedCredits })
            .where(eq(usersTable.email, userEmail))
            .returning();

        if (updatedRows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

            console.log('user updated:', updatedRows[0]);
    return NextResponse.json(updatedRows[0]);
    } catch (error) {
        console.error('error updating user', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}