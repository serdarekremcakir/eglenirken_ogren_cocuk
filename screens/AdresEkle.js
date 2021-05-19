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
    adres:"---",
  }

  componentDidMount(){
    let uid = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(uid)
      .get()
    .then(querySnapshot => {

      this.setState({
        ad:querySnapshot.data().ad,
        email:querySnapshot.data().email,
        adres:querySnapshot.data().adres,
        
      })
    });


  }


  AdresEkle = (adres) => {


    let uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('Users').doc(uid)
       .update({
         adres: adres,
        })
        alert("Adres Başarıyla Eklendi.");
        this.props.navigation.navigate('Market');
    };





  render(){
    
    return (
      <View style={styles.container}>
        <View style = {{flex:1, alignItems:'center', justifyContent:'center',width:'100%'}}>
        <Image
          style={styles.image}
          source={{uri: 'https://i.hizliresim.com/bsFlwV.png'}}
        />

        <View style = {{flex:0.5, alignItems:'center', justifyContent:'center',width:'100%'}}>
          <Text style={styles.logo}>{this.state.ad}</Text>

          <Text style={styles.logo2}>{this.state.email}</Text>  

        </View>
        
        </View>
          
        <View style = {{flex:1, alignItems:'center', justifyContent:'center',width:'100%'}}>

        <View style={styles.textAreaContainer} >
           <TextInput
          // value={this.state.adres}
           placeholder="Adres giriniz..."
           placeholderTextColor="black"
           numberOfLines={6}
           multiline={true}
           onChangeText={text => this.setState({adres:text})}
           />
     
        </View>
        <View style = {{flex:0.3,justifyContent:'center',alignItems:'center',width:'100%'}}>
        <GirisKaydolBtn onPress={() => this.AdresEkle(this.state.adres)} text="Adres Ekle/Güncelle"/>
        </View>

        </View>

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

  textAreaContainer: {
    flex:0.3,
    width:'70%',
    borderColor: 'black',
    borderWidth: 1,
  },


  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:30,
    color:"#4d0000",
    //marginBottom:70,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  logo2:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:25,
    color:"#4d0000",
   // marginBottom:50,
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
    width: '70%',
    height: '10%',
    resizeMode: 'contain',
   }

});