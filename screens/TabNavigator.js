import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Testler from './Testler';
import Bos from './Bos';


const Tab = createBottomTabNavigator();

class TabNavigator extends Component {
    render() {
        return (
            
            <Tab.Navigator
            tabBarOptions={{
                
				activeTintColor: "#50d3a7",
                inactiveTintColor: "gray",
                
                
				labelStyle: {
                    textAlign:'center',
                    paddingBottom:10,    
					fontSize: 16,
                },
                style:{
                    
                    height:40,
                    justifyContent:'center',
                    alignItems:'center',
                }
			}}
            >
        
                <Tab.Screen name="Testler" component={Testler}   />
                <Tab.Screen name="Bos sayfa" component={Bos} />
            </Tab.Navigator>

        );
    }
}
export default TabNavigator;
