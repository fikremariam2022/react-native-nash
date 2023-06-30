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
import ScreenA from '../../../components/screens/screenA';
import ScreenB from '../../../components/screens/screenB';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#694fad'}}
        screenOptions={({route}: any) => ({
          tabBarIcon: ({focused, size, color}: any) => {
            let iconName;
            if (route.name === 'Screen_A') {
              iconName = 'autoprefixer';
            } else {
              iconName = 'btc';
            }
            return (
              <FontAwesome5
                name={iconName}
                style={{fontSize: 30, color: color}}
              />
            );
          },
        })}>
        <Tab.Screen
          name="Screen_A"
          component={ScreenA}
          options={{
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Screen_B"
          component={ScreenB}
          options={{
            tabBarBadge: 2,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
