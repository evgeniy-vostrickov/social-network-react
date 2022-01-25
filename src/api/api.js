import axios from 'axios'
import baseURL from '../common/baseUrl/serverUrl';

const instance = axios.create({
    // withCredentials: true,
    baseURL: baseURL,
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
            .then(response => response.data.values, error => error.response.data.values.message)
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
        return instance.get(`dialog/message/all?dialog=` + dialogId)
            .then(response => response.data.values);
    },
    addNewDialog(user_id, message) {
        return instance.post(`dialog/add`, {user_id, message})
            .then(response => response.data);
    },
    addNewMessage(dialogId, numLastMessage, message, timestamp) {
        return instance.post(`dialog/message/send`, {dialogId, numLastMessage, message, timestamp})
            .then(response => response.data.values);
    }
}
export const bookAPI = {
    getPayloadForAddBook() {
        return instance.get(`book/add/payload`)
            .then(response => response.data.values);
    },
    addNewBook(dataAboutBook) {
        const fd = new FormData();
        for (const [key, value] of Object.entries(dataAboutBook)){
            fd.append(key, value);
        }
        return instance.post(`book/add`, fd)
            .then(response => response.data.values)
    },
    getFullInfoBook(bookId) {
        return instance.get(`book/info/full?book=${bookId}`)
            .then(response => response.data.values);
    },
    getAdditionalDataBook(language_id, genre_id, publish_id) {
        return instance.get(`book/info/additional?language=${language_id}&genre=${genre_id}&publish=${publish_id}`)
            .then(response => response.data.values);
    },
    getAllComments(bookId, commentName) {
        return instance.get(`book/comments?book=${bookId}&comment=${commentName}`)
            .then(response => response.data.values);
    },
    addNewComment(bookId, commentName, comment) {
        return instance.post(`book/comments?book=${bookId}&comment=${commentName}`, {comment})
            .then(response => response.data.values);
    },
    addBookInDiaryReader(bookId, sectionDiary) {
        return instance.post(`book/diary/add?book=${bookId}`, {sectionDiary})
            .then(response => response.data.values);
    },
    getAllBooks(page, count) {
        return instance.get(`book/all?page=${page}&count=${count}`)
            .then(response => response.data.values);
    },
}