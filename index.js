const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Tracker_db"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
    initializing();
  });

  function initializing() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit"
        ]
      })

      .then(function (answer) {
        switch (answer.action) {
          case "View Departments":
            viewDept();
            break;
          case "View Roles":
            viewRoles();
            break;
          case "View All Employees":
            viewEmployees();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Add Role":
            addRole();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  }

  function viewDept() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
    //   console.log("");
    initializing();
    });
  }

  function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
    //   console.log("");
    initializing();
    });
  }
    
  function viewEmployees() {
    const query = "SELECT employee_id, employee.first_name, employee.last_name, role.title, " +
    "department.name FROM employee " +
    "LEFT JOIN role on employee.role_id = role.role_id " +
    "LEFT JOIN department on role.department_id = department.department_id";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("");
    initializing();
    });
  }

  //Add a department:
function addDepartment() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add?"
  })
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", { name: answer.department }, function (err) {
        if (err) throw err;
        console.log(`${answer.department} department was successfully updated. \n`);
        initializing();
      });
    });
}

//Add a role:
function addRole() {
  let array = [];
  const query = "SELECT department_id as value, name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this new role?",
      },
      {
        type: "list",
        name: "department",
        message: "To which department does the new role belong?",
        choices: array
      },
      {
        type: "confirm",
        name: "manager",
        message: "Is this a manager role?",
        default: false
      }];

    inquirer.prompt(questions).then(answer => {
      connection.query("INSERT INTO role (title, salary, department_id, manager) VALUES (?, ?, ?, ?)",
        [answer.name, answer.salary, answer.department, answer.manager], function (err, res) {
          if (err) throw err;
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record added successfully!");
          }
          console.log("");
          initializing();
        });
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your last name?"
    }
  ]).then(function (answer) {
    const query = "SELECT role_id as value, title as name FROM role WHERE manager = 0";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let array = JSON.parse(JSON.stringify(res));
      inquirer
        .prompt(
          {
            name: "role",
            type: "list",
            message: "Choose a role for the new employee",
            choices: array
          }).then(function (answer1) {
            var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " +
              "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
            connection.query(query, function (err, res) {
              if (err) throw err;
              let array2 = JSON.parse(JSON.stringify(res));
              inquirer
                .prompt({
                  name: "manager",
                  type: "list",
                  message: "Assign a manager for the new employee",
                  choices: array2
                }).then(function (answer2) {
                  connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                    [answer.first_name, answer.last_name, answer1.role, answer2.manager], function (err, res) {
                      if (err) throw err;
                      if (res.affectedRows > 0) {
                        console.log(res.affectedRows + " record added successfully!");
                      }
                      console.log("");
                      initializing();
                    });
                });
            });
          });
    });
  });
}


function updateEmployeeRole() {
  //let array = [];
  const query = "SELECT employee.employee_id as value, " +
    "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let array = JSON.parse(JSON.stringify(res));
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee\"s role do you want to change?",
        choices: array
      }).then(function (answer1) {
        const query = "SELECT role_id as value, title as name FROM role WHERE manager = 0";
        connection.query(query, function (err, res) {
          if (err) throw err;
          let array2 = JSON.parse(JSON.stringify(res));
          inquirer
            .prompt({
              name: "role",
              type: "list",
              message: "Which is the new role?",
              choices: array2
            }).then(function (answer2) {
              connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?",
                [answer2.role, answer1.employee], function (err, res) {
                  if (err) {
                    if (err) {
                      console.log("Not allowed due to foreign key !");
                    } else {
                      console.log("An error occured!");
                    }
                    return initializing();
                  }
                  if (res.affectedRows > 0) {
                    console.log(res.affectedRows + " record updated successfully!");
                  }
                  console.log("");
                  initializing();
                });
            });
        });
      });
  });
}