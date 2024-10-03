import { QueryResult, sql } from "@vercel/postgres";
import { dbUser, Task, AllTask, TasksWithUsers, AllTasksWithUsers, AllFormByUser, FormByUserWithUser } from "./definitions";

export async function getUser(email: string): Promise<dbUser | null> {
    try {
        const result = await sql<dbUser>`SELECT * FROM dbusers WHERE email = ${email}`;
        return result.rows[0] || null;
    } catch (err) {
        console.error('Failed to fetch user', err);
        return null;
    }
}

export async function getAllTasks(id: string): Promise<AllTask | null> {
    try {
        const result: QueryResult<Task> = await sql<Task>`SELECT * FROM tasks WHERE createdby = ${id}`;
        return { tasks: result.rows } || null;
    } catch (err) {
        console.error("Failed to get Tasks", err);
        return null;
    }
}

export async function getTaskByTaskID(id: string): Promise<AllTasksWithUsers | null> {
    try {
        const result: QueryResult<TasksWithUsers> = await sql<TasksWithUsers>`
            SELECT T.*, U.EMAIL as createdByEmail, U.FULLNAME as createdByName, U.googlepic as createdByPic 
            FROM TASKS T 
            JOIN DBUSERS U ON T.CREATEDBY = U.ID 
            WHERE T.id = ${id} 
            ORDER BY T.duedate ASC;`
        return { tasks: result.rows } || null;
    } catch (err) {
        console.error("Failed to get tasks with user info", err);
        return null;
    }
}

//write a new code for just completed task
export async function getAllTasksWithUserNameTaskCard(id: string): Promise<AllTasksWithUsers | null> {
    try {
        const result: QueryResult<TasksWithUsers> = await sql<TasksWithUsers>`
            SELECT T.id, T.duedate, T.title, T.status, U.EMAIL as createdByEmail 
            FROM TASKS T 
            JOIN DBUSERS U ON T.CREATEDBY = U.ID 
            WHERE T.assignee = ${id}
            AND T.status <> 'Completed' 
            ORDER BY T.duedate ASC;`;
        return { tasks: result.rows } || null;
    } catch (err) {
        console.error("Failed to get tasks with user info", err);
        return null;
    }
}

export async function getAllTasksCreatedWithUserNameTaskCard(id: string): Promise<AllTasksWithUsers | null> {
    try {
        const result: QueryResult<TasksWithUsers> = await sql<TasksWithUsers>`
            SELECT T.id, T.duedate, T.title, T.status, U.EMAIL as createdByEmail 
            FROM TASKS T 
            JOIN DBUSERS U ON T.CREATEDBY = U.ID 
            WHERE T.createdby = ${id}
            AND T.status <> 'Completed' 
            ORDER BY T.duedate ASC;`;
        return { tasks: result.rows } || null;
    } catch (err) {
        console.error("Failed to get tasks with user info", err);
        return null;
    }
}

export async function getFormByUserID(id: string): Promise<AllFormByUser | null> {
    try {
        const result: QueryResult<FormByUserWithUser> = await sql<FormByUserWithUser>`
            SELECT F.*, U.EMAIL as createdByEmail, U.FULLNAME as createdByName, U.googlepic as createdByPic 
            FROM formbyuser F 
            JOIN DBUSERS U ON F.CREATEDBY = U.ID 
            WHERE F.createdby = ${id} 
            ORDER BY F.title ASC;`;
        return { forms: result.rows } || null;
    } catch (err) {
        console.error("Failed to fetch forms by user ID", err);
        return null;
    }
}

export async function getFormByUserIDSelect(id: string): Promise<AllFormByUser | null> {
    try {
        const result: QueryResult<FormByUserWithUser> = await sql<FormByUserWithUser>`
            SELECT F.id, F.title, F.description, U.EMAIL as createdByEmail, U.FULLNAME as createdByName, U.googlepic as createdByPic 
            FROM formbyuser F 
            JOIN DBUSERS U ON F.CREATEDBY = U.ID 
            WHERE F.createdby = ${id} AND F.active IS TRUE 
            ORDER BY F.title ASC;`;
        return { forms: result.rows } || null;
    } catch (err) {
        console.error("Failed to fetch active forms by user ID", err);
        return null;
    }
}

export async function getFormByID(id: string): Promise<FormByUserWithUser | null> {
    try {
        const result: QueryResult<FormByUserWithUser> = await sql<FormByUserWithUser>`
            SELECT F.*, U.EMAIL as createdByEmail, U.FULLNAME as createdByName, U.googlepic as createdByPic 
            FROM formbyuser F 
            JOIN DBUSERS U ON F.CREATEDBY = U.ID 
            WHERE F.id = ${id} AND F.active IS TRUE 
            LIMIT 1;`;
        return result.rows[0] || null;
    } catch (err) {
        console.error("Failed to fetch form by ID", err);
        return null;
    }
}