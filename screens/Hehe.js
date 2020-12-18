import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Test from './Test'
import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';

class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => navigation.navigate('Test', {sorular:Hayvanlar})} title="Hayvanlarrr"/>
                <Button onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"/>
                <Button onPress={() => navigation.toggleDrawer()} title="Acc"/>
            </View>



        );
        
    }
}


/*function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
*/
const Drawer = createDrawerNavigator();

export default function Hehe() {
  return (
    
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Hayvanlar" component={HomeScreen} />
      </Drawer.Navigator>
    
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});