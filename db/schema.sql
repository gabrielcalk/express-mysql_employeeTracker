DROP DATABASE IF EXISTS employee_tracker;

-- Creating employee_tracker database
CREATE DATABASE employee_tracker;

USE employee_tracker;

-- departments_db table
CREATE TABLE departments_db(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Roles_db table
CREATE TABLE roles_db(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments_db(id)
);

-- Employees_db table
DROP TABLE employees_db
CREATE TABLE employees_db(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles_db(id),
    primary key (id, manager_id)
);


