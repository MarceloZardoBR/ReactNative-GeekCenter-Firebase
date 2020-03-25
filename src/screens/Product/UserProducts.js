import React, {useEffect, useState, useCallback} from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ModalComponent from '../../components/ModalDeleteProduct';

import {useSelector, useDispatch} from 'react-redux';
import UserProductsList from '../../components/UserProductsList';
import { getUserProducts } from '../../store/actions/product';

const UserProducts = ({ navigation }) => {

  const user_id = useSelector(state => state.user.id);
  const user_products = useSelector(state => state.product.products);
  const is_removing_product = useSelector(state => state.product.removing_product);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    reloadingUserProduct();
  }, [reloadingUserProduct]);

  useEffect(() => {
    dispatch(getUserProducts(user_id));
  }, [user_id]);

  useEffect(() => {
    if(is_removing_product === false){
      setDisplayModal(false);
      dispatch(getUserProducts(user_id));
      navigation.navigate('Profile');
    }
  },[is_removing_product]);

  const reloadingUserProduct = useCallback(() => {
    setProducts(user_products);
  }, [user_products]);

  const onHadleModal = productId => {
    setSelectedProduct(productId);
    setDisplayModal(true);
  };

  const onHadleCloseModal = () => {
    setDisplayModal(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onHadleModal(item.id)}>
      <UserProductsList
        pictures={item.pictures}
        titulo={item.titulo}
        descricao={item.descricao}
        preco={item.preco}
        status={item.status}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(products) && products.length == null ? (
        <View style={styles.emptyProducList}>
          <Text style={styles.emptyProducText}>
            Você não está anunciando nenhum produto
          </Text>
        </View>
      ) : (
        <View>
          <ModalComponent
            isVisible={displayModal}
            onCancel={onHadleCloseModal}
            productId={selectedProduct}
            userId={user_id}
          />
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyProducList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyProducText: {
    fontSize: 20,
    color: '#AAA',
  },
});

export default UserProducts;
