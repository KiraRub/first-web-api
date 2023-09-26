"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var express_1 = __importDefault(require("express"));
var process = __importStar(require("process"));
var dotenv_1 = __importDefault(require("dotenv"));
var log4js_1 = __importDefault(require("log4js"));
dotenv_1.default.config();
var logger = log4js_1.default.getLogger();
logger.level = process.env.LOG_LEVEL;
logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');
var app = (0, express_1.default)();
var port = process.env.PORT;
var urlencodedParser = express_1.default.urlencoded({ extended: false });
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/index.html");
    var users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    response.json(users);
    console.log(response.json(users));
});
app.post('/', urlencodedParser, function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email;
    // Сохранить нового пользователя в базе данных или другом источнике данных
    var newUser = { id: 3, name: name, email: email };
    res.status(201).json(newUser);
});
app.listen(port, function () { return console.log("Running on port ".concat(port)); });
//# sourceMappingURL=index.js.map