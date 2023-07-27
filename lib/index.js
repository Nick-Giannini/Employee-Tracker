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
                case questions.questionList[3]:
                    addEmploy();
                    break;
                case questions.questionList[4]:
                    addDepartment();
                    break;
                case questions.questionList[5]:
                    addRole();
                    break;
                case questions.questionList[6]:
                    updateRole();
                    break;
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
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        start();
    });

};


const addRole = async () => {

    inquirer.prompt([{
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
        console.log(newRole, newSalary, belongToo);

        db.query("INSERT INTO role SET ?", {
            title: newRole,
            salary: newSalary,
            department_id: belongToo
        }, function (err, results) {
            if (err) {
                console.log("There was an error in creating the new role. Please remember that the Salary and Department ID only allow numbers");
                start();
            }

        });
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
            start();
        });

    })


};

const addEmploy = async () => {

    const [role] = await db.promise().query("select * from role");
    const [employee] = await db.promise().query("select * from employee");


    //select all from role table and employee
    inquirer.prompt([{
            type: 'input',
            name: 'newFirst',
            message: questions.addList[4],
        },
        {
            type: 'input',
            name: 'newLast',
            message: questions.addList[5],
        },
        {
            type: 'list',
            name: 'newErole',
            message: questions.addList[6],
            choices: role.map(({
                id,
                title
            }) => ({
                value: id,
                name: title

            }))
        },
        {
            type: 'list',
            name: 'newEmanager',
            message: questions.addList[7],
            choices: employee.map(({
                id,
                first_name,
                last_name
            }) => ({
                value: id,
                name: `${first_name} ${last_name}`

            }))
        }
    ]).then((answer) => {

        const newFirst = answer.newFirst;
        const newLast = answer.newLast;
        const newErole = answer.newErole;
        const newEmanager = answer.newEmanager;


        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newFirst}','${newLast}',${newErole},${newEmanager});`, function (err, results) {
            if (err) {
                console.log("There was an error in creating the new Employee. Please remember that the Role ID  and Manager ID only allow numbers");
                start();
            }


        });
        db.query(sqlQuery, function (err, results) {
            console.table(results);
            start();
        });


    })


};

const updateRole = async () => {

    const [role] = await db.promise().query("select * from role");
    const [employee] = await db.promise().query("select * from employee");


    //select all from role table and employee
    inquirer.prompt([

        {
            type: 'list',
            name: 'employeeID',
            message: "Which employee would you like to update?",
            choices: employee.map(({
                id,
                first_name,
                last_name
            }) => ({
                value: id,
                name: `${first_name} ${last_name}`

            }))
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'what role should the employee have?',
            choices: role.map(({
                id,
                title
            }) => ({
                value: id,
                name: title
            }))
        }
    ]).then((answer) => {

        const employeeID = answer.employeeID;
        const roleID = answer.roleID;



        db.query(`UPDATE employee SET role_id = ${roleID} WHERE id=${employeeID}`,

            function (err, results) {
                if (err) {
                    console.log("There is an error updating the employee role");
                    start();
                }

                db.query(sqlQuery, function (err, results) {
                    console.table(results);
                    start();
                });
            });

    })
}

module.exports = {
    start
}