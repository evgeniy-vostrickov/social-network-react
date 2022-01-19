import { profileAPI, messageAPI } from "../api/api";

// const ADD_POST = 'addPost';
const SET_ITEMS_DIALOGS = 'DIALOGS:SET_ITEMS';
const SET_ITEMS_MESSAGE = 'MESSAGE:SET_ITEMS';
const SET_USER = 'DIALOGS:SET_USER';
const ADD_NEW_DIALOG = 'DIALOGS:ADD_NEW_DIALOG';
const ADD_NEW_MESSAGE = 'MESSAGE:ADD_NEW_MESSAGE';
const NUM_LAST_MESSAGE = 'MESSAGE:NUM_LAST_MESSAGE';

let initialState = {
    dialogsItems: [],
    messageItems: [],
    numLastMessage: 1,
    userId: 3,
    currentDialogId: null,
}

const messengerReducer = (state = initialState, action) => {
    //let stateCopy = {...state}; //создаем копию объекта, так как react работает только с чистыми функциями (data1 -> result1; data2 -> result2)
    switch (action.type) {
        case SET_ITEMS_DIALOGS:
            return {
                ...state,
                dialogsItems: [...action.dialogs],
            };
        case SET_ITEMS_MESSAGE:
            return {
                ...state,
                messageItems: [...action.messages],
            };
        case SET_USER:
            return {
                ...state,
                userId: action.userId,
            };
        case ADD_NEW_DIALOG:
            return {
                ...state,
                dialogsItems: [...state.dialogsItems, action.dialog],
            };
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messageItems: [...state.messageItems, action.message],
            };
        case NUM_LAST_MESSAGE:
            return {
                ...state,
                numLastMessage: action.number
            }
        // case 'DIALOGS:LAST_MESSAGE_READED_STATUS':
        //     return {
        //         ...state,
        //         items: state.items.map(dialog => {
        //             if (dialog._id === payload.dialogId) {
        //                 dialog.lastMessage.readed = true;
        //             }
        //             return dialog;
        //         }),
        //     };
        case 'DIALOGS:SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: action,
            };
        case 'MESSAGES:ADD_MESSAGE':
            return {
                ...state,
                items: [...state.items, action],
            };
        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                items: action,
                isLoading: false,
            };
        case 'DIALOGS:LAST_MESSAGE_READED_STATUS':
            return {
                ...state,
                items: state.items.map(message => {
                    if (message.dialog._id === action.dialogId) {
                        message.readed = true;
                    }
                    return message;
                }),
            };
        // case 'MESSAGES:REMOVE_MESSAGE':
        //     return {
        //         ...state,
        //         items: state.items.filter(message => message._id !== payload),
        //     };
        // case 'MESSAGES:SET_IS_LOADING':
        //     return {
        //         ...state,
        //         isLoading: payload,
        //     };
        default:
            return state;
    }
}


export const setDialogsAction = (dialogs) => ({ type: SET_ITEMS_DIALOGS, dialogs });
export const setMessagesAction = (messages) => ({ type: SET_ITEMS_MESSAGE, messages });
export const setUserAction = (userId) => ({ type: SET_USER, userId });
export const addNewDialogAction = (dialog) => ({ type: ADD_NEW_DIALOG, dialog });
export const addNewMessageAction = (message) => ({ type: ADD_NEW_MESSAGE, message });
export const numLastMessageAction = (number) => ({ type: NUM_LAST_MESSAGE, number });


//Санки(thunk)
export const getAllDialogsThunk = () => {
    return (dispatch) => {
        messageAPI.getAllDialogs()
            .then(
                dialogs => {
                    console.log(dialogs);
                    dispatch(setDialogsAction(dialogs));
                }
            )
    }
}

export const getAllMessagesThunk = (dialogId) => {
    return (dispatch) => {
        messageAPI.getAllMessages(dialogId)
            .then(
                data => {
                    console.log(data);
                    dispatch(setUserAction(data.userId))
                    dispatch(setMessagesAction(data.messages))
                    dispatch(numLastMessageAction(data.messages.length - 1))
                }
            )
    }
}

export const addNewDialogThunk = (userId, message) => {
    return (dispatch) => {
        messageAPI.addNewDialog(userId, message)
            .then(
                newDialog => {
                    console.log(newDialog);
                    // dispatch(addNewDialogAction(newDialog));
                }
            )
    }
}

export const addNewMessageThunk = (dialogId, numLastMessage, userId, message) => {
    return (dispatch) => {
        messageAPI.addNewMessage(dialogId, numLastMessage, userId, message)
            .then(
                newMessage => {
                    console.log(newMessage);
                    // dispatch(addNewMessageAction(newMessage));
                }
            )
    }
}

export default messengerReducer;



// setCurrentDialogId: id => dispatch => {
//     socket.emit('DIALOGS:JOIN', id);
//     dispatch({
//       type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
//       payload: id,
//     });
//   },