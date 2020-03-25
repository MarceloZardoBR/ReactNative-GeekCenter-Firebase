import {
  SET_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
  REQ_REMOVE_PRODUCT,
} from '../actions/ActionTypes';

import firestore from '@react-native-firebase/firestore';
import { uploadImage } from '../../services/UploadProductImage';
import { fetchProducts } from '../../services/FetchUserProducts';
import { removeUserProduct } from '../../services/RemoveUserProduct';
import { setUserProducts } from '../actions/user';
import { getUser } from './user';
import { setMessage } from './message';

const db = firestore().collection('products');

//promisse de upload do Array de Imagens
const uploadImageArray = async (images, productId) => {
  return Promise.all(images.map(image => uploadImage(image.base64, productId)));
};

export const newProduct = (product, token) => {
  return async dispatch => {
    dispatch(addingProduct());
    const imagesUrls = [];

    await uploadImageArray(product.pictures, product.id)
      .then(urls => imagesUrls.push(...urls))
      .catch(err => console.log(err));

    if (imagesUrls.length >= 1) {
      const newProduct = {
        ...product,
        pictures: imagesUrls,
        status: 'Aberto',
      };

      delete newProduct.id;

      await db
        .doc(product.id)
        .set({
          ...newProduct,
        })
        .catch(err => console.log(err))
        .then(console.log('Sucesso, Produto Cadastrado!!'));

      dispatch(setUserProducts(product.id, newProduct.user_id));
      dispatch(getUser(token));
      dispatch(productAdded());
    }else{
      dispatch(setMessage({title: 'Erro', message: 'Ocorreu um erro ao fazer upload da Imagem'}));
    }
  };
};

export const getUserProducts = (user_id) => {
  return async dispatch => {
    await fetchProducts(user_id).then(res => {
      dispatch(updateUserProducts(res));
      dispatch(reqRemoveProduct());
    });
  };
};

export const updateUserProducts = products => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const deleteUserProduct = dataDTO => {
  return async dispatch => {
    dispatch(reqRemoveProduct());
    await removeUserProduct(dataDTO.product_id, dataDTO.user_id);
    dispatch(getUserProducts(dataDTO.user_id));
    dispatch(productRemoved());
  };
};

export const addingProduct = () => {
  return {
    type: ADDING_PRODUCT,
  };
};

export const productAdded = () => {
  return {
    type: PRODUCT_ADDED,
  };
};

export const reqRemoveProduct = () =>{
  return {
    type: REQ_REMOVE_PRODUCT,
  };
};

export const productRemoved = () =>{
  return {
    type: PRODUCT_REMOVED
  };
};