import React from 'react';
import Giris from './screens/Giris';
import Kaydol from './screens/Kaydol';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


//stack navigation 
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
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