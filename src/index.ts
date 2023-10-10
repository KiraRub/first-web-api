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

app.post('/users', urlencodedParser, (request, response) => {
    const {
        id,
        name,
        phone,
        createAt
    } = request.body;
    // response.json(createUser());
    response.json(createUser())
});

app.get('/users', (request, response) => {
    getUsers();
    response.json(userses);

});

app.delete('/users', (request, response) => {
    const id = request.body;
    deleteUser();
});

app.put('/users', (request, response) => {

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

async function createUser() {
    try {
        var itsTime = new Date()
        const user = await User.create({

            name: "Kirill",
            phone: "+79091049890",
            createAt: itsTime
        });
        console.log(User === sequelize.models.User);
        console.log(user.toJSON());
        return user.toJSON();
    } catch (err) {
        console.log(err)
    } finally {
        // sequelize.close();
    }

}

function updateUser() {

}

async function deleteUser() {
    try {
        // Удаление записи
        const deletedUser = await User.destroy({where: {id:1}});
    } catch (error) {
        console.error(error);
    }
}


