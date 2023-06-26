const db = require('../config/config');
const inquirer = require("inquirer");
const questions = require('./questionList');

const sqlQuery = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.depart_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id;
  `;


const start = () => {

    inquirer
        .prompt({
            type: 'rawlist',
            name: 'firstChoice',
            message: 'What would you like to do?',
            choices: questions.questionList
        })
        .then((answer) => {
            switch (answer.firstChoice) {
                case questions.questionList[0]:
                    db.query(sqlQuery, function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                case questions.questionList[1]:
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                case questions.questionList[2]:
                    db.query('SELECT * FROM role', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                // case questionList[3]:
                //     addRole ();
                //     break;
                case questions.questionList[4]:
                    addDepartment();
                    break;
                case questions.questionList[5]:
                    addRole();
                    break;
                // case questionList[6]:
                //     break;
                case questions.questionList[7]:
                    console.log("Goodbye!");
                    return db.end();
            }
        });
};

const addDepartment = async () => {
    try {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'newName',
            message: questions.addList[0],
        })

        const newDepartment = answer.newName;
        const query = `INSERT INTO department (depart_name) VALUES ('${newDepartment}');`

        db.query(query, function (err, results) {
            console.log('Department inserted successfully!');
        });

    } catch (err) {
        console.error('Error inserting department:', err);
    }
    start();

}



const addRole = async () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: questions.addList[1],
        },
        {
            type: 'input',
            name: 'newSalary',
            message: questions.addList[2],
        },
        {
            type: 'input',
            name: 'belongToo',
            message: questions.addList[3],
        }
    ]).then((answer) => {

    const newRole = answer.newName;
    const newSalary = answer.newSalary;
    const belongToo = answer.belongToo;
    console.log(newRole,newSalary,belongToo);

    db.query("INSERT INTO role SET ?",
        {
            title: newRole,
            salary: newSalary,
            department_id: belongToo
        }, function (err, results) {
            if(err){
                console.log("There was an error in creating the new role. Please remember that the Salary and Department ID only allow numbers");
                start();
            }
            

        });

})

}



module.exports = { start }