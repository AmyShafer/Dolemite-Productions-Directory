// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection.js');
const directory = require('./directory.js');
const departments = directory.departments;
let roles = directory.roles;
let employees = directory.employees;
let managers = directory.managers;

// Main Menu
async function initDirectory() {
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do, Baby? (Use arrow keys)',
      name: 'mainMenu',
      choices: [
        // employee menu options
        {  
          key: 'a',
          value: 'View All Employees',
        },
        {  
          key: 'b',
          value: 'Add Employee',
        },
        {  
          key: 'c',
          value: 'Remove Employee',
        },
        {
          key: 'd',
          value: 'Update Employee Manager',
        },
        // role menu options
        {
          key: 'e',
          value: 'View All Roles',
        },
        {
          key: 'f',
          value: 'Add Role',
        },
        {
          key: 'g',
          value: 'Remove Role',
        },
        // department menu options
        {
          key: 'h',
          value: 'View All Departments',
        },
        {
          key: 'i',
          value: 'Add Department',
        },
        {
          key: 'j',
          value: 'Remove Department',
        },
        {
          key: 'k',
          value: 'View Total Budget By Department',
        },
        // Quit 
        {
          key: 'l',
          value: 'Quit',
        },
      ],
    },
  // View All Employees
  ]).then(answers => {
      if (answers.mainMenu === "View All Employees") {
        viewEmployees();    
      // Add Employee
      } else if (answers.mainMenu === "Add Employee") {
        addEmployee();
       // Update Employee Manager
      } else if (answers.mainMenu === "Update Employee Manager") {
        managerUpdate();
      // Remove Employee
      } else if (answers.mainMenu === "Remove Employee") {
        removeEmployee();
      // View All Roles  
      } else if (answers.mainMenu === "View All Roles") {
        viewRoles();
      } else if (answers.mainMenu === "Add Role") {
        addRole();
      } else if (answers.mainMenu === "Remove Role") {
        removeRole();
      // View All Departments
      } else if (answers.mainMenu === "View All Departments") {
        viewDepartments()
      } else if (answers.mainMenu === "Add Department") {
        addDepartment();   
      } else if (answers.mainMenu === "Remove Department") {
        removeDepartment();
      // Budget -- Not Functional Yet
      } else if (answers.mainMenu === "View Total Budget By Department") {
        console.log("I\'ll get back to ya in 3-10 business days!");
        generateDirectory();
      // Quit App  
      } else {
        console.log("See ya next time!");
      } 
  });
}

// View Employees
async function viewEmployees() {
  connection.query(`
  SELECT employees.id, employees.first_name, employees.last_name AS employee, roles.title, departments.department_name, roles.salary 
  FROM roles 
  LEFT JOIN employees 
  ON employees.role_id = roles.id 
  LEFT JOIN departments 
  ON roles.department_id = departments.id
  LEFT JOIN roles
  ON employees.role_id = roles.id
  ORDER BY employees.id;


  `, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table("List of Employees", results);
    }
    generateDirectory();
  });
}

// Add an Employee
async function addEmployee() {
  const roleList = [];
  const pickRole = roles.map(role => {
    roleList.push(role.key)
  });
  const managerList = [];
  const pickManager = managers.map(manager => {
    managerList.push(manager.key);
  });
  const questions = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please give details about the new employee: (Hit Enter if you can dig it!)',
      name: 'employeeDetails',
    },
    {
      type: 'input',
      message: 'What is the employee\'s first name?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'What is the employee\'s last name?',
      name: 'last_name'
    },
    {
      type: 'list',
      message: 'What is the employee\'s role?',
      name: 'role_id',
      choices: roleList,
    },
    {
      type: 'list',
      message: 'Who is the employee\'s manager?',
      name: 'manager_id',
      choices: managerList,
    }
  ]).then(answers => {
    const role_num = roles.find(role => answers.role_id === role.key);
    const manager_num = managers.find(manager => answers.manager_id === manager.key);
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name, answers.last_name, role_num.value, manager_num.value], function (err, results) {
      if (err) {
        console.log("Snaps! You have reached an error!");
      } else {
        console.log("Employee Added!");
      }
    });
    generateDirectory();
  })
}

