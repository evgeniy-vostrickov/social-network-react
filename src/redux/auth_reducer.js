import { authAPI, profileAPI } from "../api/api";
import baseURL from "../common/baseUrl/serverUrl";

const SET_USER_DATA = 'setAuthUserData';
const SET_STATUS_USER = 'setStatusUser';
const SAVE_PHOTO = 'savePhoto';

let initialState = {
    user_id: null,
    user_name: null,
    surname: null,
    email: null,
    date_births: null,
    place_work_study: null,
    direction_work_study: null,
    status: "",
    avatar: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            if (action.payload.avatar)
                action.payload.avatar = baseURL + action.payload.avatar;
            return { ...state, ...action.payload }

        case SET_STATUS_USER:
            return { ...state, status: action.status };

        case SAVE_PHOTO:
            action.avatar = baseURL + action.avatar;
            return { ...state, avatar: action.avatar };

        default:
            return state;
    }
}

export default authReducer;

export const setAuthUserData = (dataUser, isAuth) => ({ type: SET_USER_DATA, payload: { ...dataUser, isAuth } });
export const setStatusUserSuccess = (status) => ({ type: SET_STATUS_USER, status });
export const setNewAvatarSuccess = (avatar) => ({ type: SAVE_PHOTO, avatar });


//Санки(thunk)

export const authUserThunk = () => (dispatch) => {
    return authAPI.authUser()
        .then(
            data => {
                if (data != 'Unauthorized')
                    dispatch(setAuthUserData(data.values[0], true));
            }
        )
}

export const setStatusUserThunk = (status) => {
    return (dispatch) => {
        profileAPI.setStatusUser(status)
            .then(
                newStatus => {
                    console.log(newStatus);
                    dispatch(setStatusUserSuccess(status));
                },
                error => {
                    console.log(error);
                }
            )
    }
}

export const saveAvatarThunk = (file) => {
    return (dispatch) => {
        profileAPI.saveAvatar(file)
            .then(
                avatar => {
                    dispatch(setNewAvatarSuccess(avatar));
                }
            )
    }
}

//Регистрация
export const registrationUserThunk = (name, surname, email, password) => {
    return (dispatch) => {
        authAPI.registration(name, surname, email, password)
            .then(
                data => {
                    console.log(data);
                    //dispatch(setAuthUserData(data.values.results.insertId, name, surname, email, true));
                },
                error => {
                    console.log(error);
                    //Выводим Alert с ошибкой
                }
            )

        // usersAPI.getUsers()
        //     .then(
        //         data => {
        //             console.log(data);
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //     )

        // profileAPI.getFriends()
        //     .then(
        //         data => {
        //             console.log(data);
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //     )

        // authAPI.authUser()
        //     .then(
        //         data => {
        //             console.log(data);
        //             console.log(data.values[0]);
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //     )
    }
}

//Авторизация
export const loginUserThunk = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password)
            .then(
                data => {
                    console.log(data);
                    if (typeof data.token != 'undefined') {
                        console.log(data);
                        localStorage.setItem('token', data.token); //записываем в localstorage значение приходящего токена
                        dispatch(authUserThunk());
                    }
                    else
                        //Выводим Alert с ошибкой data (не всегда в data)
                        console.log(data);
                    //dispatch(setAuthUserData(data.values.results.insertId, name, surname, email, true));
                },
                error => {
                    console.log(error);

                }
            )
    }
}

// export const logoutUserThunk = (login) => {
//     console.log(login);
//     return (dispatch) => {
//         authAPI.logout()
//             .then(data => {
//                 if (data.resultCode === 0) {
//                     dispatch(setAuthUserData(null, null, null, false));
//                 }
//             }
//             );
//     }
// }