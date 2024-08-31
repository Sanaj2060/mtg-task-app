CREATE TABLE tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    createdBy UUID REFERENCES dbusers(id) ON DELETE SET NULL,
    assignee UUID REFERENCES dbusers(id) ON DELETE SET NULL,
    dueDate TIMESTAMP,
    status TEXT,
    formData JSONB,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, createdBy, assignee, dueDate, status, formData)
VALUES (
    'Task Title - 3', 
    '00d9c4e9-9609-4d77-aaaf-0a44c7257cfa', 
    '00d9c4e9-9609-4d77-aaaf-0a44c7257cfa', 
    '2024-08-31 14:00:00', 
    'In Progress', 
    '{"key1": "value1", "key2": "value2"}'::jsonb
);

