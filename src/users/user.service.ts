/* eslint-disable */
class UserService {
    public validateEmail(email: string): boolean {
        // Паттерн для проверки валидности email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Проверяем соответствие email паттерну
        return emailPattern.test(email);
    }
}
