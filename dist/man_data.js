const mysql = require('mysql2')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'rootroot',
      database: 'employee_tracker'
    },
    console.log(`Connected to the movies_db database.`)
  );

/**
 * @function view_departments - from departments_db
 */
const view_departments = () => {
    db.query('SELECT name FROM departments_db', (err, departments) =>{
       if(err){
           console.log(err)
       }
        console.table(departments) 
    })
}

/**
 * @function view_role - from roles_db
 */
const view_role = () => {
    db.query('SELECT title, salary, department_id FROM roles_db', (err, roles) =>{
       if(err){
           console.log(err)
       }
        console.table(roles) 
    })
}

/**
 * @function view_employees - from employees_db
 */
const view_employees = () => {
    db.query('SELECT * FROM employees_db', (err, roles) =>{
       if(err){
           console.log(err)
       }
        console.table(roles) 
    })
}

/**
 * @function add_department_db
 * @property name (department)
 */
const add_department_db = (name_department) =>{
    var name_department = name_department

    db.query('SELECT name FROM departments_db', (err, names_dep) =>{
    let index_text = names_dep.findIndex(names_dep => names_dep.name == name_department);
    
        if (index_text >= 0){
            console.log('This Department Already Exist')
        } else{
            db.query(`INSERT INTO departments_db (name) VALUES (?)`, [name_department], (err, results) =>{
                if (err){
                    console.log(err)
                } else{
                    console.log(`Added ${name_department} To The Database`)
                }
            })
        }
    })
} 

/**
 * @function add_role_db
 * @property nameAndSalary.role_name / nameAndSalary.salary / department_results
 */
const add_role_db = (nameAndSalary, department) =>{
    db.query(`SELECT * FROM departments_db WHERE name='${department.department_name}'`, (err, department_results) =>{
        console.log(department_results[0].id)
        db.query(`INSERT INTO roles_db (title, salary, department_id) VALUES (?, ?, ?)`, [nameAndSalary.role_name, nameAndSalary.salary, department_results[0].id], (err, results) =>{
            if(err){
                console.log(err)
            } else{
                console.log(`Added New Role: ${nameAndSalary.role_name}!`)
            }
        })
    })
}

/**
 * @function add_employee_db
 * @property fname, lname, role and manager(boolean)
 */
const add_employee_db = (names, response_manAndRole) =>{
    db.query(`SELECT * FROM roles_db WHERE title='${response_manAndRole.role_name}'`, (err, department_results) =>{
        var manager_boolean

        if(response_manAndRole.manager == 'Yes'){
            manager_boolean = 1
        } else{
            manager_boolean = 0
        }

        db.query(`INSERT INTO employees_db (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [names.fname, names.lname, department_results[0].id, manager_boolean], (err, results) =>{
            if(err){
                console.log(err)
            } else{
                console.log(`Added New Employee: ${names.fname} ${names.lname}!`)
            }
        })
    })
}

const update_employee_db = (employee, role) =>{
    var split_name = employee.split(' ')

    db.query(`SELECT * FROM employees_db WHERE first_name='${split_name[0]}'`, (err, employee_info) =>{
        db.query(`SELECT * FROM roles_db WHERE title='${role}'`, (err, role_info) =>{
            db.query(`UPDATE employees_db SET role_id = ? WHERE id = ?`, [role_info[0].id, employee_info[0].id], (err, results) =>{
                console.log(`${employee} role is Updated!`)
            })
        })
    })
}

module.exports = {view_departments, 
                view_role, 
                view_employees, 
                add_department_db, 
                add_role_db, add_employee_db, 
                update_employee_db, 
                db}