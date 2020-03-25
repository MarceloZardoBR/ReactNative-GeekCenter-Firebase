import React from 'react';

import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const AddressList = props => {
  
    const addressData = props.address;

  if(addressData){
    return(
        <View style={styles.addressContainer}>
           <Text style={styles.addressHeader}>Endereços</Text>
           <FlatList data={addressData} renderItem={({ item }) => 
               <Item rua={item.rua} numero={item.numero} bairro={item.bairro} cidade={item.cidade} estado={item.estado} />}
               keyExtractor={item => item.numero} />
        </View>
     )
  }
    return(
        <View style={styles.addressContainer}>
            <Text style={styles.addressHeader}>Endereços</Text>
            <Text style={styles.nullAddress}>Nenhum Endereco Cadastrado</Text>
        </View>
    )
}

const Item = props =>{
    return(
        <View style={styles.addressItem}>
            <Text style={styles.addressStyleStreet}>{props.rua}</Text>
            <Text style={styles.addressStyle}>{props.numero}</Text>
            <Text style={styles.addressStyle}>{props.bairro}</Text>
            <Text style={styles.addressStyle}>{props.cidade}</Text>
            <Text style={styles.addressStyle}>{props.estado}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    addressContainer:{
        width: Dimensions.get('window').width,
        alignItems:'stretch',
        justifyContent: 'center',
        backgroundColor: '#e9e6ed',
    },
    addressItem:{
        alignItems:'stretch',
        justifyContent: 'center',
        marginBottom: 10
    },
    addressStyleStreet:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        marginLeft: 10,
    },
    addressStyle:{
        fontSize: 15,
        fontFamily: 'roboto-regular',
        marginLeft: 10
    },
    addressHeader:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        marginBottom: 5,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    nullAddress:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        marginLeft: 10,
    }
});

export default AddressList;