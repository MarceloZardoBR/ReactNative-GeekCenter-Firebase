import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Main from './screens/Main';
import Screens from './commons/ScreenRoutes';

const AuthRoutes = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Register',
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const loginOrProfileRouter = createSwitchNavigator(
  {
    Profile: Profile,
    Auth: AuthRoutes,
  },
  {
    initialRouteName: 'Auth',
  },
);

const MenuRoutes = {
  Home: {
    name: 'Home',
    screen: Main,
    navigationOptions: {
      title: 'Inicio',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
      ),
    },
  },
  Store: {
    name: 'Store',
    screen: Main,
    navigationOptions: {
      title: 'Loja',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="yen" size={30} color={tintColor} />
      ),
    },
  },
  Profile: {
    name: 'Profile',
    screen: loginOrProfileRouter,
    navigationOptions: {
      title: 'Perfil',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={20} color={tintColor} />
      ),
    },
  },
};

const MenuConfig = {
  initialRouteName: 'Home',
  tabBarOptions: {
    //showLabel: false,
    activeTintColor: '#673AB7',
    inactiveTintColor: '#bf9cff',
  },
};

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);

const MainNavigator = createStackNavigator({
  App: {
    screen: MenuNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  ...Screens
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
