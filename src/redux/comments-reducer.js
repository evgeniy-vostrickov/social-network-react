import { bookAPI } from "../api/api";

const GET_ALL_COMMENTS = 'getAllComments';
const SET_COMMENTS = 'setComments';
const GET_LAST_QUOTES = 'getLastQuotes';

const comments = {
    reviews: "Рецензия",
    arguments: "Аргументы",
    glossary: "Глоссарий",
    quotes: "Цитаты",
    quoting: "Цитирование"
}

let initialState = {
    comments: [],
    quotes: [], //страница с цитатами
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            action.comments = action.comments.reverse(); //сохраняем в обратном направлении для правильного отображения
            return { ...state, comments: [...action.comments] }
        case SET_COMMENTS:
            state.comments.unshift(action.comment); //сохраняем в начале массива для правильного отображения
            return { ...state, comments: [...state.comments] }
        case GET_LAST_QUOTES:
            return { ...state, quotes: [...action.quotes] }
        default:
            return state;
    }
}

export default commentsReducer;


export const getAllComments = (comments) => ({ type: GET_ALL_COMMENTS, comments });
export const setComments = (comment) => ({ type: SET_COMMENTS, comment });
export const getLastQuotes = (quotes) => ({ type: GET_LAST_QUOTES, quotes });


export const getAllCommentsThunk = (bookId, commentName) => (dispatch) => {
    bookAPI.getAllComments(bookId, comments[commentName])
        .then(
            comments => {
                console.log(comments);
                dispatch(getAllComments(comments));
            }
        )
}
export const addNewCommentThunk = (bookId, commentName, comment) => (dispatch) => {
    bookAPI.addNewComment(bookId, comments[commentName], comment)
        .then(
            comment => {
                console.log(comment);
                dispatch(setComments(comment[0]));
            }
        )
}
export const getAllCommentsUserThunk = (commentName) => (dispatch) => {
    bookAPI.getAllCommentsUser(comments[commentName])
        .then(
            comments => {
                console.log(comments);
                dispatch(getAllComments(comments));
            }
        )
}
export const getLastQuotesThunk = () => (dispatch) => {
    bookAPI.getLastQuotes()
        .then(
            quotes => {
                console.log(quotes)
                dispatch(getLastQuotes(quotes));
            }
        )
}