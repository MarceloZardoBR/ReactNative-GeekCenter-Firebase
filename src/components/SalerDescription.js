import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SalerDescription = props => {
  return (
    <View style={styles.container}>
      <View style={styles.saleName}>
        <Text style={styles.textNameHeader}>Nome do Vendedor</Text>
        <Text style={styles.textName}>{`${props.user.name} ${
          props.user.lastname
        }`}</Text>
      </View>
      <View style={styles.saleLocalization}>
        <Icon name="map-pin" color="#000" size={20} />
        <Text style={styles.localizationName}>São Paulo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  saleName: {
    height: 70,
    width: '90%',
  },
  textNameHeader: {
    fontFamily: 'roboto-regular',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textName: {
    fontFamily: 'roboto-regular',
    marginTop: 10,
    fontSize: 15,
    color: '#424242',
  },
  saleLocalization: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 70,
    marginTop: 13,
  },
  localizationName: {
    marginLeft: 20,
    fontFamily: 'roboto-regular',
    fontSize: 20,
    color: '#424242',
  },
});

export default SalerDescription;
