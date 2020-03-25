import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Picker,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import CheckBox from '@react-native-community/checkbox';
import ImageArray from '../../components/ProductPhotoArray';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'uuid-v4';

import {useSelector, useDispatch} from 'react-redux';
import {newProduct} from '../../store/actions/product';
import {setMessage} from '../../store/actions/message';
import commonStyles from '../../CommonStyles';
import AsyncStorage from '@react-native-community/async-storage';
import {categorias} from '../../commons/CategoriaValues';

const NewProduct = props => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('R$0,00');
  const [categoria, setCategoria] = useState('');
  const [troca, setTroca] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const userId = useSelector(state => state.user.id);
  const creatingProduct = useSelector(state => state.product.creating_product);
  const dispatch = useDispatch();

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      includeBase64: true,
      maxFiles: 4,
      minFiles: 1,
    }).then(res => {
      if (res.length <= 4) {
        const source = [];
        res.map(data => {
          source.push({uri: data.path, base64: data.data});
        });
        setPictures(source);
      } else {
        Alert.alert('Aviso', 'Não pode ser mais que 4 imagens', [
          {text: 'OK', onPress: () => setPictures([])},
        ]);
      }
    });
  };

  useEffect(() => {
    if (pictures.length == 4) {
      setDisableButton(true);
    }
  }, [pictures]);

  const onHandleSubmit = async () => {
    const user_token = await AsyncStorage.getItem('user_token');
    const product = {
      user_id: userId,
      id: uuid(),
      titulo,
      descricao,
      preco,
      categoria,
      troca,
      pictures,
    };

    if (product.pictures[0] == undefined || product.pictures[0].uri == null) {
      dispatch(
        setMessage({
          title: 'Atenção',
          message: 'É necessário ao menos colocar 1 foto do produto',
        }),
      );
    }
    if (
      product.titulo == '' ||
      !product.titulo.toString().trim() ||
      product.categoria == null
    ) {
      dispatch(
        setMessage({
          title: 'Atenção',
          message: 'É necessário ter um titulo e categoria',
        }),
      );
    } else {
      dispatch(newProduct(product, user_token));
    }
  };

  useEffect(() => {
    if (creatingProduct) {
      Alert.alert('Sucesso', 'Produto Cadastrado!!', [
        {text: 'Ok', onPress: () => props.navigation.navigate('Profile')},
        ,
      ]);
    }
  }, [creatingProduct, props.navigation]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.setImageContainer}>
          <ImageArray image={pictures} disable={disableButton} />
          {pictures.length == 0 ? (
            <Text>Escolha até 4 imagens para o anúncio</Text>
          ) : null}
          <View style={styles.imageBtnContainer}>
            <TouchableOpacity
              onPress={pickImage}
              style={[!disableButton ? styles.setImage : styles.disableButton]}
              disabled={disableButton}>
              <Text style={styles.buttonText}>Escolher Imagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={commonStyles.inputBox}>
          <TextInput
            style={commonStyles.inputStyle}
            value={titulo}
            onChangeText={titulo => setTitulo(titulo)}
            placeholder="Titulo"
          />
        </View>
        <View style={commonStyles.inputBox}>
          <TextInput
            style={styles.describeInputStyle}
            placeholder="Descrição"
            value={descricao}
            onChangeText={desc => setDescricao(desc)}
            multiline={true}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={troca} onValueChange={troca => setTroca(troca)} />
          <Text style={styles.checkboxText}>Somente Troca?</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.categoryLabel}>Categoria:</Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={categoria}
            onValueChange={(itemValue, itemIndex) => {
              setCategoria(itemValue);
            }}>
            {categorias.map(categoria => (
              <Picker.Item
                label={categoria.nome}
                value={categoria.id}
                key={categoria.id}
              />
            ))}
          </Picker>
        </View>
        <View style={commonStyles.inputBox}>
          <TextInputMask
            value={preco}
            onChangeText={preco => setPreco(preco)}
            type={'money'}
            placeholder="Valor"
            style={commonStyles.inputStyle}
            options={{
              precision: 2,
              eparator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onHandleSubmit}
            style={styles.submitbtnStyle}>
            <Text style={styles.buttonText}>Anúnciar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  describeInputStyle: {
    ...commonStyles.inputStyle,
    textAlignVertical: 'top',
    minHeight: 50,
    height: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
  checkboxText: {
    fontSize: 15,
  },
  setImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  imageBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  setImage: {
    height: 40,
    width: 200,
    backgroundColor: '#673AB7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  disableButton: {
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: '#bf9cff',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'roboto-regular',
  },
  pickerStyle: {
    height: 50,
    width: 230,
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  categoryLabel: {
    fontSize: 15,
    color: '#000',
    marginRight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  submitbtnStyle: {
    ...commonStyles.buttonStyle,
    width: 150,
    height: 40,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default NewProduct;
