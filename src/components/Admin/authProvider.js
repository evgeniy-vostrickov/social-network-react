import { adminAPI } from "../../api/api";

export default {
    // вызывается, когда пользователь пытается войти в систему
    login: ({ username, password }) => {
        adminAPI.login(username, password)
        .then(
            data => {
                console.log(data)
                localStorage.setItem('username', username);
            }
        )
        return Promise.resolve();
    },
    // вызывается, когда пользователь нажимает на кнопку выхода из системы
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // вызывается, когда API возвращает ошибку
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // вызывается, когда пользователь переходит в новое местоположение для проверки подлинности
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // вызывается, когда пользователь переходит в новое местоположение, чтобы проверить наличие разрешений / ролей
    getPermissions: () => Promise.resolve(),
};