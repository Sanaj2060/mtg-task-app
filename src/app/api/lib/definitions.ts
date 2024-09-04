export type dbUser = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  googlepic: string;
  joinOn: Date;
};

export type Task = {
  id: string; // UUID
  title: string; // TEXT
  createdby: string | null; // UUID, can be null due to ON DELETE SET NULL
  assignee: string | null; // UUID, can be null due to ON DELETE SET NULL
  duedate?: Date | null; // TIMESTAMP, can be null
  status?: string | null; // TEXT, can be null
  formdata?: Record<string, any> | null; // JSONB, can be null
  createdon: Date; // TIMESTAMP
};

export type AllTask = {
  tasks: Task[];
};

export type TasksWithUsers = Task & {
  createdbyname: string;
  createdbyemail: string;
  createdbypic: string;
};

export type AllTasksWithUsers = {
  tasks: TasksWithUsers[];
};

export type FormByUser = {
  id: string;
  createdby: string;
  title: string;
  active: boolean;
  formdata?: Record<string, any> | null;
  createdon: Date;
}

export type FormByUserWithUser = FormByUser & {
  createdbyname: string;
  createdbyemail: string;
  createdbypic: string;
}

export type AllFormByUser = {
  forms: FormByUserWithUser[];
}