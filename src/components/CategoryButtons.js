import React from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import commonStyles from '../CommonStyles';
import { buttons } from '../commons/ButtonsCategory';
import { getProductsCategory } from '../store/actions/product';

import { useDispatch } from 'react-redux';

const CategoryButtons = (props) => {

    const dispatch = useDispatch();

    const onHandleCategory = (category_id) =>{
        props.navigation.navigate('ListProduct', { category_id });
    }

    return (
        <ScrollView horizontal={true}>
            {buttons.map(button => (
                <View key={button.id} style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onHandleCategory(button.id)} style={styles.defaultCategoryButton}>
                        <View style={styles.buttonImage}>
                            <Image source={button.image}
                                style={styles.imageStyle} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.categoryLabel}>{button.label}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    defaultCategoryButton: {
        width: 70,
        height: 70,
        margin: 10,
        borderRadius: 140,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        ...commonStyles.shadowStyle
    },
    buttonImage: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 10,
    },
    categoryLabel: {
        fontSize: 13,
        textAlign: 'justify',
        fontFamily: 'roboto-regular'
    },
    buttonContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CategoryButtons;