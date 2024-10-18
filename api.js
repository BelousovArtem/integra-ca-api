import axios from 'axios';

// Вход пользователя
const login = async (apiUrl, alias, username, password) => {
    const response = await axios.get(`${apiUrl}/getticket?alias=${alias}&password=${password}&login=${username}`);
    if (response.data.details) {
        // Сохраняем токен в localStorage или в другой безопасной зоне
        //const text = await response.text();
        //if (!text.includes('details')) return text;
        //return JSON.parse(text);
    }
    return response.data;
};

// Выход пользователя
const logout = async (apiurl, ticket) => {
    const response = await axios.get(`${apiurl}/logout?ticket_id=${ticket}`);
    return response.data;
};

// Загрузка настроек с сервера авторизации
const getSettings = async (apiUrl, ticket, appName) => {
    const response = await axios.get(`${apiUrl}/getsettings?ticket_id=${ticket}&app_name=${appName}`);
    if (response.data) {
        return response.data[appName];
    }
    return response.data;
};

// Сохранение настроек на сервера авторизации
const setSettings = async (apiUrl, ticket, user, appName, settings) => {
    const response = await axios.post(`${apiUrl}/setusersetting?ticket_id=${ticket}&user_login=${user}&app_name=${appName}`,
        settings);
    return response.data;
};

// Проверка тикета пользователя на сервере авторизации
const checkTicket = async (apiUrl, ticket) => {
    const response = await axios.get(`${apiUrl}getlogin?ticket_id=${ticket}`);
    if (response.data) {
        // Проверяем код ошибки с сервера
        if (response.data.indexOf('401: Unauthorized') === -1 && response.data.indexOf('details') === -1) {
            return ticket;
        } else {
            throw 'unauthorized';
        }
    }
}

export default {
    login,
    logout,
    getSettings,
    setSettings,
    checkTicket,
};
