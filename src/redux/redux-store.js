import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profile-reducer";
import messengerReducer from "./messenger-reducer";
// import sidebarRedux from "./sidebar-reducer";
// import usersRedux from "./users-reducer";
import authReducer from "./auth_reducer";
import appReducer from "./app-reducer";
import bookReducer from "./book-reducer";
import commentsReducer from "./comments-reducer";
import thunkMiddleware from "redux-thunk";
// import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    //данные для постов и сообщений : редьюсоры
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    // usersPage: usersRedux,
    auth: authReducer, //это уже не страница, а аутентификация поэтому Page опускаем
    bookPages: bookReducer,
    comments: commentsReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;