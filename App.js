import React from 'react';
import Giris from './screens/Giris';
import Kaydol from './screens/Kaydol';
import Test from './screens/Test';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



//stack navigation 
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Giris" component={Giris} />
      <Stack.Screen options={{headerShown: false}} name="Kaydol" component={Kaydol} />
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