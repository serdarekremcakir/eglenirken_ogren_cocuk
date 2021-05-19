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

import Market from './screens/Market';
import Siparis from './screens/Siparis';
import UrunEkle from './screens/UrunEkle';
import AdresEkle from './screens/AdresEkle';

import Siparisler from './screens/Siparisler';
import EsleKazan from './screens/EsleKazan';
import Urunler from './screens/Urunler';


//stack navigation 
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="silsonra">
      <Stack.Screen name="silsonra" component={Giris} options={{headerShown: false}}/>
      <Stack.Screen name="Lidertablosu" component={Lidertablosu} options={{headerShown: false}}/>
      <Stack.Screen name="Giris" component={Giris} options={{headerShown: false}}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="Profil" component={Profil} options={{headerShown: false}}/>
      <Stack.Screen options={{headerShown: false}} name="Kaydol" component={Kaydol} />

      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="EsleKazan" component={EsleKazan} />
      <Stack.Screen name="Siparis" component={Siparis} options={{headerShown: true}}/>
      <Stack.Screen name="Siparisler" component={Siparisler} options={{headerShown: true}}/>
      <Stack.Screen name="Urunler" component={Urunler} options={{headerShown: true}}/>
      <Stack.Screen name="UrunEkle" component={UrunEkle} options={{headerShown: true}}/>
      <Stack.Screen name="Market" component={Market} options={{headerShown: true}}/>
      <Stack.Screen name="AdresEkle" component={AdresEkle} options={{headerShown: true}}/>
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