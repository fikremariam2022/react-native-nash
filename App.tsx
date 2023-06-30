/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login_, {Home} from './components/screens/Login';
('./components/screens/Login');
import ScreenB from './components/screens/screenB';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {Store} from './redux/store';

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login_}
            options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 40,
  },
});
