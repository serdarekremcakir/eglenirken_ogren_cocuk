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

class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => navigation.navigate('Test')} title="G11o to 222Test"/>
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
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Test" component={Test} />
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