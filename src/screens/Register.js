import React, { useState } from 'react';
import{
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/actions/user';
import CommonStyles from '../CommonStyles';

const Register = ({ navigation }) =>{

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onHandleCancel = () =>{
        navigation.navigate('Login');
    }

    const onHandleRegister = () =>{
        const user = {
            name,
            lastname,
            email,
            password
        }
        if(password.length < 6){
            Alert.alert('Atenção','A sua senha deve ter no mínimo 6 digitos',[
                {
                    text:'OK'
                }]);
        }else{
            dispatch(createUser(user));
            
            setName('');
            setLastname('');
            setEmail('');
            setPassword('');

            Alert.alert('Bem Vindo!','Conta Criada com Sucesso!',[
            {
                text:'OK',
                onPress: () => navigation.navigate('Login')
            }]);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Nome'
                            value={name} onChangeText={e => setName(e)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Sobrenome'
                            value={lastname} onChangeText={e => setLastname(e)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Email'
                            value={email} onChangeText={e => setEmail(e)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Senha' secureTextEntry={true}
                            value={password} onChangeText={e => setPassword(e)} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onHandleRegister} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleCancel} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonContainer:{
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    buttonStyle:{
        ...CommonStyles.buttonStyle,
        height: 40,
        width: 200,
        margin: 30
    },
    buttonText:{
        color: "#fff",
        margin: 0,
        fontSize: 16,
        fontFamily: "roboto-regular",
    }
})

export default Register;