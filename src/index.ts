/* eslint-disable */
import express from 'express';
import * as process from 'process'
import dotenv from 'dotenv'
import log4js from 'log4js'

//SEQUELIZE
////////////////////////////////////////
const {
    Sequelize,
    DataTypes
} = require('sequelize');
export const sequelize = new Sequelize({
    database: 'my_db',
    username: 'root',
    password: 'admin',
    host: 'localhost',
    dialect: 'mysql',

});

async function conSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Соединение прошло успешно.');
    } catch (error) {
        console.error('Невозможно подключиться к базе данных:', error);
    }
}

conSequelize();
////////////////////////////////
///////////////////////////////////////////
const User = sequelize.define('User', {
    // Описание модели пользователей
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    // Other model options go here
});
async function seqsync() {
    await sequelize.sync({force: true});
    console.log("Все модели польностью синхронизированы.");
    try {
        var itsTime = new Date()
        const user = User.create({
            id: 1,
            name: "Kirill",
            phone: "+79091049890",
            createAt: itsTime
        });
        console.log(User === sequelize.models.User);
    }
    catch (err){
        console.log(err)
    }
}
seqsync();


dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');

const app = express();
const port = process.env.PORT;

const urlencodedParser = express.urlencoded({extended: false});
const userses = [];

// connection.query("SELECT * FROM my_db.users",
//     function(err, results, fields) {
//         console.log(err);
//         console.log(results); // собственно данные
//         console.log(fields); // мета-данные полей
//     });
// connection.end();

app.post('/', urlencodedParser, (request, response) => {
    const {
        name,
        email
    } = request.body;

    const newUser = {
        id: 3,
        name,
        email
    };

    userses.push(newUser)
    response.status(201).json(newUser);
});

app.get('/users', (request, response) => {
    getUsers();
    response.json(userses);

});

app.delete('/', (request, response) => {
    userses.splice(0, 1);

    response.send("Удалили элемент")
});

app.put('/', (request, response) => {
    response.json(userses);
});

app.listen(port, () => console.log(`Запуск на порту: ${port}`));

async function getUsers() {
    try {
        // Получение всех пользователей
        const users = await User.findAll();
        console.log('Users:', users.map(user => user.toJSON()));
        userses.push(users);
    } catch (error) {
        console.error('Ошибка получения пользователей:', error);
    } finally {
        // Закрытие подключения к базе данных
        await sequelize.close();
    }
}

function getUserById() {

}

function createUser() {

}

function updateUser() {

}

function deleteUser() {

}


