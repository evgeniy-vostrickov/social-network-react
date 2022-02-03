import { userAPI } from "../api/api";
import { getFriendsThunk } from "./profile-reducer";

// const ADD_POST = 'addPost';
const GET_USERS = 'getUsers';
const GET_FULL_INFO_USER = 'getFullInfoUser';
const GET_USER_ID_NEW_DIALOG = 'getUserIdNewDialog';

let initialState = {
    friends: [],
    groups: [],
    userInfo: null,
    users: [],
    userIdDialog: null,
    pageSize: 3, //число групп на странице
    totalUsersCount: null, //общее число групп
    portionSize: 10, //количество страниц в paginations
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: [...action.listUsers.users], totalUsersCount: action.listUsers.totalCount }
        case GET_FULL_INFO_USER:
            return { ...state, friends: [...action.dataUser.friends], groups: [...action.dataUser.groups], userInfo: action.dataUser.userInfo }
        case GET_USER_ID_NEW_DIALOG:
            return { ...state, userIdDialog: action.userId }
        default:
            return state;
    }
}

// export const addPostActionCreator = () => ({ type: ADD_POST });
export const getUsersAction = (listUsers) => ({ type: GET_USERS, listUsers });
export const getFullInfoUserAction = (dataUser) => ({ type: GET_FULL_INFO_USER, dataUser });
export const getUserIdNewDialog = (userId) => ({ type: GET_USER_ID_NEW_DIALOG, userId });



//Санки(thunk)

export const getAllUsersThunk = (page, count) => (dispatch) => {
    userAPI.getAllUsers(page, count)
        .then(
            listUsers => {
                console.log(listUsers);
                dispatch(getUsersAction(listUsers));
            }
        )
}

export const foundUsersThunk = (page, count, searchField) => (dispatch) => {
    userAPI.foundUsers(page, count, searchField)
        .then(
            listUsers => {
                console.log(listUsers)
                dispatch(getUsersAction(listUsers))
            }
        )
}

export const getFullInfoUserThunk = (userId) => (dispatch) => {
    userAPI.getFullInfoUser(userId)
        .then(
            dataUser => {
                console.log(dataUser)
                dispatch(getFullInfoUserAction(dataUser))
            }
        )
}

export const followThunk = (userId, confirmation) => (dispatch) => {
    userAPI.followUser(userId, confirmation)
        .then(
            data => {
                console.log(data)
                dispatch(getFriendsThunk())
            }
        )
}

export const unfollowThunk = (userId) => (dispatch) => {
    userAPI.unfollowUser(userId)
        .then(
            data => {
                console.log(data)
                dispatch(getFriendsThunk())
            }
        )
}

export default userReducer;