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

const view_departments = () => {
    db.query('SELECT name FROM departments_db', (err, departments) =>{
       if(err){
           console.log(err)
       }
        console.table(departments) 
    })
}

const view_role = () => {
    db.query('SELECT title, salary, department_id FROM roles_db', (err, roles) =>{
       if(err){
           console.log(err)
       }
        console.table(roles) 
    })
}

const view_employees = () => {
    db.query('SELECT * FROM employees_db', (err, roles) =>{
       if(err){
           console.log(err)
       }
        console.table(roles) 
    })
}

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

module.exports = {view_departments, view_role, view_employees, add_department_db}