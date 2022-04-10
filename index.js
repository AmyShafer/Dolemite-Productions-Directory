// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
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
        inquirer.prompt([
          {
            type: 'list',
            message: 'Check out these employees, Man!',
            name: 'listOfEmployees',
            choices: employees
          }
        ]);
      // Add Employee
      } else if (answers.mainMenu === "Add Employee") {
        employeeQuestions();
       // Update Employee Manager
      } else if (answers.mainMenu === "Update Employee Manager") {
        // const employeeManager = employees.map((employee) => ({
        //   name: `${employee.value}`,
        //   value: employee.key
        // }));
        inquirer.prompt([
          {
            type: 'list',
            message: 'Which employee needs a new manager?',
            name: 'listOfEmployees',
            choices: employees
          },
          {
            type: 'list',
            message: 'Pick a new manager, Man!',
            name: 'listOfManagers',
            choices: managers
          }
        ]).then(answers => {
          console.log(answers);
        })
      
     // Remove Employee
     } else if (answers.mainMenu === "Remove Employee") {
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.value}`,
          value: employee.key
        }));
        inquirer.prompt([
          {
            type: 'list',
            message: 'Hey, what you doing?! Give a Brother/Sister another chance!',
            name: 'listOfEmployees',
            choices: employeeChoices
          }
        ]).then(answers => {
            employees.splice((answers.listOfEmployees - 1), 1);
            console.log(employees);
            //"DELETE FROM employees WHERE id = ?";
        }) 
      // View All Roles  
      } else if (answers.mainMenu === "View All Roles") {
        inquirer.prompt([
          {
            type: 'list',
            message: 'The sky\'s the limit at Dolemite Productions, Baby!',
            name: 'listOfRoles',
            choices: roles
          }
        ]);
      // Add A Role
      } else if (answers.mainMenu === "Add Role") {
        inquirer.prompt([
          {
            type: 'input',
            message: 'Adda Role, Sista!',
            name: 'newRole'
          }
        ]).then(answers => {
          const addedRole = {
            key: roles.length + 1,
            value: answers.newRole
          }
          roles.push(addedRole);
          console.log(roles);
        })
      // Remove a Role
      } else if (answers.mainMenu === "Remove Role") {
        const roleChoices = roles.map((role) => ({
          name: `${role.value}`,
          value: role.key
        }));
        inquirer.prompt([
          {
            type: 'list',
            message: 'You sure you wanna be doing that?!',
            name: 'listOfRoles',
            choices: roleChoices
          }
        ]).then(answers => {
          roles.splice((answers.listOfRoles - 1), 1);
          console.log(roles);
        })
      // View All Departments
      } else if (answers.mainMenu === "View All Departments") {
        inquirer.prompt([
          {
            type: 'list',
            message: 'Departments? We gotta few!',
            name: 'listOfDepartments',
            choices: departments
          }
        ])
      // Add Department
      } else if (answers.mainMenu === "Add Department") {
        inquirer.prompt([
          {
            type: 'input',
            message: 'Another Department? Not sure we got the bank for that, Baby! You know what I\'m sayin?!',
            name: 'newDepartment'
          }
        ]).then(answers => {
          const addedDepartment = {
            key: departments.length + 1,
            value: answers.newDepartment
          }
          departments.push(addedDepartment);
          console.log(departments);
        })
      // Remove Department
      } else if (answers.mainMenu === "Remove Department") {
        const departmentChoices = departments.map((department) => ({
          name: `${department.value}`,
          value: department.key 
        }));
        inquirer.prompt([
          {
            type: 'list',
            message: 'No, no, no! What you doin\', Man?!',
            name: 'listOfDepartments',
            choices: departmentChoices
          }
        ]).then(answers => {
          departments.splice((answers.listOfDepartments - 1), 1);
          console.log(departments);
        })
    // Quit App
    } else if (answers.mainMenu === "Quit") {
        console.log("QUIT");
      } else {
        initDirectory();
      }
  })
}

// Employee Questions
async function employeeQuestions() {
  const questions = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please give details about the new employee: (Hit Enter if you can dig it!)',
      name: 'employeeDetails',
    },
    {
      type: 'input',
      name: 'What is the employee\'s first name?',
    },
    {
      type: 'input',
      name: 'What is the employee\'s last name?',
    },
    {
      type: 'list',
      name: 'What is the employee\'s role?',
      choices: roles,
    },
    {
      type: 'list',
      name: 'Who is the employee\'s manager?',
      choices: employees,
    }
  ]).then(answers => {
    console.log(answers);
  })
}

// Pull data from the user inputs to dynamically create the cms
const generateDirectory = async() => {
  console.log("Hold on your seats!");
  initDirectory();
}

generateDirectory();





