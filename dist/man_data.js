const mysql = require('mysql2')
// Connection to mysql database
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

    // Selecting name on the departments_Db
    db.query('SELECT name FROM departments_db', (err, names_dep) =>{
    let index_text = names_dep.findIndex(names_dep => names_dep.name == name_department);
    
    //Checking with the department exist
        if (index_text >= 0){
            console.log('This Department Already Exist')
        } else{

    // If don't exist, then add new department
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

    //Selecting everything on the line that the name matchs with the one that the user provide
    db.query(`SELECT * FROM departments_db WHERE name='${department.department_name}'`, (err, department_results) =>{
        if(err){
            console.log(err)
        } else{
            // Inserting informations about the new role
            db.query(`INSERT INTO roles_db (title, salary, department_id) VALUES (?, ?, ?)`, [nameAndSalary.role_name, nameAndSalary.salary, department_results[0].id], (err, results) =>{
                if(err){
                    console.log(err)
                } else{
                    console.log(`Added New Role: ${nameAndSalary.role_name}!`)
                }
            })
        }    
    })
}

/**
 * @function delete_role_db
 * @property role_name
 */
const delete_role_db = (role_name) =>{
    //Selecting everthing on the line that the title match with role name that the user provide
    db.query(`SELECT * FROM roles_db WHERE title='${role_name}'`, (err, role_name_db) =>{
        if(err){
            console.log(err)
        } else{
            // Deleting the role that the user choose
            db.query(`DELETE FROM roles_db WHERE id = ?`, [role_name_db[0].id], (err, results) =>{
                if(err){
                    console.log(err)
                } else{
                    console.log(`${role_name} is Deleted`)
                }
            })
        }
    })
}

/**
 * @function add_employee_db
 * @property fname, lname, role and manager(boolean)
 */
const add_employee_db = (names, response_manAndRole) =>{
    // Selecting everything on the line form roles_db that matchs with the title that the user provide
    db.query(`SELECT * FROM roles_db WHERE title='${response_manAndRole.role_name}'`, (err, department_results) =>{
        if (err){
            console.log(err)
        } else{
            var manager_boolean
            if(response_manAndRole.manager == 'Yes'){
                manager_boolean = 1
            } else{
                manager_boolean = 0
            }
            // Insert new informations to the data base
            db.query(`INSERT INTO employees_db (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [names.fname, names.lname, department_results[0].id, manager_boolean], (err, results) =>{
                if(err){
                    console.log(err)
                } else{
                    console.log(`Added New Employee: ${names.fname} ${names.lname}!`)
                }
            })
        }
    })
}

/**
 * @function update_employee_db
 * @property employee(name), role
 */
const update_employee_db = (employee, role) =>{
    var split_name = employee.split(' ')
    // Selecting everything where the first name 
    // of the employee matchs the one that the user provide
    db.query(`SELECT * FROM employees_db WHERE first_name='${split_name[0]}' AND last_name='${split_name[1]}'`, (err, employee_info) =>{
        if (err){
            console.log(err)
        } else{
            db.query(`SELECT * FROM roles_db WHERE title='${role}'`, (err, role_info) =>{
                if (err){
                    console.log(err)
                } else{
                    db.query(`UPDATE employees_db SET role_id = ? WHERE id = ?`, [role_info[0].id, employee_info[0].id], (err, results) =>{
                        console.log(`${employee} role is Updated!`)
                    })
                }
            })
        }
    })
}

/**
 * @function delete_employee_db
 * @property employee name
 */
const delete_employee_db = (delete_employee_name) => {
    var split_name = delete_employee_name.split(' ')
    // Selecting everything where the first name 
    // of the employee matchs the one that the user provide
    db.query('SELECT * FROM employees_db WHERE first_name= ? AND last_name=?', [split_name[0], split_name[1]], (err, name_employee) =>{
        if(err){
            console.log(err)
        } else{
            db.query(`DELETE FROM employees_db WHERE id = ?`, [name_employee[0].id], (err, results) =>{
                if(err){
                    console.log(err)
                } else{
                    console.log(`${delete_employee_name} is Deleted`)
                }
            })
        }
    })
}

//Exporting all the functions
module.exports = {view_departments, 
                view_role, 
                view_employees, 
                add_department_db, 
                add_role_db, 
                delete_role_db,
                add_employee_db, 
                update_employee_db,
                delete_employee_db, 
                db}