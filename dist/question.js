const inquirer = require('inquirer')

/**
 * @function from man_data.js (to do what the user wants)
 */
const {db,
     view_departments, 
     view_role, 
     view_employees, 
     add_department_db, 
     add_role_db,
     delete_role_db,
     add_employee_db, 
     update_employee_db,
     delete_employee_db} = require('./man_data')

/** 
 * Firsts Questions - with options 
*/
const options_first = ([
    {
        type: 'list',
        message: 'Select One Option Below: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Delete One Role', 'Add an Employee', 'Delete One Employee', 'Update an Employee Role'],
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

// Employee questions: to add one employee
const add_employee_questions = ([
    {
        type: 'input',
        message: 'Enter The First Name of The Employee: ',
        name: 'fname'
    },
    {
        type: 'input',
        message: 'Enter Last Name of the Employee ',
        name: 'lname'
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
/**
 * @function add_role
 */
function add_role(){
    inquirer.prompt(add_role_questions).then(nameAndSalary =>{
        db.query('SELECT name FROM departments_db', (err, depart_name) =>{
            department_array = []
            for (e of depart_name){
                department_array.push(e.name)
            }
            // Asking what department this role belongs
            inquirer.prompt([{
                type: 'list',
                message: 'What is The Department of This Role: ',
                name:  'department_name',
                choices: department_array
            // Passing the answer to one function on man_data.js
            }]).then(department =>{
                add_role_db(nameAndSalary, department)
            })
         })
    })
}
/**
 * @function delete_role
 */
function delete_role(){
    db.query('SELECT title FROM roles_db', (err, titles) =>{
        titles_array = []
        for (e of titles){
            titles_array.push(e.title)
        }
        //Questions that we need to make to delete one role
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which Role Do You Want to Delete?',
                name:  'delete_role',
                choices: titles_array
            },
        //Passing the role that the user want to delete to another function one man_data.js
        ]).then(response =>{
            delete_role_db(response.delete_role)
        })
    })
}
/**
 * @function add_employee
 */
function add_employee(){
    inquirer.prompt(add_employee_questions).then(names =>{
        db.query('SELECT title FROM roles_db', (err, title_roles) =>{
            title_array = []
            for (e of title_roles){
                title_array.push(e.title)
            }
            //Question that we need to add one employee
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is his/her role?',
                    name:  'role_name',
                    choices: title_array
                },
                {
                    type: 'list',
                    message: 'Is he/her a manager?',
                    name:  'manager',
                    choices: ['Yes', 'No']
                }
            //Passing the answers to one function on man_data.js
            ]).then(response_manAndRole =>{
                add_employee_db(names, response_manAndRole)
            })
         })
    })
}
/**
 * @function delete_employee
 */
function delete_employee(){
    db.query('SELECT first_name, last_name FROM employees_db', (err, employees_name) =>{
        employees_array = []
        for (e of employees_name){
            employees_array.push(`${e.first_name} ${e.last_name}`)
        }
        // Questions that we need to delete employee information
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which Employee Do You Want to Delete?',
                name:  'delete_employee',
                choices: employees_array
            },
        // Passing the answer to other function (man_data.js)
        ]).then(response =>{
            delete_employee_db(response.delete_employee)
        })
    })
}

/**
 * @function update_employee_role
 */
function update_employee_role(){
    db.query('SELECT first_name, last_name FROM employees_db', (err, employees_name) =>{
        employees_array = []
        for (e of employees_name){
            employees_array.push(`${e.first_name} ${e.last_name}`)
        }
        db.query('SELECT title FROM roles_db', (err, title_roles) =>{
            title_array = []
            for (e of title_roles){
                title_array.push(e.title)
            }
            // Question the we need to update the employe role
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select the employee that you want to update:',
                    name:  'update_employee',
                    choices: employees_array
                },
                {
                    type: 'list',
                    message: 'What is his/her role?',
                    name:  'role_name',
                    choices: title_array
                },
            // Passing the answer to other function (man_data.js)
            ]).then(response =>{
                update_employee_db(response.update_employee, response.role_name)
            })
        })
    })
}

/**
 * @function init_question - questions that will prompt first
 */
function init_question(){
    inquirer.prompt(options_first).then(response =>{
        response.options_chosen == 'View All Departments' ? view_departments() //function to view department
        : response.options_chosen == 'View All Roles' ? view_role() //function to view roles
        : response.options_chosen == 'View All Employees' ? view_employees() //function to view employees
        : response.options_chosen == 'Add a Department' ? add_department() //function to add a department
        : response.options_chosen == 'Add a Role' ? add_role() //function to add a role
        : response.options_chosen == 'Delete One Role' ? delete_role() //function to delete one role
        : response.options_chosen == 'Add an Employee' ? add_employee() //function to view employee
        : response.options_chosen == 'Delete One Employee' ? delete_employee() //function to delete one employee
        : update_employee_role() //function to update an employee role
    })
}
init_question();

