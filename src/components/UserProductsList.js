import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import commonStyles from '../CommonStyles';

const UserProductsList = props =>{
    return(
        <View style={styles.prodContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.pictures[0] }} 
                        style={styles.imageStyle} />
            </View>
            <View style={styles.descProduct}>
                <Text style={styles.descriptionHeader}>{`${props.titulo.substring(0,24)}...`}</Text>
                <Text style={styles.descriptionText}>{`${props.descricao.substring(0,20)}...`}</Text>
                <Text style={styles.descriptionText}>Preço: {props.preco} </Text>
                <Text style={styles.descriptionText}>Status: {props.status} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    prodContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.9,
        height: 120,
        backgroundColor: '#eae8e8',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 5,
        ...commonStyles.shadowStyle
    },
    imageContainer:{
        height: 105,
        width: 105,
        margin: 10,
    },
    imageStyle:{
        width: '100%',
        height: '100%',
    },
    descProduct:{
        width: '70%',
        height: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    descriptionHeader:{
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'roboto-regular',
    },
    descriptionText:{
        fontSize: 15,
        fontFamily: 'roboto-regular'
    }
});

export default UserProductsList;