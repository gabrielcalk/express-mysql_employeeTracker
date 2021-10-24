const inquirer = require('inquirer')

const {view_departments, view_role, view_employees, add_department_db} = require('./man_data')

const options_first = ([
    {
        type: 'list',
        message: 'Select One Option Below: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'options_chosen'
    },
])

const add_department_question = ([
    {
        type: 'input',
        message: 'Enter The Name Of The Department',
        name: 'department_name'
    }
])

function add_department (){
    inquirer.prompt(add_department_question).then(response =>{
        var name_department = response.department_name
        add_department_db(name_department)
    })
}

function init_question(){
    inquirer.prompt(options_first).then(response =>{

        response.options_chosen == 'View All Departments' ? view_departments()//function to view department
        : response.options_chosen == 'View All Roles' ? view_role()//function to view roles
        : response.options_chosen == 'View All Employees' ? view_employees()//function to view employees
        : response.options_chosen == 'Add a Department' ? add_department()//function to add a department
        : response.options_chosen == 'Add a Role' ? console.log('_')//function to add a role
        : response.options_chosen == 'Add an Employee' ? console.log('_')//function to view employee
        : console.log('_')// function to update an employee role
    })
}

init_question();

module.exports = init_question