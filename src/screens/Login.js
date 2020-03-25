import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert
} from "react-native";
import CommonStyles from '../CommonStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, getUser, expiredLogin } from '../store/actions/user';

const Login = ({ navigation }) =>{

    const success = useSelector(state => state.user.successLogged);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onHandleRegister = () =>{
        navigation.navigate('Register');
    };

    const onHandleLogin = () =>{
        const user = {
            email,
            password
        };

        dispatch(authUser(user));
    };

    useEffect(() => {
        const signInOrSignUp = async () =>{
            const user_token = await AsyncStorage.getItem('user_token');
            if(user_token !== null){
                dispatch(getUser(user_token));
            }else{
                return
            }
        }
        signInOrSignUp();
    },[]);

    useEffect(() => {
        if(success == true){
            navigation.navigate('Profile');
        }else{
            return
        }
    },[success]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.inputsContainer}>
                 <View style={CommonStyles.inputBox}>
                    <TextInput style={CommonStyles.inputStyle} placeholder={'Email'}
                                value={email} onChangeText={email => setEmail(email)} />
                 </View>
                 <View style={CommonStyles.inputBox}>
                    <TextInput style={CommonStyles.inputStyle} placeholder={'Senha'} 
                               secureTextEntry={true} value={password} onChangeText={password => setPassword(password)} />
                 </View>
                 <TouchableOpacity onPress={onHandleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                 </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                <Text style={styles.loginText}>Ainda não possui conta?</Text>
                <TouchableOpacity onPress={onHandleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>Registre-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:2,
        justifyContent: 'center'
    },
    inputsContainer:{
        flex: 3,
        margin: 20,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonsContainer:{
        flex: 2,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',  
    },
    button:{
        ...CommonStyles.buttonStyle,
        height: 40,
        width: '50%',
        marginTop: 20
    },
    buttonText:{
        color: "#fff",
        margin: 0,
        fontSize: 16,
        fontFamily: "roboto-regular"
    },
    loginText:{
        color: '#000',
        margin: 0,
        fontSize: 16,
        fontFamily: "roboto-regular",
    }
})

export default Login;