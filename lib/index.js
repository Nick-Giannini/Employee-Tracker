const db = require('../config/config');
const inquirer = require("inquirer");
const questionList = require('./questionList');


const start=()=>{

    inquirer
        .prompt({
            type: 'list',
            name: 'firstChoice',
            message: 'What would you like to do?',
            choices: questionList.questionList
        })
        .then((answer) => {
            if(answer.firstChoice == 'Exit'){
                console.log("Goodbye!");
                return connection.end();
            }
            switch (answer.questionList) {
                case questionList[0]:
                    db.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                case questionList[1]:
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                case questionList[2]:
                    db.query('SELECT * FROM role', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                // case questionList[3]:
                //     break;
                // case questionList[4]:
                //     break;
                // case questionList[5]:
                //     break;
                // case questionList[6]:
                //     break;
            }
        });
};

const exitProgram = () => {
    console.log("Hope you enjoyed using the Employee Tracker app!");
    return connection.end();
}

module.exports = { start }