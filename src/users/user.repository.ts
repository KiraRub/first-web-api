/* eslint-disable */
import {Users} from "./user.model";
import {DataTypes, Model, Sequelize} from "sequelize";


export class UserRepository extends Model {

    public static userses = [];

    public static async conSequelize(){
        try {
            await UserRepository.sequelize.authenticate();
            console.log('Соединение прошло успешно.');
        } catch (error) {
            console.error('Невозможно подключиться к базе данных:', error);
        }
    }

    public static async  seqsync() {
        await UserRepository.sequelize.sync({force: true});
        console.log("Все модели польностью синхронизированы.");
    }

    sequelize = new Sequelize({
        database: 'my_db',
        username: 'root',
        password: 'admin',
        host: 'localhost',
        dialect: 'mysql',

    });
    public static async createUser() {
        try {
            var itsTime = new Date()
            const user = await Users.User.create({

                name: "Kirill",
                phone: "+79091049890",
                createAt: itsTime
            });
            console.log(Users.User === UserRepository.sequelize.models.User);
            console.log(user.toJSON());
            return user.toJSON();
        } catch (err) {
            console.log(err)
        } finally {
            // sequelize.close();
        }

    }

    public static async getUsers() {
        try {
            // Получение всех пользователей
            const users = await Users.User.findAll();
            console.log('Users:', users.map(user => user.toJSON()));
            UserRepository.userses.push(users);
        } catch (error) {
            console.error('Ошибка получения пользователей:', error);
        } finally {
            // Закрытие подключения к базе данных
            // await sequelize.close();
        }
    }

    public static async deleteUser() {
        try {
            // Удаление записи
            const deletedUser = await Users.User.destroy({where: {id: 1}});
        } catch (error) {
            console.error(error);
        }
    }

    public static getUserById() {

    }

    public static updateUser() {

    }


}
