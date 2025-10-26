import { NextResponse } from 'next/server'
import { getUserFromDatabase, createUserInDatabase } from '@/services/userServices';

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
