import { SET_MESSAGE } from '../actions/ActionTypes';

const initialState = {
    title:'',
    message: ''
};

export default reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MESSAGE:
            return {
                ...state,
                title: action.payload.title,
                message: action.payload.message
            }
        default: return state
    }
}