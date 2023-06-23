// db connection

const connection = require('./config/config');
const questions = require("./lib/index");

const start = () => {
    console.log('Welcome to the Employee Tracker app!');
    try {
        questions.start();
    } catch (err) {
        console.log(err);
    }
}


start();
















// const promptUser = [
//     {
//         type: 'choice',
//         message: 'What would you like to do?',
//         name: 'firstChoice',
//         choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
//     },
//     {
//         type: 'input',
//         message: 'What is the name of the department?',
//         message: 'What is the name of the role?',
//         message: 'What is the salary of the role?',
//         message: 'Which department does the role belong to?',
//         message: "What is the employee's first name?",
//         message: "What is the employee's last name?",
//         message: "What is the employee's role?",
//         message: "Who is the employee's manager?",


// ];











// db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
// });

// db.query('SELECT * FROM role', function (err, results) {
//     console.log(results);
// });
// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });

// inquirer
//     .prompt([
//         /* Pass your questions in here */
//     ])
//     .then((answers) => {
//         // Use user feedback for... whatever!!
//     })
//     .catch((error) => {
//         if (error.isTtyError) {
//             // Prompt couldn't be rendered in the current environment
//         } else {
//             // Something else went wrong
//         }
//     });





















