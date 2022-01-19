import { authAPI, usersAPI, profileAPI } from "../api/api";

const SET_USER_DATA = 'setAuthUserData';

let initialState = {
    user_id: null,
    user_name: null,
    surname: null,
    email: null,
    date_births: null,
    place_work_study: null,
    direction_work_study: null,
    status: null,
    avatar: null,
    isAuth: false
}

const authRedux = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload }

        default:
            return state;
    }
}

export default authRedux;

export const setAuthUserData = (dataUser) => ({ type: SET_USER_DATA, payload: { ...dataUser } });



//Санки(thunk)

export const authUserThunk = () => (dispatch) => {
    return authAPI.authUser()
        .then(
            data => {
                dispatch(setAuthUserData(data.values[0]));
            },
            error => {
                console.log(error);
            }
        )
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
                    localStorage.setItem('token', data.values.token); //записываем в localstorage значение приходящего токена
                    //dispatch(setAuthUserData(data.values.results.insertId, name, surname, email, true));
                },
                error => {
                    console.log(error);
                    //Выводим Alert с ошибкой
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