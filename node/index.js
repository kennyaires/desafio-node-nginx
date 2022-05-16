const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTableSql = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id)) `


app.get('/', (req,res) => {
    const innerConnection = mysql.createConnection(config)

    const name = req.query.name? req.query.name : 'Kenny';
    const insertSql = `INSERT INTO people(name) values('${name}')`;

    innerConnection.query(insertSql, (err, result) => {
        innerConnection.query("select * from people", (err, result) => {
            console.log(result[0]["name"])
            list = "";
            result.forEach(element => {
                list += `<li>${element["name"]}</li>`                
            });
            innerConnection.end()
            res.send("<h1>Full Cycle Rocks!</h1><br>"+list)
        })
    })

})

connection.query(createTableSql,  (err, result) => {
    console.log("Tabela criada")
    app.listen(port, () => {
        console.log("Rodando na porta "+port)
    })                     
})