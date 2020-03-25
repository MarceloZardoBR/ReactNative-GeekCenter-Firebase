import firestore from '@react-native-firebase/firestore';

const db = firestore().collection('products');

export const getProducts = async (category_id) =>{

    const products = [];

    await db.where('categoria','==', category_id).get()
        .then(snapshot => {
           if(snapshot.empty){
               console.log('NaN Products with this category')
           }

           snapshot.forEach(doc => {   
            products.push({
                id: doc.id,
                ...doc.data()
            });
           })
        }).catch(err => console.log(err));


    return products;
}