//Manager Update Bonus
async function managerUpdate() {
  const employeeList = [];
  const pickEmployee = employees.map(employee => {
    employeeList.push(employee.key);
  });
  const managerList = [];
  const pickManager = managers.map(manager => {
    managerList.push(manager.key);
  });
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee needs a new manager?',
      name: 'employee_id',
      choices: employeeList
    },
    {
      type: 'list',
      message: 'Pick a new manager, Man!',
      name: 'manager_id',
      choices: managerList
    }
  ]).then(answers => {
    const employee_num = employees.find(employee => answers.employee_id === employee.key);
    const manager_num = managers.find(manager => answers.manager_id === manager.key);
    connection.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [manager_num.value, employee_num.value], function(err, results) { 
      if (err) {
        console.log("Dang! This did not go down as expected!");
      } else {
        console.log("Manager update complete!");
      }
    });
    generateDirectory();
  })
}

// Remove an Employee
async function removeEmployee() {
  const employeeList = [];
  const pickEmployee = employees.map(employee => {
    employeeList.push(employee.key);
  });
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'Hey, what you doing?! Give a Brother/Sister another chance!',
      name: 'employee_id',
      choices: employeeList
    }
    ]).then(answers => {
      const employee_num = employees.find(employee => answers.employee_id === employee.key);
      connection.query(`DELETE FROM employees WHERE id = ?`, [employee_num.value], function(err, results) {
        if (err) {
          console.log("Error, Man!");
        } else {
          console.log("That was cold, Man!");
        }
      })
    generateDirectory();
  }) 
}

async function viewRoles() {
  connection.query(`SELECT * FROM roles`, function (err, results) {
    if (err) {
      console.log("Error, Baby!");
    } else {
      console.log("The sky\'s the limit at Dolemite Productions, Baby!");
      console.table("List of Roles", results)
    }
    generateDirectory();
  });
}

// Add a Role
async function addRole() {
  const departmentList = [];
  const pickDepartment = departments.map(department => {
    departmentList.push(department.key)
  })
  const questions = await inquirer.prompt([
  {
    type: 'input',
    message: 'Hit Enter to adda Role, Sista!',
    name: 'roleDetails'
  },
  {
    type: 'input',
    message: 'What role title you thinkin\'?',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Write a Salary. Don\'t go crazy!',
    name: 'salary'
  },
  {
    type: 'list',
    message: 'In what department does this role reside, Baby!',
    name: 'department_id',
    choices: departmentList
  }
]).then(answers => {
    const department_num = departments.find(department => answers.department_id === department.key);
    connection.query(`INSERT INTO roles (title, salary, department_id ) VALUES (?, ?, ?)`, [answers.title, answers.salary, department_num.value], function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log("A role was added, yes it was!");
      }
    });
    generateDirectory();
  })
}

// Remove a Role
async function removeRole() {
  const roleList = [];
  const pickRole = roles.map(role => {
    roleList.push(role.key)
  })
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'Hey now! Chill?!',
      name: 'role_id',
      choices: roleList
    }
  ]).then(answers => {
    const role_num = roles.find(role => answers.role_id === role.key);
    connection.query(`DELETE FROM roles WHERE id = ?`, role_num.value, function(err, results) {
      if (err) {
        console.log("Error, Baby!");
      } else {
        console.log("Role Deleted!");
      }
    });
    generateDirectory();
  });
}

async function viewDepartments() {
  connection.query(`SELECT * FROM departments`, function (err, results) {
    if (err) {
      console.log("Dang! Somethang broke!");
    } else {
      console.table("List of Departments", results);
    }
    generateDirectory();
  });
}

// Add a Department
async function addDepartment() {
  const questions = await inquirer.prompt([
    {
      type: 'input',
      message: 'Another Department? Not sure we got the bank for that, Baby! You know what I\'m sayin?! But hit Enter to proceed.',
      name: 'newDepartment'
    },
    {
      type: 'input',
      message: 'Do me a solid and give me the name of the new department.',
      name: 'department_name'
    },
  ]).then(answers => {
    connection.query(`INSERT INTO departments (department_name) VALUES (?)`, [answers.department_name], function(err, results) {
      if (err) {
        console.log("Error, Baby!");
      } else {
        console.log("Department Added!");
      }
    });
    generateDirectory();
  });
}

async function removeDepartment () {
  const departmentList = [];
  const pickDepartment = departments.map(department => {
    departmentList.push(department.key);
  });
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'No, no, no! What you doin\', Man?!',
      name: 'department_id',
      choices: departmentList
    }
  ]).then(answers => {
    const department_num = departments.find(department => answers.department_id === department.key);
    connection.query(`DELETE FROM departments WHERE id = ?`, department_num.value, function(err, results) {
      if (err) {
        console.log("Error, Baby!");
      } else {
        console.log("Damn! Department Gone!");
      }
    })
    generateDirectory();
  });
}

// Pull data from the user inputs to dynamically create the cms
const generateDirectory = async() => {
  console.log("Hold on your seats!");
  initDirectory();
}

generateDirectory();





