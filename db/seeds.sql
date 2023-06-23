INSERT INTO department (depart_name)
VALUES ('Human resources'),
('Information technology'),
('Operations'),
('Marketing'),
('Sales'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 99999, 6),
('Finance manager', 100000, 6),
('Marketing Specialist', 110000, 4),
('Chief technology officer', 120000, 2),
('President', 130000, 1),
('Sales representative', 140000, 5),
('CNC machine operators', 150000, 3),
('warehouse manager', 160000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Giannini', 4, null),
('Willow', 'Keller', 1, null),
('Richard', 'Vu', 2, 1),
('Zain', 'Roth', 3, null),
('Jack', 'Gilmore', 4, 2),
('Eli', 'Sweeny', 5, 3),
('Rachel', 'Morgan', 6, null),
('Anita', 'Black', 6, null),
('Kim', 'Harrison', 3, 1),
('Jim', 'Butcher', 3, null),
('Harry', 'Dresden', 3, 1)