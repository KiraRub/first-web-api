/* eslint-disable */
import {DataTypes, Model} from "sequelize";
import {UserRepository} from "./user.repository";

const {Sequelize} = require('sequelize');

export class Users extends Model {

    public static User = UserRepository.sequelize.define('User', {
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
    })
}


