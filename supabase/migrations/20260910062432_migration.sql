-- partial migration: execution stopped at statement index 1

-- remaining statements were not applied


INSERT INTO users (email, password_hash, role, full_name) VALUES
('admin@school.com', 'hashed_password_admin', 'admin', 'Admin User'),
('bursar@school.com', 'hashed_password_bursar', 'bursar', 'John Bursar'),
('dean@school.com', 'hashed_password_dean', 'dean', 'Dr. Dean Smith'),
('student@school.com', 'hashed_password_student', 'student', 'Alice Johnson');