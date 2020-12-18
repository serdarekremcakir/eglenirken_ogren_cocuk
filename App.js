import React from 'react';
import Giris from './screens/Giris';
import Kaydol from './screens/Kaydol';
import Test from './screens/Test';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import { View, Text, Image, Button } from 'react-native';
import Hehe from'./screens/Hehe';



function LogoTitle() {
  return (
    <Image
              style={{width:50,height:50}}
              source={{uri:"https://i.hizliresim.com/X4gQee.jpg"}}/>
  );
}




//stack navigation 
const Stack = createStackNavigator();
function MyStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hehe" component={Hehe} /*options={{ headerLeft: () => (
              <Button
                onPress={() => navigation.openDrawer()}
                title="Info"/>
            ), }}*/ />
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