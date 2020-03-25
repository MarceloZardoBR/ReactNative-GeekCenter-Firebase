import React from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import AddressList from '../components/AddressList';

const UserInfo = (props) => {

    const user = useSelector(state => state.user);

    const address = user.enderecos;

    const onHandleEditAddress = () =>{
        props.navigation.navigate('ConfigAddress');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.infoUserContainer}>
                <Text style={styles.styleText}>Nome: {user.name}</Text>
                <Text style={styles.styleText}>Sobrenome: {user.lastname}</Text>
                <Text style={styles.styleText}>Email: {user.email}</Text>
            </View>
            <View>
                <AddressList address={address} />
                <TouchableOpacity onPress={onHandleEditAddress} style={styles.editAddress}>
                    <Text style={styles.styleText}>Editar Endereços</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    infoUserContainer:{
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#e9e6ed',
        width: Dimensions.get('window').width,
        height: 110,
        marginBottom: 10,
    },
    styleText:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        alignItems: 'center',
        marginLeft: 10,
    },
    editAddress:{
        marginTop: 5,
        alignItems: 'center',
        marginBottom: 10,
        height: 30,
    },
    returnButtonContainer:{
        alignItems: 'center',
    },
    returnButtonStyle:{
        borderWidth: 0,
        borderRadius: 7,
        width: Dimensions.get('window').width * 0.9,
        height: 50,
        backgroundColor: '#bf9cff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textButton:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default UserInfo;