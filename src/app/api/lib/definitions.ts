export type dbUser = {
    id: string,
    fullname: string,
    email: string,
    phone: string,
    address: string,
    googlepic: string,
    joinOn: Date
}

export type Task = {
    id: string;            // UUID
    title: string;         // TEXT
    createdBy: string | null;  // UUID, can be null due to ON DELETE SET NULL
    assignee: string | null;  // UUID, can be null due to ON DELETE SET NULL
    dueDate?: Date | null; // TIMESTAMP, can be null
    status?: string | null; // TEXT, can be null
    formData?: Record<string, any> | null; // JSONB, can be null
    createdOn: Date;       // TIMESTAMP
};

export type AllTask = {
    tasks: Task[]
}

export type TasksWithUsers = Task & {
    createdbyname: string,
    createdbyemail: string,
    createdbypic: string,
}

export type AllTasksWithUsers = {
    tasks: TasksWithUsers[]
}