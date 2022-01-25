import { profileAPI, messageAPI } from "../api/api";

// const ADD_POST = 'addPost';
const GET_FRIENDS = 'getFriends';
const GET_GROUPS = 'getGroups';
const UPDATE_INFO = 'updateInfo';
const SET_USER_PROFILE = 'setUserProfile';

let initialState = {
    friends: [],
    groups: [],
}

const profileReducer = (state = initialState, action) => {
    //let stateCopy = {...state}; //создаем копию объекта, так как react работает только с чистыми функциями (data1 -> result1; data2 -> result2)
    switch (action.type) {
        // case ADD_POST:
        //     let newPost = { id: "5", post: state.newPost, like: "0" };
        //     return { ...state, posts: [...state.posts, newPost], newPost: '' };

        case GET_FRIENDS:
            return { ...state, friends: [...action.friends] };

        case GET_GROUPS:
            return { ...state, groups: [...action.groups] };

        case UPDATE_INFO:
            // stateCopy.newPost = action.text;
            return { ...state, newPost: action.text };

        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };

        default:
            return state;
    }
}

// export const addPostActionCreator = () => ({ type: ADD_POST });
export const getFriendsAction = (friends) => ({ type: GET_FRIENDS, friends });
export const getGroupsAction = (groups) => ({ type: GET_GROUPS, groups });
export const updateInfoActionCreator = (text) => ({ type: UPDATE_INFO, text });
export const setUserProfileAction = (profile) => ({ type: SET_USER_PROFILE, profile });

// в файл помещаются все redux элементы, что бы разгрузить dispatch



//Санки(thunk)

export const getFriendsThunk = () => {
    return (dispatch) => {
        profileAPI.getFriends()
        .then(
            friends => {
                console.log(friends);
                dispatch(getFriendsAction(friends.values));
            },
            error => {
                console.log(error);
            }
        )
    }
}

export const getGroupsThunk = () => {
    return (dispatch) => {
        profileAPI.getGroups()
        .then(
            groups => {
                console.log(groups);
                dispatch(getGroupsAction(groups.values));
            },
            error => {
                console.log(error);
            }
        )
    }
}




// export const setUserProfileThunk = (userId) => {
//     return async (dispatch) => {
//         //уходим от колбэков к async/await
        
//         // profileAPI.setUserProfile(userId)
//         //     .then(data => {
//         //         dispatch(setUserProfileAction(data));
//         //     }
//         //     );

//         let data = await profileAPI.setUserProfile(userId);
//         dispatch(setUserProfileAction(data));
//     }
// }
// export const getStatusUserThunk = (userId) => {
//     return async (dispatch) => {
//         let data = await profileAPI.getStatusUser(userId)
//         dispatch(setStatusUserAction(data));
//     }
// }
// export const savePhotoThunk = (file) => {
//     return async (dispatch) => {
//         let data = await profileAPI.savePhoto(file)
//         if (data.resultCode === 0) {
//             dispatch(savePhotoThunkSuccess(data.data.photos));
//         }
//     }
// }

export default profileReducer;