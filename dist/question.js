const inquirer = require('inquirer')

/**
 * @function from man_data.js (to do what the user wants)
 */


const {db, view_departments, view_role, view_employees, add_department_db, add_role_db} = require('./man_data')

/** 
 * Firsts Questions - with options 
*/
const options_first = ([
    {
        type: 'list',
        message: 'Select One Option Below: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'options_chosen'
    },
])

/** 
 * Questions to add a new department 
*/
const add_department_question = ([
    {
        type: 'input',
        message: 'Enter The Name Of The Department: ',
        name: 'department_name'
    }
])

/** 
 * Questions to add a new department 
 * WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department 
for the role and that role is added to the database
*/
const add_role_questions = ([
    {
        type: 'input',
        message: 'Enter The Name Of The Role: ',
        name: 'role_name'
    },
    {
        type: 'input',
        message: 'Enter The Salary: ',
        name: 'salary'
    }
])

/**
 * @function add_department - to add a new department
 */
function add_department(){
    inquirer.prompt(add_department_question).then(response =>{
        var name_department = response.department_name
        add_department_db(name_department)
    })
}

function add_role(){
    inquirer.prompt(add_role_questions).then(nameAndSalary =>{

        db.query('SELECT name FROM departments_db', (err, depart_name) =>{
            department_array = []

            for (e of depart_name){
                department_array.push(e.name)
            }
            
            inquirer.prompt([{
                type: 'list',
                message: 'What is The Department of This Role: ',
                name:  'department_name',
                choices: department_array
            }]).then(department =>{
                add_role_db(nameAndSalary, department)
            })
            // add_role_db(response)
         })
    })
}

/**
 * @function init_question - questions that will prompt first
 */
function init_question(){
    inquirer.prompt(options_first).then(response =>{

        response.options_chosen == 'View All Departments' ? view_departments()//function to view department
        : response.options_chosen == 'View All Roles' ? view_role()//function to view roles
        : response.options_chosen == 'View All Employees' ? view_employees()//function to view employees
        : response.options_chosen == 'Add a Department' ? add_department()//function to add a department
        : response.options_chosen == 'Add a Role' ? add_role()//function to add a role
        : response.options_chosen == 'Add an Employee' ? console.log('_')//function to view employee
        : console.log('_')// function to update an employee role
    })
}

init_question();

