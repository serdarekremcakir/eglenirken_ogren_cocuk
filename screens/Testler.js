import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';
import Card from '../components/Card';
import firebase from '../Firebase';

class HomeScreen extends Component {

    render() {

        const { navigation } = this.props;
        return (

          <ScrollView style = {{padding:20}}>
            <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
              <View style={styles.Cardlar}>
                <Card
                link="https://i.hizliresim.com/XdF4vJ.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Hayvanlar})} title="xxx"
                text="Hayvanlar"/>

                <Card
                link="https://i.hizliresim.com/Ektc07.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler"/>
              </View>
              <View style={styles.Cardlar}>
                <Card
                link='https://i.hizliresim.com/Pgbb0P.jpg'
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler3"/>
                <Card
                link="https://i.hizliresim.com/X4gQee.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler4"/>
              </View>
              <View style={styles.Cardlar}>
                <Card
                link="https://i.hizliresim.com/X4gQee.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler5"/>
                <Card
                link="https://i.hizliresim.com/X4gQee.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler6"/>
              </View>
              <View style={styles.Cardlar}>
                <Card
                link="https://i.hizliresim.com/X4gQee.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler5"/>
                <Card
                link="https://i.hizliresim.com/X4gQee.jpg"
                onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
                text="Renkler6"/>
              </View>
      
          
           </ScrollView> 


        );
        
    }
}


class HomeScreen2 extends Component {
  constructor(props) {
    super(props);
    


    this.state = {

      kullaniciAdi:"serdar",
    }
  }







  render() {
      const { navigation } = this.props;
      return (

        <ScrollView style = {{padding:20}}>
          <Text>Kullanıcı İsmi: {this.state.kullaniciAdi}</Text>
          <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
            <View style={styles.Cardlar}>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Hayvanlar})} title="xxx"
              text="Hayvanlar"/>

              <Card
              link="https://i.hizliresim.com/Ektc07.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler"/>
            </View>
            <View style={styles.Cardlar}>
              <Card
              link='https://i.hizliresim.com/Pgbb0P.jpg'
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler3"/>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler4"/>
            </View>
            <View style={styles.Cardlar}>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler5"/>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler6"/>
            </View>
            <View style={styles.Cardlar}>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler5"/>
              <Card
              link="https://i.hizliresim.com/X4gQee.jpg"
              onPress={() => navigation.navigate('Test', {sorular:Renkler})} title="Renkler"
              text="Renkler6"/>
            </View>
    
        
         </ScrollView> 


      );
      
  }
}

const Drawer = createDrawerNavigator();

export default function Testler() {
  return (
    
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Türkçe" component={HomeScreen} />
        <Drawer.Screen name="İngilizce" component={HomeScreen2} />
      </Drawer.Navigator>
    
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Cardlar:{
      flex:1,
      justifyContent:'space-around',
      flexDirection:'row',
      marginTop:30
    }

});