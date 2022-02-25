import { authAPI, profileAPI } from "../api/api";
import baseURL from "../common/baseUrl/serverUrl";
import { Toast } from 'bootstrap'

const SET_USER_DATA = 'setAuthUserData';
const SET_PERSONAL_DATA_USER = 'setPersonalDataUser';
const SAVE_PHOTO = 'savePhoto';
const LOGOUT_USER = 'logoutUser';
const IS_LOADING = 'isLoading';
const TEXT_ERROR = 'textError';
const TEXT_ERROR_NULL = 'textErrorNull';

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
    isAuth: false,
    isLoading: false,
    textError: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            if (action.payload.avatar)
                action.payload.avatar = baseURL + action.payload.avatar;
            return { ...state, ...action.payload }

        case SET_PERSONAL_DATA_USER:
            return { ...state, [action.field]: action.newData };

        case SAVE_PHOTO:
            action.avatar = baseURL + action.avatar;
            return { ...state, avatar: action.avatar };

        case LOGOUT_USER:
            localStorage.setItem('token', ""); //обнуляем в localstorage значение токена
            return { ...state, user_id: null, user_name: null, surname: null, email: null, date_births: null, place_work_study: null, direction_work_study: null, status: "", avatar: null, isAuth: false };

        case IS_LOADING:
            return { ...state, isLoading: !state.isLoading };

        case TEXT_ERROR:
            return { ...state, textError: action.textError };

        case TEXT_ERROR_NULL:
            return { ...state, textError: "" };

        default:
            return state;
    }
}

export default authReducer;

export const setAuthUserData = (dataUser, isAuth) => ({ type: SET_USER_DATA, payload: { ...dataUser, isAuth } });
export const setPersonalDataUserSuccess = (field, newData) => ({ type: SET_PERSONAL_DATA_USER, field, newData });
export const setNewAvatarSuccess = (avatar) => ({ type: SAVE_PHOTO, avatar });
export const logoutUser = () => ({ type: LOGOUT_USER })
export const isLoadingAction = () => ({ type: IS_LOADING })
export const textErrorAction = (textError) => ({ type: TEXT_ERROR, textError })
export const textErrorNull = () => ({ type: TEXT_ERROR_NULL })


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

export const setPersonalDataUserThunk = (field, newData) => {
    return (dispatch) => {
        profileAPI.setStatusUser(field, newData)
            .then(
                message => {
                    console.log(message);
                    dispatch(setPersonalDataUserSuccess(field, newData));
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
export const registrationUserThunk = (name, surname, email, password) => (dispatch) => {
    authAPI.registration(name, surname, email, password)
        .then(
            data => {
                console.log(data);
                if (typeof data.token != 'undefined') {
                    localStorage.setItem('token', data.token); //записываем в localstorage значение приходящего токена
                    dispatch(authUserThunk());
                    // dispatch(setAuthUserData(data.values.results.insertId, name, surname, email, true));
                    dispatch(isLoadingAction());
                }
                else {
                    dispatch(isLoadingAction());
                    dispatch(textErrorAction(data));
                }
            }
        )
}

//Авторизация
export const loginUserThunk = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then(
            data => {
                console.log(data);
                if (typeof data.token != 'undefined') {
                    localStorage.setItem('token', data.token); //записываем в localstorage значение приходящего токена
                    dispatch(authUserThunk());
                    dispatch(isLoadingAction());
                }
                else {
                    dispatch(isLoadingAction());
                    dispatch(textErrorAction(data));
                }
            }
        )
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