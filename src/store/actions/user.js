import {
    LOGGIN_USER,
    IS_LOADED,
    LOGOUT_USER,
    EXPIRED_LOGIN,
    LOADING_USER
} from './ActionTypes';

import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { AUTH_KEY } from 'react-native-dotenv';
import { setMessage } from '../actions/message';
import { getUserProducts } from './product'; 

const firebasebaseURL = 'https://identitytoolkit.googleapis.com';

const db = firestore().collection('users');

const state = {
    enderecos:[{
        
    }],
    compras:[{
        itens:[],
        status:null
    }],
    vendas:[{
        itens:[],
        status:null
    }],
    products:[]
}

const generateId = () =>{
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const userLogged = user =>{
    return{
        type:LOGGIN_USER,
        payload:user
    }
};

export const createUser = user =>{
    return dispatch =>{
        axios.post(`${firebasebaseURL}/v1/accounts:signUp?key=${AUTH_KEY}`,{
                email: user.email,
                password: user.password,
                returnSecureToken:true})
            .then(res =>{
              if(res.data.localId){
                  const newUser = {
                      email: user.email,
                      name: user.name,
                      lastname: user.lastname,
                      ...state
                  }
                    db.doc(res.data.localId).set({
                      ...newUser
                  }).then(res => console.log(res));
              }
          }) 
    }    
};

export const authUser = user =>{
    return dispatch =>{
        dispatch(loadingUser());
        axios.post(`${firebasebaseURL}/v1/accounts:signInWithPassword?key=${AUTH_KEY}`,{
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }).catch(err => {
            if(err.response.status == 400){
                dispatch(setMessage({
                    title: 'Falha no Login',
                    message: 'Email ou Senha Incorretos'
                }));
            }
        }).then(res => {
              if(res.data.localId){
                  db.doc(res.data.localId).get()
                    .then(doc => {
                        if(!doc.exists){
                            console.log('Documents dosent exists');
                        }else{
                            const userData = {
                                ...doc.data(),
                                firebase_token:res.data.idToken,
                                id: res.data.localId
                            };
                            dispatch(userLogged(userData));
                            dispatch(getUserProducts(res.data.localId));
                            dispatch(isLoaded());
                        }
                    }).catch(err => console.log(err));
              }
              
          })
    }
};

export const getUser = token =>{
    return dispatch =>{
        dispatch(loadingUser());
        axios.post(`${firebasebaseURL}/v1/accounts:lookup?key=${AUTH_KEY}`,{
            idToken: token
        }).catch(err => {
            if(err.response.status == 400){
                dispatch(setMessage({
                    title:'Sessão Expirada',
                    message: 'É necessário efetuar login novamente'
                }));
            }
        }).then(res => {
              if(res.data.users){
                  const user_id = res.data.users[0].localId;

                  db.doc(user_id).get()
                    .then(doc => {
                        if(!doc.exists){
                            console.log('Documents dosent exists');
                        }else{
                            const userData = {
                                ...doc.data(),
                                firebase_token:token,
                                id: user_id
                            };
                            dispatch(userLogged(userData));
                            dispatch(isLoaded())
                        }
                    });
              }
          })
    }
};

export const addAddress = data =>{
    return dispatch =>{
        axios.post(`${firebasebaseURL}/v1/accounts:lookup?key=${AUTH_KEY}`,{
            idToken: data.token
        }).catch(err => console.log(err.response))
          .then(res => {
              if(res.data.users){
                const user_id = res.data.users[0].localId;
                db.doc(user_id).get().then(doc => {
                    if(!doc.data().enderecos){
                        db.doc(user_id).update({
                            'enderecos.id': generateId(),
                            'enderecos.rua': data.endereco.rua,
                            'enderecos.numero': data.endereco.numero,
                            'enderecos.bairro': data.endereco.bairro,
                            'enderecos.cidade': data.endereco.cidade,
                            'enderecos.estado': data.endereco.estado,
                            'enderecos.cep': data.endereco.cep
                        });
                    }else{
                        const userAddress = doc.data().enderecos;
                        userAddress.push({
                            id: generateId(),
                            ...data.endereco
                        });
                        db.doc(user_id).update({
                            enderecos:userAddress
                        }).catch(err => console.log(err))
                          .then(dispatch(getUser(data.token)));
                    }
                });
              }
          })
    }
};

export const setUserProducts = (productId, user_id) =>{
    return dispatch => {
        db.doc(user_id).get().then(doc => {
            if(!doc.data().products){
                db.doc(user_id).update({
                    'id': productId
                }).then(res => {
                    console.log('Resposta Set User Products: '+ res);
                });
            } else {
                const userProducts = doc.data().products;
                userProducts.push({
                    id: productId,
                });
                db.doc(user_id).update({
                    products: userProducts
                }).catch(err => dispatch(setMessage({
                    title: 'Erro',
                    message: 'Ocorreu um erro ' + err
                })));
            }
        }).catch(err => console.log(err));
    }
}

export const deleteAddress = data =>{
    return async dispatch =>{
        axios.post(`${firebasebaseURL}/v1/accounts:lookup?key=${AUTH_KEY}`,{
            idToken: data.token
        }).catch(err => console.log(err.response))
          .then(res => {
              if(res.data.users){
                const user_id = res.data.users[0].localId;
                db.doc(user_id).update({
                    enderecos: data.remainAddress
                }).catch(err => console.log(err.response))
                  .then(dispatch(getUser(data.token)));
            }
          })       
    }
};

export const loadingUser = () => {
    return {
        type: LOADING_USER,
    }
}

export const isLoaded = () =>{
    return {
        type: IS_LOADED
    }
}

export const logoutUser = () =>{
    return {
        type: LOGOUT_USER
    }
};

export const expiredLogin = () =>{
    return {
        type: EXPIRED_LOGIN
    }
};