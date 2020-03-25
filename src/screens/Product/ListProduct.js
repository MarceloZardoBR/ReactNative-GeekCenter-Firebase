import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback as TWD
} from 'react-native';
import { getProducts } from '../../services/FetchProductsByCategory';
import commonStyles from '../../CommonStyles';

const ListProduct = ({ navigation }) => {

    const category_id = navigation.getParam('category_id');
    const [products, setProducts] = useState([]);

    const fetchProductsByCategory = useCallback(() => {
        getProducts(category_id).then(docs => {
            setProducts(docs);
        });
    });

    useEffect(() => {
        fetchProductsByCategory(category_id)
    }, [])

    const onSelectedProduct = product =>{
        navigation.navigate('DisplayProduct', { product });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {products.map(product => (
                    <TWD key={product.id} onPress={() => onSelectedProduct(product)}>
                        <View style={styles.previewStyle}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: product.pictures[0] }} style={styles.imageStyle} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.productName}>{product.titulo}</Text>
                                <Text style={styles.productPrice}>{product.preco} </Text>
                            </View>
                        </View>
                    </TWD>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    previewStyle: {
        ...commonStyles.shadowStyle,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.4,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 0.5,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: '95%',
        height: '95%',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,

    },
    productPrice: {
        fontSize: 15,
        marginLeft: 20,
        marginTop: 10,
    }
})

export default ListProduct;