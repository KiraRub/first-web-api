/* eslint-disable */
import express from 'express';
import * as process from 'process'
import dotenv from 'dotenv'
import log4js from 'log4js'
import {UserRepository} from "../users/user.repository";
//SEQUELIZE
////////////////////////////////////////
UserRepository.conSequelize();
////////////////////////////////
UserRepository.seqsync();

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');

const app = express();
const port = process.env.PORT;

const urlencodedParser = express.urlencoded({extended: false});

//Добавить пользователя
app.post('/users', urlencodedParser, (request, response) => {
    const {
        id,
        name,
        phone,
        createAt
    } = request.body;
    // response.json(createUser());
    response.json(UserRepository.createUser())
});

//Получить пользователей
app.get('/users', (request, response) => {
    UserRepository.getUsers();
    response.json(UserRepository.userses);
});

//Удалить пользователя
app.delete('/users', (request, response) => {
    const id = request.body;
    UserRepository.deleteUser();
});

//Изменить пользователя
app.put('/users', (request, response) => {

});

app.listen(port, () => console.log(`Запуск на порту: ${port}`));






