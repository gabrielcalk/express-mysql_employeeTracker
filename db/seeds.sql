INSERT INTO departments_db (name)
VALUES  ('Marketing'),
        ('Finance'),
        ('Product');

INSERT INTO roles_db (title, salary, department_id)
VALUES  ('Head of Marketing', 120000, 1),
        ('Designer', 80000, 1),
        ('Traffic Manager', 110000, 1),
        ('Head of Accounting', 90000, 2),
        ('Assistant of Accounting', 50000, 2),
        ('Senior Front End Engineer', 190000, 3),
        ('Senior Full Stack Engineer', 220000, 3),
        ('Software Architect', 140000, 3);

INSERT INTO employees_db (first_name, last_name, role_id, manager_id)
VALUES  ('Ana', 'Orth', 1, 1),
        ('Cristiane', 'Souza', 4, 1),
        ('Cesar', 'Orth', 2, 0),
        ('Pedro', 'Orth', 5, 0);