import React from 'react';
import { View, StyleSheet, StatusBar, Text, Image, Dimensions } from 'react-native';
import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';

import TestBtn from '../components/TestBtn';
import firebase from '../Firebase';
export default class Test extends React.Component {
  state = {
    sorusayisi: 10,
    soruindex: 0,
    skor: 0,
    makskor: 0,
    renk:'white',
    renk1:'white',
    renk2:'white',
    renk3:'white',
    resimmi: true,
    xas: ""
  };

  butonclick = (cevapmi) => {
    var sonrakisoru = this.state.soruindex;
    var skor = this.state.skor;

    if(cevapmi === true){
      sonrakisoru+=1;
      skor += 2;
      //alert("dogru cevap" + skor+ this.state.score)

      this.setState({
        renk: 'white',
        renk1:'white',
        renk2:'white',
        renk3:'white'
      })
    }

    else{
      skor -= 1;
      alert("yanlis cevap")
      if(cevapmi == '3')
      this.setState({renk3:'red'})

      if(cevapmi == '2')
      this.setState({renk2:'red'})

      if(cevapmi == '1')
      this.setState({renk1:'red'})

      if(cevapmi == '0')
      this.setState({renk:'red'})
    }

    if (sonrakisoru >= this.state.sorusayisi){
      
      alert("expo bildirim atacak")
      let deneme = firebase.auth().currentUser.uid;
      firebase.firestore().collection('Users').doc(deneme)
  .update({
    maxskor:skor
   })
   this.componentDidMount();
      return this.props.navigation.navigate("TabNavigator");
    }

    this.setState({
      soruindex: sonrakisoru,
      skor: skor,
    })

  }

  componentDidMount(){
    let deneme = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(deneme)
      .get()
    .then(querySnapshot => {
      this.setState({
        makskor:querySnapshot.data().maxskor,
        sorusayisi: 3,
        soruindex: 0,
        skor: 0,
        makskor: 0,
        renk:'white',
        renk1:'white',
        renk2:'white',
        renk3:'white',
        resimmi: true,
    
      })
    });
  }


  render() {

    const sorulars = this.props.route.params.sorular;
    const soruss = sorulars[this.state.soruindex];
   // const soruss = Hayvanlar[this.state.soruindex];
    
    if (sorulars == Renkler){
      this.state.resimmi= false;
    }


    return (
      <View style={styles.container}>
        <View style={{alignItems:'center', justifyContent:'center', flex:1,marginTop:40}}>
        {this.state.resimmi ? (
        <Image
              style={{width:350,height:250}}
              source={{uri:soruss.soru}}/>) : <View style={{borderWidth:1,height:250,width:350,backgroundColor:soruss.soru}}></View> }
        </View>

        <StatusBar barStyle="light-content" />
        <View style={styles.buttons}>
              <TestBtn
                key={soruss.cevaplar[0].id}
                text={soruss.cevaplar[0].text}
                xx = {this.state.renk}
                onPress={() => this.butonclick(soruss.cevaplar[0].cevapmi)}
              /> 
              <TestBtn
                key={soruss.cevaplar[1].id}
                text={soruss.cevaplar[1].text}
                xx = {this.state.renk1}
                onPress={() => this.butonclick(soruss.cevaplar[1].cevapmi)}
              />
              <TestBtn
                key={soruss.cevaplar[2].id}
                text={soruss.cevaplar[2].text}
                xx = {this.state.renk2}
                onPress={() => this.butonclick(soruss.cevaplar[2].cevapmi)}
              /> 
              <TestBtn
                xx = {this.state.renk3}
                key={soruss.cevaplar[3].id}
                text={soruss.cevaplar[3].text}
                onPress={() => this.butonclick(soruss.cevaplar[3].cevapmi)}
              /> 
        </View>

        <Text style={styles.skoryazi}>
            Skor: {this.state.skor}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
    paddingHorizontal: 20
  },
  skoryazi: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
  },
  buttons: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems:'stretch',
    flexDirection:'column',
    paddingBottom:20
  },
});
