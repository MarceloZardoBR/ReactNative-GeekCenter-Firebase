import React from 'react';

import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {deleteUserProduct} from '../store/actions/product';

const ModalComponent = props => {
  const user_id = props.userId;
  const product_id = props.productId;

  const dispatch = useDispatch();

  const removeProduct = () => {
    fetchDeleteProduct(product_id, user_id);
  };

  const onHandleEdit = () => {
    console.log(product_id);
  };

  const onHandleDelete = () => {
    Alert.alert('Atenção', 'Deseja realmente cancelar e remover o produto?', [
      {
        text: 'Confirmar',
        onPress: () => {
          removeProduct();
        },
      },
      {
        text: 'Cancelar',
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const fetchDeleteProduct = () => {
    dispatch(deleteUserProduct({product_id, user_id}));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.offset} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <TouchableOpacity onPress={onHandleEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHandleDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Cancelar Venda</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.offset} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  offset: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  editButton: {
    backgroundColor: '#f2f7f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#00a6ff',
    width: '40%',
    height: '20%',
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#f2f7f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff0000',
    width: '40%',
    height: '20%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});

export default ModalComponent;
