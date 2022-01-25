import { bookAPI } from "../api/api";
import baseURL from "../common/baseUrl/serverUrl";

const GET_PAYLOAD_DATA_ADD_BOOK = 'getPayloadDataAddBook';
const GET_DATA_ABOUT_BOOK = 'getDataAboutBook';
const SET_BOOK_ID_NULL = 'setBookIdNull';
const GET_ALL_BOOKS = 'getAllBooks';

let initialState = {
    bookId: null,
    bookName: "",
    bookDescription: "",
    author: "",
    yearPublication: null,
    language: "",
    genre: "",
    publish: "",
    illustrationCover: null,
    ageRestrictions: "",
    booksItems: [],
    pageSize: 3, //число книг на странице
    totalBooksCount: null, //общее число пользователей
    portionSize: 10, //количество страниц в paginations
    listAllLanguage: [],
    listAllPublication: [],
    listAllGenres: []
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYLOAD_DATA_ADD_BOOK:
            return { ...state, listAllLanguage: [...action.payload.languages], listAllPublication: [...action.payload.publish], listAllGenres: [...action.payload.genres] }
        case GET_DATA_ABOUT_BOOK:
            return { ...state, bookId: action.dataAboutBook.book_id, bookName: action.dataAboutBook.book_name, bookDescription: action.dataAboutBook.book_description, author: action.dataAboutBook.author, yearPublication: action.dataAboutBook.year_publication, illustrationCover: baseURL + action.dataAboutBook.illustration_cover, ageRestrictions: action.dataAboutBook.age_restrictions, language: action.additionalData.language_name, genre: action.additionalData.genre_name, publish: action.additionalData.publish_name }
        case SET_BOOK_ID_NULL:
            return { ...state, bookId: null }
        case GET_ALL_BOOKS:
            return { ...state, booksItems: [...action.books.rows], totalCount: action.books.totalCount }
        default:
            return state;
    }
}

export default bookReducer;


export const getPayloadDataAddBook = (payload) => ({ type: GET_PAYLOAD_DATA_ADD_BOOK, payload });
export const getDataAboutBook = (dataAboutBook, additionalData) => ({ type: GET_DATA_ABOUT_BOOK, dataAboutBook, additionalData });
export const setBookIdNull = () => ({ type: SET_BOOK_ID_NULL });
export const getAllBooks = (books) => ({ type: GET_ALL_BOOKS, books });


export const getPayloadForAddBookThunk = () => {
    return (dispatch) => {
        bookAPI.getPayloadForAddBook()
            .then(
                payload => {
                    console.log(payload);
                    dispatch(getPayloadDataAddBook(payload));
                }
            )
    }
}

export const getAdditionalInformation = (language_id, genre_id, publish_id, dataAboutBook) => (dispatch) => {
    bookAPI.getAdditionalDataBook(language_id, genre_id, publish_id)
        .then(
            additionalData => {
                console.log(dataAboutBook);
                console.log(additionalData);
                dispatch(getDataAboutBook(dataAboutBook, additionalData))
            }
        )
}

export const getFullInfoBookThunk = (bookId) => (dispatch) => {
    bookAPI.getFullInfoBook(bookId)
        .then(
            dataAboutBook => {
                dataAboutBook = dataAboutBook[0]; //получаем единственную запись
                dispatch(getAdditionalInformation(dataAboutBook.language_id, dataAboutBook.genre_id, dataAboutBook.publish_id, dataAboutBook));
            }
        )
}

export const addNewBookThunk = (dataAboutBook) => (dispatch) => {
    bookAPI.addNewBook(dataAboutBook)
        .then(
            dataAboutBook => {
                dispatch(getAdditionalInformation(dataAboutBook.language_id, dataAboutBook.genre_id, dataAboutBook.publish_id, dataAboutBook));
            }
        )
}

export const addBookInDiaryReaderThunk = (bookId, sectionDiary) => (dispatch) => {
    bookAPI.addBookInDiaryReader(bookId, sectionDiary)
        .then(
            data => {
                console.log(data)
            }
        )
}

export const getAllBooksThunk = (page, count) => (dispatch) => {
    bookAPI.getAllBooks(page, count)
        .then(
            books => {
                console.log(books)
                dispatch(getAllBooks(books))
            }
        )
}