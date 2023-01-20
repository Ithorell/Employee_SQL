const inquirer = require("inquirer");
const mysql = require("mysql");

// Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: "employee_DB",
});

function choices() {
    inquirer
        .prompt({
            name: "choices",
            type: "list",
            message: "What would you like to do?",
            choices:[
                'view all employees',
                'View all Departments',
                'view all roles',
                'add employee',
                'add department',
                'add role',
                'update employee role',
                'exit'
            ]
})
.then(function(answer) {
    switch (answer.choices) {
        case 'view all employees':
            viewAllEmployees();
            break;
        case 'View all Departments':
            viewAllDepartments();
            break;
        case 'view all roles':
            viewAllRoles();
            break;
        case 'add employee':
            addEmployee();
            break;
        case 'add department':
            addDepartment();
            break;
        case 'add role':
            addRole();
            break;
        case 'update employee role':
            updateEmployeeRole();
            break;
        case 'exit':
            connection.end();
            break;
    }
});
};

// View all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};

// View all departments
function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};

// View all roles

function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};

// Add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the employee's role ID?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the employee's manager ID?"
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("Employee added!");
                    choices();
                }
            );
        });
};

// Add department

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function(err) {
                    if (err) throw err;
                    console.log("Department added!");
                    choices();
                }
            );
        });
};

// Add role

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the department ID for this role?"
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("Role added!");
                    choices();
                }
            );
        });
}

// Update employee role

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the employee's ID?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the employee's new role ID?"
            }
        ])
        .then(function(answer) {
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.role_id
                    },
                    {
                        id: answer.id
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Employee role updated!");
                    choices();
                }
            );
        });
};

// Start the application
choices();

