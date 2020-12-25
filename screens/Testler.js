import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    ImageBackground
} from "react-native";
import { createDrawerNavigator} from '@react-navigation/drawer';

import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';
import Card from '../components/Card';
import Animals from '../data/Animals';
import Colors from '../data/Colors';
class HomeScreen extends Component {
  eklenecek(){
    alert("Test daha sonra eklenecek")
  }
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style = {{padding:20}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
          <View style={styles.Cardlar}>
            <Card
            link="https://i.hizliresim.com/XdF4vJ.jpg"
            onPress={() => navigation.navigate('Test', {sorular:Hayvanlar})}
            text="Hayvanlar"/>
            <Card
            link="https://i.hizliresim.com/Ektc07.jpg"
            onPress={() => navigation.navigate('Test', {sorular:Renkler})}
            text="Renkler"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()} 
            text="Yakında"/>
          </View>
          <View style ={{paddingBottom:30}}></View>
       </ScrollView> 
      );
  }
}


class HomeScreen2 extends Component {
  eklenecek(){
    alert("Test will be added later")
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style = {{padding:20}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Languages"/>
          <View style={styles.Cardlar}>
            <Card
            link="https://i.hizliresim.com/XdF4vJ.jpg"
            onPress={() => navigation.navigate('Test', {sorular:Animals})}
            text="Animals"/>
            <Card
            link="https://i.hizliresim.com/Ektc07.jpg"
            onPress={() => navigation.navigate('Test', {sorular:Colors})}
            text="Colors"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>this.eklenecek()}
            text="Soon"/>
          </View>
          <View style ={{paddingBottom:30}}></View>
       </ScrollView> 
    );
    
  }
}

class Eklenecek extends Component {
  render() {
    const { navigation } = this.props;
    return (
      
        <ImageBackground
          style={{flex:1}}
          blurRadius={0}
          source={{uri: 'https://i.pinimg.com/originals/f2/1e/f1/f21ef1b22dafc3e553302ab920f84d20.jpg'}}
        >
          <View style={styles.container}>
        <Text style={{color:'black', fontSize:50, textAlign:'center',fontWeight:'bold'}}>Çok Yakında</Text>
        <Text style={{color:'black', fontSize:25, textAlign:'center', paddingBottom:10}}>Şimdilik Diğer Dillerdeki Testlere Göz Atabilirsiniz</Text>
        <View style={{flex:1,paddingTop:20, justifyContent:'flex-start', width:"80%"}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
        </View>
        </View>
        </ImageBackground>
     
    );
  }
}



const Drawer = createDrawerNavigator();

export default function Testler() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Türkçe" component={HomeScreen} />
        <Drawer.Screen name="İngilizce" component={HomeScreen2} />
        <Drawer.Screen name="Almanca" component={Eklenecek} />
        <Drawer.Screen name="İspanyolca" component={Eklenecek} />
        <Drawer.Screen name="İtalyanca" component={Eklenecek} />
        
      </Drawer.Navigator>
    
  );
}


const styles = StyleSheet.create({

    Cardlar:{
      flex:1,
      justifyContent:'space-around',
      flexDirection:'row',
      marginTop:30
    },
    container: {
      paddingTop:50,
      flex: 1,
      justifyContent:'flex-start',
      alignItems:'center',
    }
});