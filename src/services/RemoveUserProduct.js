import firestore from '@react-native-firebase/firestore';
import {deleteProductImage} from './DeleteProductImages';
import {deleteProduct} from './DeleteProduct';

const dbUsers = firestore().collection('users');

export const removeUserProduct = async (product_id, user_id) => {
  await dbUsers
    .doc(user_id)
    .get()
    .then(res => {
      let userProducts = res._data.products;

      userProducts = userProducts.filter(product => product.id !== product_id);

      dbUsers.doc(user_id).update({
        products: userProducts,
      });
    })
    .catch(err => console.log(err));

  await deleteProductImage(product_id).catch(err => {
    console.log(err);
  });

  await deleteProduct(product_id).then(resp => {
    if (resp) {
      console.log('Product Deleted');
    }
  });
};
