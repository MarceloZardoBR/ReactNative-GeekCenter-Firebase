import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { SliderBox } from "react-native-image-slider-box";

const ViewProduct = (props) =>{

    const width = Dimensions.get('screen').width;

    const product = props.product;

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <SliderBox resizeMethod={'resize'}
                           images={product.pictures}
                           parentWidth={width} 
                           ImageComponentStyle={{ height: 500, width: width }}/>
            </View>
            <View style={styles.productInfoContainer}>
                <Text style={styles.nameText}>{product.titulo}</Text>
                <Text style={styles.priceText}>{product.preco}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    imageContainer:{
        marginTop: 5,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.5,
    },
    productInfoContainer:{
        marginTop: 20,
        alignItems: 'flex-start',
        width: Dimensions.get('screen').width * 0.9,
        height: 100
    },
    nameText:{
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'roboto-regular',
        marginBottom: 20,
    },
    priceText:{
        fontSize: 18,
        color: '#757474',
        fontFamily: 'roboto-regular'
    }
})

export default ViewProduct;