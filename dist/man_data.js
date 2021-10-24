const mysql = require('mysql2')
const init_question = require('./question')

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
 * @function add_department_db
 * @property name, salary, department of the role
 */
const add_role_db = (role_informations) =>{
    console.log(role_informations)
}

module.exports = {view_departments, view_role, view_employees, add_department_db, add_role_db}