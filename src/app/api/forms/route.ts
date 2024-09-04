import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { title, questions, createdby }: { title: string; questions: any[]; createdby: string } = await request.json();

    // Insert the form data into the database
    const result = await sql`
      INSERT INTO formbyuser (createdby, title, formdata, active)
      VALUES (${createdby}, ${title}, ${JSON.stringify({ questions })}, TRUE)
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json({ error: 'Failed to create form' }, { status: 500 });
  }
}