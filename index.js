// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const directory = require('./directory.js');
const departments = directory.departments;
const roles = directory.roles;
const employees = directory.employees;
const managers = directory.managers;

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
          name: 'Update Employee Manager',
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
          value: 'Remove Departments',
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
            message: 'Check out these employees, man!',
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
            console.log(answers);
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
            name: 'newRoles'
          }
        ]);
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





