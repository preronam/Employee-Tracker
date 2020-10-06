 USE Tracker_db;
INSERT into Tracker_db.department (name,department_id) VALUES ("Finance",1);
INSERT into Tracker_db.department (name,department_id) VALUES ("Technology",2);
INSERT into Tracker_db.department (name,department_id) VALUES ("Marketing",3);
INSERT into Tracker_db.department (name,department_id) VALUES ("HR",4);

INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES ( 1,"Chief financial officer", 150000, 1,1);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (2, "Accountant", 90000,1,0);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (3,"IT Manager", 120000, 2,1);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (4,"Engineer", 900000, 2,0);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager)VALUES ( 5,"Marketing Manager", 100000, 3,1);
INSERT into Tracker_db.role(role_id,title, salary, department_id,manager) VALUES ( 6,"Content Writer", 60000, 3,0);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (7,"Junior Copywriter", 40000, 3,0);
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (8,"HR Manager", 90000, 4,1); 
INSERT into Tracker_db.role (role_id,title, salary, department_id,manager) VALUES (9,"Counselor", 70000, 4,0);

INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (1,"George", "Eliot", 1, Null);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id)VALUES (2,"Virginia", "Woolf", 2, 1);
INSERT into Tracker_db.employee  (employee_id, first_name, last_name, role_id, manager_id)VALUES (3,"Sylvia", "Plath", 3, Null);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (4,"Zelda", "Fitzgerald", 4, 3);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (5,"Maya", "Angelou",5,Null);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (6,"Mary", "Shelley", 6, 5);
INSERT into Tracker_db.employee  (employee_id, first_name, last_name, role_id, manager_id)VALUES (7,"Toni", "Morrison", 7, 5);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (8,"Alice", "Walker", 8, Null);
INSERT into Tracker_db.employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (9,"J.K.", "Rowling", 9, 8);
