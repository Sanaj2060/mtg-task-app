// File: src/app/api/updatetaskstatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: 'Invalid task ID or status' }, { status: 400 });
    }

    const result = await sql`
      UPDATE tasks
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task updated successfully', task: result.rows[0] }, { status: 200 });
  } catch (err) {
    console.error('Failed to update task status:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}