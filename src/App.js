import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Navigator from './Navigator';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from './store/actions/message';

const App = () => {

  const alertTitle = useSelector(state => state.message.title);
  const alertText = useSelector(state => state.message.message);

  const dispatch = useDispatch();

  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');

  useEffect(() => {
     if(alertTitle && alertText.toString().trim()){
      /* setTitle(alertTitle);
      setText(alertText);
       */
      Alert.alert(alertTitle || 'Mensagem', alertText,[
        {text: 'OK', onPress:() => dispatch(setMessage({title: '', message: ''}))}
      ]);
     }
  },[alertTitle, alertText])

  return (
      <Navigator />
  );
};

export default App;
