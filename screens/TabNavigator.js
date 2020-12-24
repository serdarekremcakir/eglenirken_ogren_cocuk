import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Testler from './Testler';
import Profil from './Profil';


const Tab = createBottomTabNavigator();

class TabNavigator extends Component {
    render() {
        return (
            
            <Tab.Navigator
            tabBarOptions={{
                
				activeTintColor: "#ffaa00",
                inactiveTintColor: "white",
                
                
				labelStyle: {

                    
                    textAlign:'center',
                    paddingBottom:10,    
					fontSize: 16,
                },
                style:{
                    //color:'black',
                    backgroundColor:'#4d0000',
                    height:40,
                    justifyContent:'center',
                    alignItems:'center',
                }
			}}
            >
        
                <Tab.Screen name="Testler" component={Testler}   />
                <Tab.Screen name="Profilim" component={Profil} />
            </Tab.Navigator>

        );
    }
}
export default TabNavigator;
