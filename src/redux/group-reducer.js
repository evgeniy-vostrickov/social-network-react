import { groupAPI } from "../api/api";
import baseURL from "../common/baseUrl/serverUrl";

const GET_DATA_ABOUT_GROUP = 'getDataAboutGroup';
const SUBSCRIBE_GROUP = 'subscribeGroup';
const UNSUBSCRIBE_GROUP = 'unsubscribeGroup';
const GET_ALL_EVENTS = 'getAllEvents';
const SET_EVENTS = 'setEvents';
const SAVE_PHOTO_GROUP = 'savePhotoGroup';
const GET_ALL_GROUPS = 'getAllGroups';
const SET_GROUP_ID_NULL = 'setGroupIdNull';

let initialState = {
    groupId: null,
    groupName: "",
    groupDescription: "",
    owner_id: null,
    owner_name: "",
    owner_surname: "",
    city: "",
    illustration_group: "",
    number_participants: 0,
    subscribe: false,
    eventsItems: [],
    groupsItems: [],
    pageSize: 3, //число групп на странице
    totalGroupsCount: null, //общее число групп
    portionSize: 10, //количество страниц в paginations
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_ABOUT_GROUP:
            return { ...state, groupId: action.dataAboutGroup.group_id, groupName: action.dataAboutGroup.group_name, groupDescription: action.dataAboutGroup.group_description, owner_id: action.dataAboutGroup.owner, owner_name: action.dataAboutGroup.user_name, owner_surname: action.dataAboutGroup.surname, city: action.dataAboutGroup.city, illustration_group: action.dataAboutGroup.illustration_group ? baseURL + action.dataAboutGroup.illustration_group : null, number_participants: action.dataAboutGroup.number_participants, subscribe: action.dataAboutGroup.subscribe }
        case SUBSCRIBE_GROUP:
            return { ...state, subscribe: true }
        case UNSUBSCRIBE_GROUP:
            return { ...state, subscribe: false }
        case GET_ALL_EVENTS:
            return { ...state, eventsItems: [...action.events] }
        case SET_EVENTS:
            return { ...state, eventsItems: [...state.eventsItems, action.event] }
        case SAVE_PHOTO_GROUP:
            action.image = baseURL + action.image;
            return { ...state, illustration_group: action.image };
        case GET_ALL_GROUPS:
            return { ...state, groupsItems: [...action.listGroups.groups], totalGroupsCount: action.listGroups.totalCount }
        case SET_GROUP_ID_NULL:
            return { ...state, groupId: null }
        default:
            return state;
    }
}

export default groupReducer;


export const getDataAboutGroup = (dataAboutGroup) => ({ type: GET_DATA_ABOUT_GROUP, dataAboutGroup });
export const subscribeGroup = () => ({ type: SUBSCRIBE_GROUP });
export const unsubscribeGroup = () => ({ type: UNSUBSCRIBE_GROUP });
export const getAllEvents = (events) => ({ type: GET_ALL_EVENTS, events });
export const setEvents = (event) => ({ type: SET_EVENTS, event });
export const savePhotoGroupSuccess = (image) => ({ type: SAVE_PHOTO_GROUP, image });
export const getAllGroups = (listGroups) => ({ type: GET_ALL_GROUPS, listGroups });
export const setGroupIdNull = () => ({ type: SET_GROUP_ID_NULL });


// export const getAdditionalInformation = (language_id, genre_id, publish_id, dataAboutBook) => (dispatch) => {
//     bookAPI.getAdditionalDataBook(language_id, genre_id, publish_id)
//         .then(
//             additionalData => {
//                 console.log(dataAboutBook);
//                 console.log(additionalData);
//                 dispatch(getDataAboutBook(dataAboutBook, additionalData))
//             }
//         )
// }

export const getFullInfoGroupThunk = (groupId) => (dispatch) => {
    groupAPI.getFullInfoGroup(groupId)
        .then(
            dataAboutGroup => {
                console.log(dataAboutGroup);
                dispatch(getDataAboutGroup(dataAboutGroup));
            }
        )
}

export const joinGroupThunk = (groupId) => (dispatch) => {
    groupAPI.joinGroup(groupId)
        .then(
            data => {
                console.log(data);
                dispatch(subscribeGroup());
            }
        )
}

export const leaveGroupThunk = (groupId) => (dispatch) => {
    groupAPI.leaveGroup(groupId)
        .then(
            data => {
                console.log(data);
                dispatch(unsubscribeGroup());
            }
        )
}

export const addNewEventThunk = (groupId, event) => (dispatch) => {
    groupAPI.addNewEvent(groupId, event)
        .then(
            event => {
                console.log(event);
                dispatch(setEvents(event[0]));
            }
        )
}

export const getAllEventThunk = (groupId) => (dispatch) => {
    groupAPI.getAllEvent(groupId)
        .then(
            events => {
                console.log(events);
                dispatch(getAllEvents(events));
            }
        )
}

export const savePhotoGroupThunk = (groupId, image) => (dispatch) => {
    groupAPI.savePhotoGroup(groupId, image)
        .then(
            image => {
                dispatch(savePhotoGroupSuccess(image));
            }
        )
}

export const getAllGroupsThunk = (page, count) => (dispatch) => {
    groupAPI.getAllGroups(page, count)
        .then(
            listGroups => {
                console.log(listGroups)
                dispatch(getAllGroups(listGroups))
            }
        )
}

export const foundGroupsThunk = (page, count, searchField) => (dispatch) => {
    groupAPI.foundGroups(page, count, searchField)
        .then(
            listGroups => {
                console.log(listGroups)
                dispatch(getAllGroups(listGroups))
            }
        )
}

export const addNewGroupThunk = (dataAboutGroup) => (dispatch) => {
    groupAPI.addNewGroup(dataAboutGroup)
        .then(
            dataAboutGroup => {
                dispatch(getDataAboutGroup(dataAboutGroup))
            }
        )
}