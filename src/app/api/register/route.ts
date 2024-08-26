import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Handler for POST requests
export async function POST(request: Request) {
  try {
    const { fullName, email, phone, address, googlepic } = await request.json();

    // Validate input
    if (!fullName || !email || !phone || !address || !googlepic ) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Insert user into the database
    await sql`
      INSERT INTO dbusers (fullName, email, phone, address, googlepic)
      VALUES (${fullName}, ${email}, ${phone}, ${address}, ${googlepic})
    `;

    return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}