import firestore from '@react-native-firebase/firestore';
const db = firestore().collection('products');

export const fetchProducts = async (user_id) => {
    
        const products = [];
        
        await firestore().collection('users').doc(user_id).get()
            .then(res => {
                const rawData = res._data.products;
            
                for(let id in rawData){
                    db.doc(rawData[id].id).get()
                        .then(res => {
                            products.push({
                                ...res._data,
                                id: rawData[id].id
                            });
                        }).catch(err => console.log(err));
                }
            })
            

        return products;
};