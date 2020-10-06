DROP DATABASE IF EXISTS Tracker_db;
CREATE database Tracker_db;

USE Tracker_db;

CREATE TABLE department
(
    department_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE role
(
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (8,0) ,
    department_id INT NOT NULL,
     manager BOOLEAN NOT NULL default 0, 
    PRIMARY KEY (role_id)

);

CREATE TABLE employee
(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (employee_id)
);