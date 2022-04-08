const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sess = {
  secret: process.env.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

async function initDirectory() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do, Baby? (Use arrow keys)',
      name: 'mainMenu',
      choice: [
        {  
          name: 'View All Employees',
        },
        {
          name: 'View All Employees By Department',
        },
        {
          name: 'View All Employees By Manager',
        },
        {
          name: 'Add Employee',
        },
        {
          name: 'Remove Employee',
        },
        {
          name: 'Update Employee Role',
        },
        {
          name: 'Update Employee Manager',
        },
        {
          name: 'View All Roles',
        },
        {
          name: 'Add Role',
        },
        {
          name: 'Remove Role',
        },
        {
          name: 'View All Departments',
        },
        {
          name: 'Add Department',
        },
        {
          name: 'Remove Departments',
        },
        {
          name: 'View Total Budget By Department',
        },
        {
          name: 'Quit',
        },
      ],
    },
  ]),
}

async function departmentQuestions() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do, Baby?',
      name: 'departmentOptions',
      choices: [
        {
          name: 'Add A Department',
        },
        {
          name: 'Remove A Department',
        },
        {
          name: 'View A Department\'s Budget',
        },
      ],
         // Add a Department
         {
           type: 'input',
           message: 'What is the name of the department you would like to add?',
           name: 'newDepartment',
         },
 
         // Remove a Department
          name: 'What is the name of the department you would like to remove?',
          choices: [
            {
              name: 'Crew',
            },
            {
              name: 'Cast',
            },
            {
              name: 'Martial Arts',
            },
            {
              name: 'Investors',
            },
          ],
        },
        {
          // Department Budget
          name: 'What department budget would you like to see?',
          choices: [
            {
              name: 'Crew',
            },
            {
              name: 'Cast',
            },
            {
              name: 'Martial Arts',
            },
            {
              name: 'Investors',
            },
          ],
        }
   ])
}


async function employeeQuestions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please give details about the new employee:',
      name: 'employeeOptions',

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
          choices: [
            {
              name: 'Actor',
            },
            {
              name: 'Assistant Cameraman',
            },
            {
              name: 'Assistant Director',
            },
            {
              name: 'Backer',
            },
            {
              name: 'Cinematographer',
            },
            {
              name: 'Director',
            },
            {
              name: 'Editor',
            },
            {
              name: 'Fight Choreographer',
            },
            {
              name: 'Gaffer',
            },
            {
              name: 'Grip',
            },
            {
              name: 'Lightweight Karate Champion',
            },
            {
              name: 'Make-up',
            },
            {
              name: 'Martial Arts Assistant Director',
            },
            {
              name: 'Master Samurai Swordsman',
            },
            {
              name: 'Music Arranger',
            },
            {
              name: 'Music Consultant',
            },
            {
              name: 'Negative Editor',
            },
            {
              name: 'Producer',
            },
            {
              name: 'Production Assistant',
            },
            {
              name: 'Production Manager',
            },
            {
              name: 'Set Decorator',
            },
            {
              name: 'Sound Editor',
            },
            {
              name: 'Sound Engineer',
            },
            {
              name: 'Special Effects',
            },
            {
              name: 'Writer',
            }
          ],
        {
          type: 'list',
          name: 'Who is the employee\'s manager?',
          choices: [
            {
              name: 'Malaika Ahraam',
            },
            {
              name: 'Al Banks',
            },
            {
              name: 'Vince Barbi',
            },
          ]
        },
      }
    },
  ])
}

async function roleQuestions() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'View All Roles:',
      name: 'listOfRoles',
      choices: [
        {
          name: 'Actor',
        },
        {
          name: 'Assistant Cameraman',
        },
        {
          name: 'Assistant Director',
        },
        {
          name: 'Backer',
        },
        {
          name: 'Cinematographer',
        },
        {
          name: 'Director',
        },
        {
          name: 'Editor',
        },
        {
          name: 'Fight Choreographer',
        },
        {
          name: 'Gaffer',
        },
        {
          name: 'Grip',
        },
        {
          name: 'Lightweight Karate Champion',
        },
        {
          name: 'Make-up',
        },
        {
          name: 'Martial Arts Assistant Director',
        },
        {
          name: 'Master Samurai Swordsman',
        },
        {
          name: 'Music Arranger',
        },
        {
          name: 'Music Consultant',
        },
        {
          name: 'Negative Editor',
        },
        {
          name: 'Producer',
        },
        {
          name: 'Production Assistant',
        },
        {
          name: 'Production Manager',
        },
        {
          name: 'Set Decorator',
        },
        {
          name: 'Sound Editor',
        },
        {
          name: 'Sound Engineer',
        },
        {
          name: 'Special Effects',
        },
        {
          name: 'Writer',
        }
      ],
    },
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole',
    },
    {
      type: 'list',
      message: 'What role would you like to remove?',
      choices: [
        {
          name: 'Actor',
        },
        {
          name: 'Assistant Cameraman',
        },
        {
          name: 'Assistant Director',
        },
        {
          name: 'Backer',
        },
        {
          name: 'Cinematographer',
        },
        {
          name: 'Director',
        },
        {
          name: 'Editor',
        },
        {
          name: 'Fight Choreographer',
        },
        {
          name: 'Gaffer',
        },
        {
          name: 'Grip',
        },
        {
          name: 'Lightweight Karate Champion',
        },
        {
          name: 'Make-up',
        },
        {
          name: 'Martial Arts Assistant Director',
        },
        {
          name: 'Master Samurai Swordsman',
        },
        {
          name: 'Music Arranger',
        },
        {
          name: 'Music Consultant',
        },
        {
          name: 'Negative Editor',
        },
        {
          name: 'Producer',
        },
        {
          name: 'Production Assistant',
        },
        {
          name: 'Production Manager',
        },
        {
          name: 'Set Decorator',
        },
        {
          name: 'Sound Editor',
        },
        {
          name: 'Sound Engineer',
        },
        {
          name: 'Special Effects',
        },
        {
          name: 'Writer',
        }
      ],
    }
  ])
}

// start server and connect to db
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now Listening'));
}).catch(function(err){
  console.log(err)
})



