import React, { useState, useEffect } from 'react';

import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text,
    FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress } from '../store/actions/user';
import Icon from 'react-native-vector-icons/FontAwesome';

import Swipeable from 'react-native-swipeable';

const ConfigAddress = props => {

    const user = useSelector(state => state.user);
    const [enderecos, setEnderecos] = useState(); 
    const dispatch = useDispatch();

    useEffect(() =>{
       setEnderecos(user.enderecos);
    },[user.enderecos]);

    const handleReturn = () =>{
        props.navigation.navigate('UserInfo', {user});
    }

    const handleAddAddress = () =>{
        props.navigation.navigate('AddAddress');
    }

    const leftContent = (
        <View style={styles.leftContent}>
            <Icon name='trash' size={30} color={'#FFF'} />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    );

    const rightContent = [
        <TouchableOpacity style={styles.rightContent}>
            <Icon name='pencil' size={30} color={'#FFF'} style={{paddingLeft: 20}} />
            <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
    ]
    
    const onHandleDelete = id =>{
        const remainAddress = enderecos.filter(value => value.id !== id);

        const data = {
            token: user.firebase_token,
            remainAddress
        };
        dispatch(deleteAddress(data));
        setEnderecos(remainAddress);
    }

  return(
    <SafeAreaView style={styles.container}>
            <FlatList data={enderecos} keyExtractor={item => item.id}
                      renderItem={({item}) => 
                    <Swipeable leftActionActivationDistance={200} rightButtonWidth={130}
                               leftContent={leftContent} rightButtons={rightContent}
                               onLeftActionActivate={() => onHandleDelete(item.id)} >
                        <Item {...item} />
                    </Swipeable>
            }/>
        <ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddAddress} style={styles.NewAddressButton}>
                    <Text style={styles.buttonText}>Adicionar Novo Endereço</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReturn} style={styles.NewAddressButton}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const Item = props =>{
    return(
        <View style={styles.addressContainer}>
            <Text style={styles.styleText}>Rua: {props.rua}</Text>
            <Text style={styles.styleText}>Numero: {props.numero}</Text>
            <Text style={styles.styleText}>Bairro: {props.bairro}</Text>
            <Text style={styles.styleText}>Cidade: {props.cidade}</Text>
            <Text style={styles.styleText}>CEP: {props.cep}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
    },
    buttonContainer:{
        alignItems: 'center',
    }, 
    addressContainer:{
        backgroundColor: '#e9e6ed',
        width: Dimensions.get('window').width,
        alignItems: 'stretch',
        marginTop: 5,
        borderWidth: 0.8,
        borderRadius: 4,
    },
    styleText:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        alignItems: 'center',
        marginLeft: 10,
    },
    NewAddressButton:{
        borderWidth: 0,
        borderRadius: 7,
        width: Dimensions.get('window').width * 0.9,
        height: 50,
        backgroundColor: '#bf9cff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    leftContent:{
        flex: 1,
        marginTop: 5,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludeText:{
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    },
    rightContent:{
        flex: 1,
        marginTop: 5,
        backgroundColor: '#bf9cff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    editText:{
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export default ConfigAddress;
