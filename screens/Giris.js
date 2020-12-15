import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image} from 'react-native';
import GirisKaydolBtn from '../components/GirisKaydolBtn';


export default class Giris extends React.Component { //App
  constructor(){
    super();
  }
  state={
    email:"",
    password:""
  }
  
  
  render(){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <Image
          style={styles.image}
          source={{uri: 'https://i.hizliresim.com/bsFlwV.png'}}
        />
        <Text style={styles.logo}>Eğlenirken Öğren</Text>
        <Text style={styles.logo2}>Çocuk</Text>   

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email Giriniz..." 
            placeholderTextColor="black"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Sifrenizi Giriniz..." 
            placeholderTextColor="black" 
            onChangeText={text => this.setState({password:text})}/>
        </View>



        <View style={{marginTop:25}}></View>
        <GirisKaydolBtn  text="Giris" /> 
        <GirisKaydolBtn  text="Kaydol"/> 
        <View style={{marginTop:50}}></View>
      </View>
    );
  }
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:50,
    color:"#4d0000",
    //marginBottom:70,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  logo2:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:35,
    color:"#4d0000",
    marginBottom:70,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  inputView:{
    width:"80%",
    backgroundColor:"#94b8b8",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
  },
  image: {
    flex: 1,
    width: 220,
    height: 20,
    resizeMode: 'contain' }


});