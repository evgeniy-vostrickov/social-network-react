import axios from 'axios'

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://192.168.0.165:3500/',
    // timeout: 100,
})

//Перехват запроса для записи токена
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const auth = token ? token : '';
        config.headers.common['Authorization'] = auth;
        return config;
    },
    (error) => Promise.reject(error),
);


export const profileAPI = {
    // setUserProfile (id) {
    //     return instance.get(`profile/` + id)
    //     .then(response => response.data)
    // },
    // getStatusUser (id) {
    //     return instance.get(`profile/status/` + id)
    //     .then(response => response.data)
    // },
    // setStatusUser (status) {
    //     return instance.put(`profile/status/`, {status: status})
    //     .then(response => response.data)
    // },
    // savePhoto (photoFile) {
    //     const formData = new FormData();
    //     formData.append("image", photoFile);

    //     return instance.put(`profile/photo/`, formData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => response.data)
    // }
    getFriends() {
        return instance.get(`profile/friends`)
            .then(response => response.data, error => error.response.data)
    },
    getGroups() {
        return instance.get(`profile/groups`)
            .then(response => response.data, error => error.response.data)
    },
    setStatusUser(status) {
        return instance.put(`profile/status/`, { status: status })
            .then(response => response.data)
    },
    saveAvatar(image) {
        const fd = new FormData();
        fd.append('image', image);
        return instance.put(`profile/avatar/`, fd)
        .then(response => response.data.values)
    }
}
export const usersAPI = {
    getUsers() {
        return instance.get(`users`)
            .then(response => response.data, error => console.log(error))
    },

    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },

    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}
export const authAPI = {
    authUser() {
        return instance.get(`auth/me`)
            .then(response => response.data, error => error.response.data)
    },
    registration(name, surname, email, password) {
        return instance.post(`auth/signup`, { name, surname, email, password })
            .then(response => response.data, error => error.response.data)
    },
    login(email, password) {
        return instance.post(`auth/signin`, { email, password })
            .then(response => response.data, error => error.response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    }
}
export const messageAPI = {
    getAllDialogs() {
        return instance.get(`dialog/all`)
            .then(response => response.data.values);
    },
    getAllMessages(dialogId) {
        return instance.get(`messages?dialog=` + dialogId)
            .then(response => response.data.values);
    },
    addNewDialog(user_id, message) {
        return instance.post(`dialog/add`, {user_id, message})
            .then(response => response.data);
    },
    addNewMessage(dialogId, numLastMessage, userId, message) {
        return instance.post(`message/send`, {dialogId, numLastMessage, userId, message})
            .then(response => response.data);
    }
}