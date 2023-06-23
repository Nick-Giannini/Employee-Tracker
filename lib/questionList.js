// store array of possible actions

const questionList = [
    'View all employees',//0
    'View all departments',//1
    'View all roles',//2
    'Add an employee',//3
    'Add a department',//4
    'Add a role',//5
    'Update an employee\'s role', //6
    'Exit'//7
];

const addList = [
    'What is the name of the department?', //0
    'What is the name of the role?', //1
    'What is the salary of the role?', //2
    'Which department does the role belong to?', //3
    "What is the employee's first name?", //4
    "What is the employee's last name?", //5
    "What is the employee's role?", //6
    "Who is the employee's manager?" //7
]



module.exports = { questionList, addList }