import React, { useState } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import CommonStyles from '../CommonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, getUser } from '../store/actions/user';

export default function AddAddress(props) {

  const user_token = useSelector(state => state.user.firebase_token);
  const dispatch = useDispatch();

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState(''); 

  const onHandleSave = () =>{
      const endereco = {
         rua,
         bairro,
         cidade,
         estado,
         cep,
         numero
      }
      const data = {
          token: user_token,
          endereco
      }
      dispatch(addAddress(data));
      dispatch(getUser(user_token));

      Alert.alert('Sucesso', 'Endereço Cadastrado!',[
          {text: 'OK', onPress:() => props.navigation.navigate('EditAddress')}
      ]);

      setRua('');
      setCidade('');
      setBairro('');
      setNumero('');
      setCep('');
      setEstado('');
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.inputsContainer}>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Rua' value={rua} 
                           onChangeText={rua => setRua(rua)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Numero' value={numero} 
                           onChangeText={numero => setNumero(numero)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Bairro' value={bairro} 
                            onChangeText={bairro => setBairro(bairro)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Cidade' value={cidade} 
                            onChangeText={cidade => setCidade(cidade)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='Estado' value={estado} 
                            onChangeText={estado => setEstado(estado)} />
            </View>
            <View style={CommonStyles.inputBox}>
                <TextInput style={CommonStyles.inputStyle} placeholder='CEP' value={cep} 
                            onChangeText={cep => setCep(cep)} />
            </View>
            <TouchableOpacity onPress={onHandleSave} style={styles.SaveButton}>
                <Text style={styles.TextSaveButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    inputsContainer:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    SaveButton:{
        borderWidth: 0,
        borderRadius: 7,
        width: Dimensions.get('window').width * 0.5,
        height: 45,
        backgroundColor: '#673AB7',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50
    },
    CancelButton:{
        borderWidth: 0,
        borderRadius: 7,
        width: Dimensions.get('window').width * 0.5,
        height: 45,
        backgroundColor: '#673AB7',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    TextSaveButton:{
        fontSize: 20,
        color: '#FFF'
    },
});
