import { firebase } from '@react-native-firebase/storage';

const refStorage = firebase.storage().refFromURL('gs://geek-center-cc6a3.appspot.com')

export const deleteProductImage = async (product_id) => {

    const allRefs = (await refStorage.child(`productsImage/${product_id}/`).list()).items;
    
    Promise.all(allRefs.map(urls => {
        const refPics = refStorage.child(`${urls.path}`);
        
        refPics.delete()
            .catch(err => {
                return err;
            })
    }))
}