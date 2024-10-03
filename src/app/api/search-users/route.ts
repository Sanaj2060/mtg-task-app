import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]); // Return an empty array if no query is provided
  }

  const users = await sql`
      SELECT id, fullname as name, email FROM dbusers
      WHERE fullname ILIKE ${"%" + query + "%"}
      OR email ILIKE ${"%" + query + "%"}
      LIMIT 10
    `;

  return NextResponse.json(users.rows || []); // Return an empty array if no users are found
}
