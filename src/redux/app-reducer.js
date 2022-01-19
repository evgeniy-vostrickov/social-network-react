// import { authUserThunk } from "./auth_reducer";

const INITIALIZED_SUCCESS = 'initialized_success';

let initialState = {
    initialized: false
}

const appRedux = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }

        default:
            return state;
    }
}

export default appRedux;

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });



//Санки(thunk)
//в санку можно передавать и state в виде getState, например: return (dispatch, getState) => {

export const initializeAppThunk = () => {
    return (dispatch) => {
        // Временно закоментируем
        // let promise = dispatch(authUserThunk());
        // //dispatch(...)
        // promise.then(() => {
        //     dispatch(initializedSuccess());
        // }
        // );
        dispatch(initializedSuccess());
    }
}
