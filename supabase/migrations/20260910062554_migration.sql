INSERT INTO students (user_id, student_id, date_of_birth, phone, address, parent_name, parent_phone)
VALUES
((SELECT id FROM users WHERE email = 'student@school.com'), 'STU-2024-001', '2008-05-15', '0701234567', '123 Main St', 'Mrs. Johnson', '0701234500');

INSERT INTO classes (class_name, level, capacity) VALUES
('Form 1A', '1', 40),
('Form 2B', '2', 35),
('Form 3C', '3', 30);

INSERT INTO class_allocations (student_id, class_id, academic_year)
VALUES
((SELECT id FROM students WHERE student_id = 'STU-2024-001'), (SELECT id FROM classes WHERE class_name = 'Form 1A'), '2024/2025');

INSERT INTO fee_payments (student_id, amount, academic_year, status, recorded_by)
VALUES
((SELECT id FROM students WHERE student_id = 'STU-2024-001'), 50000, '2024/2025', 'paid', (SELECT id FROM users WHERE email = 'bursar@school.com')),
((SELECT id FROM students WHERE student_id = 'STU-2024-001'), 50000, '2024/2025', 'pending', (SELECT id FROM users WHERE email = 'bursar@school.com'));