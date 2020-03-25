import firestore from '@react-native-firebase/firestore';

const dbProduct = firestore().collection('products');

export const deleteProduct = async (product_id) => {
  let response = false
  
  await dbProduct
    .doc(product_id).delete()
      .then(() => {
        response = true;
      })
      .catch(err => {
        console.log(err);
      });

    return response
};
