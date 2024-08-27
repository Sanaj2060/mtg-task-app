import { QueryResult, sql } from "@vercel/postgres";
import { dbUser, Task, AllTask, TasksWithUsers, AllTasksWithUsers } from "./definitions";

export async function getUser(email: string): Promise<dbUser | null> {
    console.log("Get User is Called!")
    try {
        const result = await sql<dbUser>`SELECT * FROM dbusers WHERE email = ${email}`;
        // console.log(result)
        return result.rows[0] || null;
    } catch (err) {
        console.error('Failed to fetch user', err);
        return null;
    }
}

export async function getAllTasks(id: string): Promise<AllTask | null> {
    try {
        const result: QueryResult<Task> = await sql<Task>`SELECT * FROM tasks WHERE createdby = ${id}`;
        // console.log(result);
        return { tasks: result.rows } || null;
    } catch (err) {
        console.error("Failed to get Tasks", err);
        return null;
    }
}

export async function getAllTasksWithUserName(id: string): Promise<AllTasksWithUsers | null> {
    try{
        const result: QueryResult<TasksWithUsers> = await sql<TasksWithUsers>`SELECT T.*, U.EMAIL as createdByEmail, U.FULLNAME as createdByName, U.googlepic as createdByPic FROM TASKS T JOIN DBUSERS U ON T.CREATEDBY = U.ID;`;
        console.log(result.rows)
        return { tasks: result.rows } || null;
    } catch (err) {
        return null
    }
}
