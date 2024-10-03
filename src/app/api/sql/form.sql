CREATE TABLE FormByUser (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  createdBy UUID REFERENCES dbusers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  formdata JSONB,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

