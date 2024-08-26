CREATE TABLE dbusers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    googlepic TEXT,
    joinOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);