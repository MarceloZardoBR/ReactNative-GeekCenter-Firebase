import React, { useState,useEffect, useCallback } from 'react';

import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import UserProfile from '../components/UserProfile';
import commonStyles from '../CommonStyles';
import { logoutUser } from '../store/actions/user';
import { getUserProducts } from '../store/actions/product';

const Profile = ({ navigation }) =>{

    const loggedUser = useSelector(state => state.user);

    const [user, setUser] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(loggedUser !== null){
            setUser(loggedUser);
            AsyncStorage.setItem('user_token',loggedUser.firebase_token);
        }
    },[loggedUser]);

    const onHandleLogout = async () =>{
        AsyncStorage.removeItem('user_token');
        dispatch(logoutUser());
        navigation.navigate('Login');
    };

    const onHandleUserInfo = () =>{
        navigation.navigate('UserInfo');
    };

    const onHandleUserProducts = () =>{
        navigation.navigate('UserProducts');
    };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.scrollContainer}>
                    <View style={styles.userContainer}>
                        <UserProfile name={loggedUser.name} lastname={loggedUser.lastname} email={loggedUser.email}/>
                    </View>
                    <View style={styles.profileButtonsContainer}>
                        <TouchableOpacity onPress={onHandleUserInfo} style={styles.profileButtons}>
                            <Text style={styles.buttonText}>Dados da Conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onHandleUserProducts} style={styles.profileButtons}>
                            <Text style={styles.buttonText}>Meus Produtos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('NewProduct')} style={styles.mainProfileButtons}>
                            <Text style={styles.mainButtonText}>Anúnciar Produto</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onHandleLogout} style={styles.buttonStyle}>
                            <Text style={styles.mainButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    scrollContainer:{
        justifyContent: 'center',
    },
    buttonContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin: 30
    },
    buttonStyle:{
        ...commonStyles.buttonStyle,
        width: 30,
        height: 40
    },
    buttonText:{
        color: "#202021",
        margin: 0,
        fontSize: 16,
        fontFamily: "roboto-regular"
    },
    mainButtonText:{
        color: "#FFF",
        margin: 0,
        fontSize: 16,
        fontFamily: "roboto-regular"
    },
    userContainer:{
        margin: 10,
    },
    profileButtonsContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width
    },
    profileButtons:{
        ...commonStyles.buttonStyle,
        height: 45,
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 15,
        backgroundColor: '#c7b8ff'
    },
    mainProfileButtons:{
        ...commonStyles.buttonStyle,
        height: 45,
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 15,
    }
});

export default Profile