/* eslint-disable */
import express, {request} from 'express';
import * as process from 'process'
import dotenv from 'dotenv'
import log4js from 'log4js'

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

app.post('/', urlencodedParser,(request, response) => {
    const { name, email } = request.body;

    const newUser = { id: 3, name, email };

    users.push(newUser)
    response.status(201).json(newUser);
});

app.get('/', (request, response) => {
    response.json(users);
});

app.listen(port, () => console.log(`Running on port ${port}`));
//