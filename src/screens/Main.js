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
import CustomSearch from '../components/CustomSearchBar';
import CategoryButtons from '../components/CategoryButtons';

export default function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearch />
      </View>
      <View style={styles.categoryContainer}>
        <CategoryButtons navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  searchBarContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#673AB7',
  },
  categoryContainer: {
    height: 120,
  },
});
