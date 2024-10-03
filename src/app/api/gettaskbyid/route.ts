// File: src/app/api/gettaskbyid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTaskByTaskID } from '@/app/api/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Invalid task ID' }, { status: 400 });
  }

  try {
    const taskData = await getTaskByTaskID(id);

    if (taskData && taskData.tasks.length > 0) {
      return NextResponse.json(taskData.tasks[0], { status: 200 });
    } else {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}