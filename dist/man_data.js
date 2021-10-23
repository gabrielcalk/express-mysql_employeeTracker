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
    db.query('SELECT name FROM departments_db', (err, names) =>{
        for (e of names){
            if(e.name = name_department){
                console.log('Esse departamento ja existe')
                init_question()
            }
        }
    })
    console.log('adicionado')
    // Adicionar department
    // a mensagem para por o nome do departamento esta repetida, porem esta verificando se o nome ja existe
} 

module.exports = {view_departments, view_role, view_employees, add_department_db}