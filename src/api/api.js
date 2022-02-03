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
    getFriends() {
        return instance.get(`profile/friends`)
            .then(response => response.data.values, error => error.response.data)
    },
    getGroups() {
        return instance.get(`profile/groups`)
            .then(response => response.data.values, error => error.response.data)
    },
    setStatusUser(status) {
        return instance.put(`profile/status/`, { status: status })
            .then(response => response.data.values)
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
    addNewDialog(user_id, message, timestamp) {
        return instance.post(`dialog/add`, { user_id, message, timestamp })
            .then(response => response.data, error => error.response.data);
    },
    addNewMessage(dialogId, numLastMessage, userIdRecipient, message, timestamp) {
        return instance.post(`dialog/message/send`, { dialogId, numLastMessage, userIdRecipient, message, timestamp })
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
        for (const [key, value] of Object.entries(dataAboutBook)) {
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
        return instance.post(`book/comments?book=${bookId}&comment=${commentName}`, { comment })
            .then(response => response.data.values);
    },
    addBookInDiaryReader(bookId, sectionDiary) {
        return instance.post(`book/diary/add?book=${bookId}`, { sectionDiary })
            .then(response => response.data.values);
    },
    getAllBooks(page, count) {
        return instance.get(`book/all?page=${page}&count=${count}`)
            .then(response => response.data.values);
    },
    foundBooks(page, count, fieldFind, searchField) {
        return instance.get(`book/find?page=${page}&count=${count}&fieldFind=${fieldFind}&searchField=${searchField}`)
            .then(response => response.data.values);
    },
    getBooksDiaryReader(typeDiary) {
        return instance.get(`book/diary?typeDiary=${typeDiary}`)
            .then(response => response.data.values);
    },
    setBooksDiaryReader(bookId, typeDiary) {
        return instance.post(`book/diary?book=${bookId}`, {typeDiary})
            .then(response => response.data.values);
    },
}
export const groupAPI = {
    getFullInfoGroup(groupId) {
        return instance.get(`group/info/full?group=${groupId}`)
            .then(response => response.data.values);
    },
    joinGroup(groupId) {
        return instance.post(`group/subscribe`, { groupId })
            .then(response => response.data.values);
    },
    leaveGroup(groupId) {
        return instance.post(`group/unsubscribe`, { groupId })
            .then(response => response.data.values);
    },
    addNewEvent(groupId, event) {
        const fd = new FormData();
        for (const [key, value] of Object.entries(event)) {
            fd.append(key, value);
        }
        return instance.post(`group/events?group=${groupId}`, fd)
            .then(response => response.data.values);
    },
    getAllEvent(groupId) {
        return instance.get(`group/events?group=${groupId}`)
            .then(response => response.data.values);
    },
    savePhotoGroup(groupId, image) {
        const fd = new FormData();
        fd.append('image', image);
        return instance.put(`group/image?group=${groupId}`, fd)
            .then(response => response.data.values)
    },
    getAllGroups(page, count) {
        return instance.get(`group/all?page=${page}&count=${count}`)
            .then(response => response.data.values);
    },
    foundGroups(page, count, searchField) {
        return instance.get(`group/find?page=${page}&count=${count}&searchField=${searchField}`)
            .then(response => response.data.values);
    },
    addNewGroup(dataAboutGroup) {
        const fd = new FormData();
        for (const [key, value] of Object.entries(dataAboutGroup)) {
            fd.append(key, value);
        }
        return instance.post(`group/add`, fd)
            .then(response => response.data.values)
    }
}
export const userAPI = {
    getAllUsers(page, count) {
        return instance.get(`users/all?page=${page}&count=${count}`)
            .then(response => response.data.values);
    },
    foundUsers(page, count, searchField) {
        return instance.get(`users/find?page=${page}&count=${count}&searchField=${searchField}`)
            .then(response => response.data.values);
    },
    getFullInfoUser(userId) {
        return instance.get(`users/info?user=${userId}`)
            .then(response => response.data.values);
    },
    followUser(userId, confirmation) {
        return instance.get(`users/follow?user=${userId}&confirmation=${confirmation}`)
            .then(response => response.data.values);
    },
    unfollowUser(userId) {
        return instance.get(`users/unfollow?user=${userId}`)
            .then(response => response.data.values);
    },
}