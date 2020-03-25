import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfigs';

/* import axios from 'axios';
axios.defaults.baseURL = 'https://geek-center-cc6a3.firebaseio.com/';
 */
const store = storeConfig();
const Redux = () =>(
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
