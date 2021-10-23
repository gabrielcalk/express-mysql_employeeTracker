const inquirer = require('inquirer')

const view_departments = require('./man_data')

const options_first = ([
    {
        type: 'list',
        message: 'Select One Option Below: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        name: 'options_chosen'
    },
])

function init_question(){
    inquirer.prompt(options_first).then(response =>{

        response.options_chosen == 'View All Departments' ? view_departments()//function to view department
        : response.options_chosen == 'View All Roles' ? console.log('_')//function to view roles
        : response.options_chosen == 'View All Employees' ? console.log('_')//function to view employees
        : response.options_chosen == 'Add a Department' ? console.log('_')//function to add a department
        : response.options_chosen == 'Add a Role' ? console.log('_')//function to add a role
        : response.options_chosen == 'Add an Employee' ? console.log('_')//function to view employee
        : console.log('_')// function to update an employee role
    })
}

init_question();