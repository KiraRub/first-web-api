/* eslint-disable */
import express, {request} from 'express';
import * as process from 'process'
import dotenv from 'dotenv'
import log4js from 'log4js'
import mysql2 from 'mysql2';

//connect DB MySQL
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_db",
    password: "admin"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});



dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;



logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');


const app = express();
const port = process.env.PORT;

const urlencodedParser = express.urlencoded({extended: false});
const users = [];

connection.query("SELECT * FROM my_db.employees",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные
        console.log(fields); // мета-данные полей
    });
connection.end();

app.post('/', urlencodedParser,(request, response) => {
    const { name, email } = request.body;

    const newUser = { id: 3, name, email };

    users.push(newUser)
    response.status(201).json(newUser);
});

app.get('/', (request, response) => {
    response.json(users);
});

app.delete('/', (request, response) => {
users.splice(0,1);
response.send("Удалили элемент")
});

app.put('/', (request, response) => {
    response.json(users);
});

app.listen(port, () => console.log(`Running on port ${port}`));
//
