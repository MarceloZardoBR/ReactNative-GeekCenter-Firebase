import {
    LOGGIN_USER,
    IS_LOADED,
    LOGOUT_USER,
    EXPIRED_LOGIN,
    LOADING_USER
} from '../actions/ActionTypes';

const initialState = {
    id: null,
    name:null,
    lastname:null,
    email:null,
    firebase_token:null,
    enderecos:[{
        id: null,
        rua:null,
        numero: null,
        bairro:null,
        cidade:null,
        estado:null,
        cep:null
    }],
    compras:[{
        itens:[],
        status:null
    }],
    vendas:[{
        itens:[],
        status:null
    }],
    products:[{
        id: null,
    }],
    successLogged:null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGIN_USER:
            return{
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                lastname: action.payload.lastname,
                email: action.payload.email,
                firebase_token: action.payload.firebase_token,
                enderecos: [...action.payload.enderecos],
                compras: [...action.payload.compras],
                vendas: [...action.payload.vendas],
                products: [...action.payload.products]
            }
        case LOADING_USER:
            return {
                ...state,
                successLogged: false,
            }
        case IS_LOADED:
            return {
                ...state,
                successLogged: true
            }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        case EXPIRED_LOGIN:
            return {
                ...initialState
            }
        default: return state
    }
}

export default reducer;