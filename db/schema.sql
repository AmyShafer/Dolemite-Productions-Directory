DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

ALTER TABLE employee
ADD CONSTRAINT role_id
    FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
ADD CONSTRAINT manager_id    
    FOREIGN KEY (manager_id)
        REFERENCES employee (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

ALTER TABLE role
ADD CONSTRAINT department_id
    FOREIGN KEY (department_id)
        REFERENCES department (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);