CREATE TABLE tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    createdBy UUID REFERENCES dbusers(id) ON DELETE SET NULL,
    dueDate TIMESTAMP,
    status TEXT,
    formData JSONB,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);