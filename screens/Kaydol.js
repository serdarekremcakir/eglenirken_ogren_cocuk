import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import GirisKaydolBtn from '../components/GirisKaydolBtn';
import firebase from '../Firebase';
export default class Kaydol extends React.Component { //App
  
  constructor(){
    super();
  }
  
  state={
    ad:"",
    email:"",
    sifre:""
  }

  Kaydol = (email, sifre) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, sifre)
        .then(data => {()=>alert("kayit basarili"),
         firebase.firestore().collection("Users").doc(data.user.uid).set(
    {
      ad: this.state.ad,
      email: this.state.email,
      maxskor: 0,
      hayvansayi: 0,
      renksayi: 0,
      animalsayi: 0,
      colorsayi: 0,
      esleskor: 0,
      elmas:0,
      adres:"Adres bilgisi yok.",
      profilfoto: 'https://incomarinspection.com/wp-content/uploads/2017/04/Unknown-Profile.png',
      id:firebase.auth().currentUser.uid
    }).then((ref) => {  });
    this.props.navigation.navigate('TabNavigator')
      }).catch(error=>{ alert("Şifre en az 6 haneli olmalı ve e-posta mail formatında olmalıdır.")});
      } catch (error) {
            //console.log(error.toString(error));      
        }
      };

  render(){
    
    return (
      <View style={styles.container}>
          
          <Image
          style={styles.image}
          source={{uri: 'https://i.hizliresim.com/bsFlwV.png'}}
        />
        
        <Text style={styles.logo}>Eğlenirken Öğren</Text>
        <Text style={styles.logo2}>Çocuk</Text>    
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Isim Giriniz" 
            placeholderTextColor="black"
            onChangeText={text => this.setState({ad:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email Giriniz" 
            placeholderTextColor="black"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Sifre Giriniz" 
            placeholderTextColor="black"
            onChangeText={text => this.setState({sifre:text})}/>
        </View>


        <View style = {{marginTop:40}}></View>
        <GirisKaydolBtn onPress={() => this.Kaydol(this.state.email, this.state.sifre)} text="Kayıt Ol"/>
        <View style = {{marginTop:80}}></View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6FABB6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:40,
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
    marginBottom:50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  inputView:{
    width:"80%",
    backgroundColor:"#94b8b8",
    borderRadius:25,
    height:50,
    marginBottom:10,
    justifyContent:"center",
    paddingLeft:20,
    paddingRight:20,
  },
  inputText:{
    height:50,
    color:"white"
  },
  image: {
    flex: 1,
    width: 220,
    height: 20,
    resizeMode: 'contain' }

});