import { NextResponse } from 'next/server'; // Use Next.js built-in response object
import { sql } from '@vercel/postgres'; // Your database connection

// POST method handler for inserting a task
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the incoming JSON body
    const { title, createdBy, assignee, dueDate, formData } = body;

    // Validate the required fields
    if (!title || !createdBy || !assignee || !dueDate || !formData) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    // Insert the task into the database
    console.log("Inserting into the database");
    // Insert the task into the database
    const result = await sql`
      INSERT INTO tasks (title, createdBy, assignee, dueDate, formData, status)
      VALUES (${title}, ${createdBy}, ${assignee}, ${dueDate}, ${formData}, 'Not Started')
      RETURNING *;
    `;
    console.log("Database insert result:", result);
    // Return the newly inserted task as JSON response
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting task:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}