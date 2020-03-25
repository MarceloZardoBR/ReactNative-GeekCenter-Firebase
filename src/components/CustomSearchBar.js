import React, { useState } from 'react';

import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    StyleSheet,
} from 'react-native';

const CustomSearchBar = ({ props }) => {

    const [searchValue, setSearchValue] = useState('');

    const startSearch = () =>{
        console.log(searchValue);
    }

    return (
        <SearchBar containerStyle={styles.searchContainer}
            inputStyle={{ backgroundColor: '#673AB7' }}
            placeholder='Pesquisar'
            searchIcon={<Icon name="search" size={20} color='#FFF' backgroundColor={'#673AB7'} />}
            value={searchValue} onChangeText={value => setSearchValue(value)}
            onSubmitEditing={startSearch}>
        </SearchBar>
    )
};

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#673AB7',
        borderRadius: 6,
        width: '90%'
    }
});

export default CustomSearchBar;