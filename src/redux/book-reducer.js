import { bookAPI } from "../api/api";
import baseURL from "../common/baseUrl/serverUrl";

const GET_PAYLOAD_DATA_ADD_BOOK = 'getPayloadDataAddBook';
const GET_DATA_ABOUT_BOOK = 'getDataAboutBook';
const SET_BOOK_ID_NULL = 'setBookIdNull';
const SET_SORTED_NULL = 'setSortedNull';
const SET_CHECK_NULL = 'setCheckNull';
const SET_BOOK_ID = 'setBookId';
const GET_ALL_BOOKS = 'getAllBooks';
const SORT_BOOKS = 'SortBooks';
const GET_ALL_SORT_BOOKS = 'getAllSortBooks';
const GET_RATING = 'setRating';
const GET_MY_RATING = 'setMyRating';
const GET_STATISTICS = 'getStatistics';
const GET_LAST_QUOTES = 'getLastQuotes';
const CHECK_IN_DIARY_READER = 'checkInDiaryReader';

const typesDiary = {
    past: 'Прочитанные книги',
    unfinished: 'Не дочитал',
    want: 'Хочу прочитать',
    now: 'Читаю сейчас',
}

const typesBook = {
    junior: 'Для младших классов',
    senior: 'Для старших классов',
    students: 'Для студентов'
}

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
    type_book: "",
    statistics: null,
    booksItems: [],
    isSorted: false,
    rating: null,
    myRating: null,
    quotes: null, //список последних цитат
    isDiaryReader: "", //проверка на нахождении книиг в дневнике читателя
    fieldSort: "", //поле по которому сортируют
    pageSize: 3, //число книг на странице
    totalBooksCount: null, //общее число книг
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
            return { ...state, bookId: action.dataAboutBook.book_id, bookName: action.dataAboutBook.book_name, bookDescription: action.dataAboutBook.book_description, author: action.dataAboutBook.author, yearPublication: action.dataAboutBook.year_publication, illustrationCover: baseURL + action.dataAboutBook.illustration_cover, ageRestrictions: action.dataAboutBook.age_restrictions, rating: action.dataAboutBook.rating, type_book: action.dataAboutBook.type_book, language: action.additionalData.language_name, genre: action.additionalData.genre_name, publish: action.additionalData.publish_name }
        case SET_BOOK_ID_NULL:
            return { ...state, bookId: null }
        case SET_SORTED_NULL:
            return { ...state, isSorted: false, fieldSort: "" }
        case SET_CHECK_NULL:
            return { ...state, isDiaryReader: "" }
        case SET_BOOK_ID:
            return { ...state, bookId: action.bookId }
        case GET_ALL_BOOKS:
            return { ...state, booksItems: [...action.listBooks.books], totalBooksCount: action.listBooks.totalCount }
        // case GET_ALL_SORT_BOOKS:
        //     return { ...state, booksItems: [...action.listBooks.books], totalBooksCount: action.listBooks.totalCount, fieldSort: action.fieldSort, isSorted: true }
        case SORT_BOOKS:
            return { ...state, isSorted: action.isSorted, fieldSort: action.fieldSort }
        case GET_RATING:
            return { ...state, rating: action.rating }
        case GET_MY_RATING:
            return { ...state, myRating: action.myRating }
        case GET_STATISTICS:
            return { ...state, statistics: { ...action.statistics } }
        case GET_LAST_QUOTES:
            return { ...state, quotes: [...action.quotes] }
        case CHECK_IN_DIARY_READER:
            return { ...state, isDiaryReader: action.data }
        default:
            return state;
    }
}

export default bookReducer;


