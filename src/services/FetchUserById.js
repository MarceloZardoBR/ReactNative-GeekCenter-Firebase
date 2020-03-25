import firestore from '@react-native-firebase/firestore';

const db = firestore().collection('users');

export const getUserById = async (user_id) =>{

    let user = ''; 

    await db.doc(user_id).get()
        .then(res => {
            if(!res.exists){
                console.log('Error, User Dosent Exists');
            }

            user = res.data();
        }).catch(err => console.log(err));

    return user;
}