import React, { useState, useEffect } from 'react';

import {
    Image,
    View,
    StyleSheet,
    Platform,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native';

import { SliderBox } from "react-native-image-slider-box";

const ProductPhotoArray = props => {

    const width = Dimensions.get('window').width * 0.9;
    
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(props.image);
    },[props.image]);

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <SliderBox resizeMethod={'resize'} 
                           images={images} 
                           parentWidth={width} 
                           ImageComponentStyle={{ height: 300, width: width}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer:{
        width: Dimensions.get('window').width,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ProductPhotoArray;