export const getPayloadDataAddBook = (payload) => ({ type: GET_PAYLOAD_DATA_ADD_BOOK, payload });
export const getDataAboutBook = (dataAboutBook, additionalData) => ({ type: GET_DATA_ABOUT_BOOK, dataAboutBook, additionalData });
export const setBookIdNull = () => ({ type: SET_BOOK_ID_NULL });
export const setBookId = (bookId) => ({ type: SET_BOOK_ID, bookId });
export const setSortedNull = () => ({ type: SET_SORTED_NULL });
export const setCheckNull = () => ({ type: SET_CHECK_NULL });
export const getAllBooks = (listBooks) => ({ type: GET_ALL_BOOKS, listBooks });
export const sortBooksAction = (isSorted, fieldSort) => ({ type: SORT_BOOKS, isSorted, fieldSort });
export const getAllSortBooks = (listBooks, fieldSort) => ({ type: GET_ALL_SORT_BOOKS, listBooks, fieldSort });
export const getRating = (rating) => ({ type: GET_RATING, rating });
export const getMyRating = (myRating) => ({ type: GET_MY_RATING, myRating });
export const getStatistics = (statistics) => ({ type: GET_STATISTICS, statistics });
export const getLastQuotes = (quotes) => ({ type: GET_LAST_QUOTES, quotes });
export const checkInDiaryReader = (data) => ({ type: CHECK_IN_DIARY_READER, data });


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

export const getStatisticsBookThunk = (bookId) => (dispatch) => {
    bookAPI.getStatisticsBook(bookId)
        .then(
            statistics => {
                console.log(statistics);
                dispatch(getStatistics(statistics));
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
                dispatch(checkInDiaryReader(data))
            }
        )
}

export const getAllBooksThunk = (page, count, isSorted, fieldSort, typeBook, fieldFind, search) => (dispatch) => {
    if (isSorted === true) {
        dispatch(sortBooksAction(true, fieldSort));
    } else {
        dispatch(sortBooksAction(false, ""));
    }
    bookAPI.getAllBooks(page, count, isSorted, fieldSort, typesBook[typeBook], fieldFind, search)
        .then(
            listBooks => {
                console.log(listBooks)
                dispatch(getAllBooks(listBooks))
            }
        )
}

export const getBooksDiaryReaderThunk = (typeDiary) => (dispatch) => {
    console.log(typesDiary[typeDiary])
    bookAPI.getBooksDiaryReader(typesDiary[typeDiary])
        .then(
            listBooks => {
                console.log(listBooks)
                dispatch(getAllBooks(listBooks))
            }
        )
}

export const setBooksDiaryReaderThunk = (bookId, typeDiary, currentTypeDiary) => (dispatch) => {
    console.log(bookId, typesDiary[typeDiary])
    bookAPI.setBooksDiaryReader(bookId, typesDiary[typeDiary])
        .then(
            data => {
                console.log(data)
                dispatch(getBooksDiaryReaderThunk(currentTypeDiary))
            }
        )
}

// export const sortBooksThunk = (page, count, fieldSort, fieldFind, search, typeBook) => async (dispatch) => {

//     dispatch(sortBooksAction("true", fieldSort)); //первый вызов сортировки
//     !fieldSort && dispatch(sortBooksAction("false", fieldSort)); //проверка на отмену сортировки

//     bookAPI.getAllBooks(page, count, fieldSort ? "true" : "false", fieldSort, typesBook[typeBook], fieldFind, search)
//         .then(
//             listBooks => {
//                 console.log(listBooks)
//                 dispatch(getAllBooks(listBooks))
//             }
//         )
// }

export const setRatingThunk = (bookId, rating) => (dispatch) => {
    bookAPI.setRating(bookId, rating)
        .then(
            dataRating => {
                dispatch(getMyRating(rating))
                dispatch(getRating(dataRating))
            }
        )
}

export const getMyRatingThunk = (bookId) => (dispatch) => {
    bookAPI.getMyRating(bookId)
        .then(
            rating => {
                dispatch(getMyRating(rating))
            }
        )
}

export const checkInDiaryReaderThunk = (bookId) => (dispatch) => {
    bookAPI.checkInDiaryReader(bookId)
        .then(
            data => {
                console.log(data)
                dispatch(checkInDiaryReader(data.type_book))
            }
        )
}