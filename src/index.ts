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

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    response.json(users);
    console.log(response.json(users));
});



app.post('/', urlencodedParser, (req, res) => {
    const { name, email } = req.body;

    // Сохранить нового пользователя в базе данных или другом источнике данных
    const newUser = { id: 3, name, email };

    res.status(201).json(newUser);
});

app.listen(port, () => console.log(`Running on port ${port}`));
//