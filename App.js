import React from 'react';
import Giris from './screens/Giris';
import Kaydol from './screens/Kaydol';
import Test from './screens/Test';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from'./screens/TabNavigator';

import Profil from './screens/Profil';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(["Setting a timer"]);
YellowBox.ignoreWarnings(["YellowBox"]);

import Lidertablosu from './screens/Lidertablosu';




//stack navigation 
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Giris">
       <Stack.Screen name="Lidertablosu" component={Lidertablosu} options={{headerShown: false}}/>
      <Stack.Screen name="Giris" component={Giris} options={{headerShown: false}}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="Profil" component={Profil} options={{headerShown: false}}/>
      <Stack.Screen options={{headerShown: false}} name="Kaydol" component={Kaydol} />

      <Stack.Screen name="Test" component={Test} />
      
     
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}