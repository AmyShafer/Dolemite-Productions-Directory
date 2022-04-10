// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const sequelize = require('./config/connection');

// departments
let departments = [
  {
    key: '1',
    value: 'Crew'
  },
  {
    key: '2',
    value: 'Cast'
  },
  {
    key: '3',
    value: 'Martial Arts'
  },
  {
    key: '4',
    value: 'Investors'
  },
];

// roles
let roles = [
  {
    key: '1',
    value: 'Actor'
  },
  {
    key: '2',
    value: 'Assistant Cameraman'
  },
  {
    key: '3',
    value: 'Assistant Director'
  },
  {
    key: '4',
    value: 'Backer'
  },
  {
    key: '5',
    value: 'Cinematographer'
  },
  {
    key: '6',
    value: 'Director'
  },
  {
    key: '7',
    value: 'Editor'
  },
  {
    key: '8',
    value: 'Fight Choreographer'
  },
  {
    key: '9',
    value: 'Gaffer'
  },
  {
    key: '10',
    value: 'Grip'
  },
  {
    key: '11',
    value: 'Lightweight Karate Champion'
  },
  {
    key: '12',
    value: 'Make-up'
  },
  {
    key: '13',
    value: 'Martial Arts Assistant Director'
  },
  {
    key: '14',
    value: 'Master Samurai Swordsman'
  },
  {
    key: '15',
    value: 'Music Arranger'
  },
  {
    key: '16',
    value: 'Music Consultant'
  },
  {
    key: '17',
    value: 'Negative Editor'
  },
  {
    key: '18',
    value: 'Producer'
  },
  {
    key: '19',
    value: 'Production Assistant'
  },
  {
    key: '20',
    name: 'Production Manager'
  },
  {
    value: '21',
    name: 'Set Decorator'
  },
  {
    key: '22',
    value: 'Sound Editor'
  },
  {
    key: '23',
    value: 'Sound Engineer'
  },
  {
    key: '24',
    value: 'Special Effects'
  },
  {
    key: '25',
    value: 'Writer',
  },
];

// employees
let employees = [
  {
    key: '1',
    value: 'Malaika Ahraam'
  },
  {
    key: '2',
    value: 'Al Banks'
  },
  {
    key: '3',
    value: 'Vince Barbi'
  },
  {
    key: '4',
    value: 'Joseph Bihari'
  },
  {
    key: '5',
    value: 'Julius Bihari'
  },
  {
    key: '6',
    value: 'Lester Bihari'
  },
  {
    key: '7',
    value: 'Ted Brinson'
  },
  {
    key: '8',
    value: 'Marie Carter'
  },
  {
    key: '9',
    value: 'Junior Cranberry'
  },
  {
    key: '10',
    value: 'Norval Crutcher'
  },
  {
    key: '11',
    value: 'Gene Davis'
  },
  {
    key: '12',
    value: 'Von Dutch'
  },
  {
    key: '13',
    value: 'Warde Egan'
  },
  {
    key: '14',
    value: 'Mother Fear'
  },
  {
    key: '15',
    value: 'Bobbie George'
  },
  {
    key: '16',
    value: 'James Gough'
  },
  {
    key: '17',
    value: 'Timothy Grace'
  },
  {
    key: '18',
    value: 'John Ashley Hamilton'
  },
  {
    key: '19',
    value: 'Josephine Harris'
  },
  {
    key: '20',
    value: 'Michael Hereford'
  },
  {
    key: '21',
    value: 'Howard Jackson'
  },
  {
    key: '22',
    value: 'Claudia Jackson'
  },
  {
    key: '23',
    value: 'Jerry Jones'
  },
  {
    key: '24',
    value: 'John Kirkland'
  },
  {
    key: '25',
    value: 'Jack LaMantiain'
  },
  {
    key: '26',
    value: 'Jean Lewis'
  },
  {
    key: '27',
    value: 'Princess Lilio'
  },
  {
    key: '28',
    value: 'Rex Lipton'
  },
  {
    key: '29',
    value: 'D’Urville Martin'
  },
  {
    key: '30',
    value: 'Hugh McDonald'
  },
  {
    key: '31',
    value: 'Carmella Di Milo'
  },
  {
    key: '32',
    value: 'Rudy Ray Moore'
  },
  {
    key: '33',
    value: 'Eric Nero'
  },
  {
    key: '34',
    value: 'Randy Ornelas'
  },
  {
    key: '35',
    value: 'Curtis Pulliam'
  },
  {
    key: '36',
    value: 'Hy Pyke'
  },
  {
    key: '37',
    value: 'Lady Reed'
  },
  {
    key: '38',
    value: 'Marvin Reesee'
  },
  {
    key: '39',
    value: 'George Selin'
  },
  {
    key: '40',
    value: 'Nicholas Josef von Sternberg'
  },
  {
    key: '41',
    value: 'Bruce Stevens'
  },
  {
    key: '42',
    value: 'John Wagner'
  },
  {
    key: '43',
    value: 'Harry Wollman'
  },
  {
    key: '44',
    value: 'Arthur Wright'
  },
  {
    key: '45',
    value: 'Carol Yasunaga'
  }
];

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
      }  else if (answers.mainMenu === "Add Employee") {
        employeeQuestions();
       // Update Employee Manager
      }  else if (answers.mainMenu === "Update Employee Manager") {
        const employeeManager = employee.map((employee) => {
          name: 
        })
        inquirer.prompt([
          {
            type: 'list',
            message: 'You\'re gonna have to pick a new manager!',
            name: 'listOfEmployees',
            choices: employees
          }
        ]);
     // Remove Employee
    } else if (answers.mainMenu === "Remove Employee") {
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.value}`,
          value: employee.key
        }));
        inquirer.prompt([
          {
            type: 'list',
            message: 'Hey, what you doing?!',
            name: 'listOfEmployees',
            choices: employeeChoices
          }
        ]).then(answers => {
            console.log(answers);
            "DELETE FROM employees WHERE id = ?";
            console.log(employees);
        }) 
      } else {
        console.log("END");
      }
  })
}

// Department Related Tasks
async function departmentQuestions() {
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'What do you wanna, Baby?',
      name: 'departmentDetails',
      choices: [
        {
          key: 'a',
          value: 'Add A Department',
        },
        {
          key: 'b',
          value: 'Remove A Department',
        },
        {
          key: 'c',
          value: 'View Budget Of A Department',
        },
      ],
    },
     // Add a Department
    {
        type: 'input',
        message: 'What\'s the name of the department you wanna add?',
        name: 'newDepartment',
    },
    // Remove a Department
    {
        name: 'What\'s  the name of the department you wanna remove?',
        choices: departments,
      },
      // Department Budget
      {
        name: 'What department budget do you wanna see?',
        choices: departments,
      },
   ]).then(answers => {
    console.log(answers);
  })
}

// Employee Questions
async function employeeQuestions() {
  const questions = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please give details about the new employee:',
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

// Role Questions
async function roleQuestions() {
  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: 'View All Roles:',
      name: 'listOfRoles',
      choices: roles,
    },
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole',
    },
    {
      type: 'list',
      message: 'What role would you like to remove?',
      choices: roles,
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





