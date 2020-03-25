import {
    SET_PRODUCTS,
    ADDING_PRODUCT,
    PRODUCT_ADDED,
    PRODUCT_REMOVED,
    REQ_REMOVE_PRODUCT,
} from '../actions/ActionTypes';

const initialState = {
    products: [],
    creating_product: null,
    loading_products: null,
    removing_product: null,
}

export default reducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case ADDING_PRODUCT:
            return {
                ...state,
                creating_product: true,
            }
        case PRODUCT_ADDED:
            return {
                ...state,
                creating_product: false,
            }
        case REQ_REMOVE_PRODUCT:
            return {
                ...state,
                removing_product: true,
            }
        case PRODUCT_REMOVED:{
            return {
                ...state,
                removing_product: false,
            }
        }
        default:
            return state
    }
};