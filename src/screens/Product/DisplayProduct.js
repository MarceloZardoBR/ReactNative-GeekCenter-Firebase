import React, {useEffect, useState} from 'react';

import {View, StyleSheet, ScrollView} from 'react-native';
import ViewProduct from '../../components/ViewProduct';
import SalerDescription from '../../components/SalerDescription';
import {getUserById} from '../../services/FetchUserById';

export default function DisplayProduct({navigation}) {
  const product = navigation.getParam('product');
  const [user, setUser] = useState('');

  useEffect(() => {
    getUserById(product.user_id).then(res => {
      setUser(res);
    });
  }, [product.user_id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ViewProduct product={product} />
        <SalerDescription user={user} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
