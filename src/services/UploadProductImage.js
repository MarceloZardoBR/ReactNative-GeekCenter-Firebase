import { firebase } from '@react-native-firebase/storage';
import uuid from 'uuid-v4';

export const uploadImage = (image,productId) => {
    return new Promise((resolve, reject) => {
        const storageRef = firebase.storage().refFromURL('gs://geek-center-cc6a3.appspot.com/');
        const bucketName = storageRef.bucket;
        const id = uuid();

        storageRef.child(`productsImage/${productId}/${id}.jpg`)
            .putString(image, 'base64',{
                contentType: 'image/jpeg',
            })
            .catch(err => {
                reject(err);
            }).then(snapshot => {
                const fileName = encodeURIComponent(snapshot.metadata.fullPath);
                const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' + bucketName + '/o/' 
                    + fileName + '?alt=media&token=' + id
        
                resolve(imageUrl);
            })
    })
}