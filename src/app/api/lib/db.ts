import { sql } from "@vercel/postgres";
import { dbUser } from "./definitions";

export async function getUser(email: string): Promise<dbUser | null> {
    console.log("Get User is Called!")
    try {
        const result = await sql<dbUser>`SELECT * FROM dbusers WHERE email = ${email}`;
        console.log(result)
        return result.rows[0] || null;
    } catch (err) {
        console.error('Failed to fetch user', err);
        return null;
    }
}
