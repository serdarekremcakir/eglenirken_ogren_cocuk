import React from 'react';
import { View, StyleSheet, StatusBar, Text, Image, Dimensions } from 'react-native';
import Hayvanlar from '../Hayvanlar';
import TestBtn from '../components/TestBtn';

export default class Test extends React.Component {
  state = {
    sorusayisi: 2,
    soruindex: 0,
    score: 0,
    renk:'white',
    renk1:'white',
    renk2:'white',
    renk3:'white'
  };

  butonclick = (cevapmi) => {
    var sonrakisoru = this.state.soruindex;
    var skor = this.state.score;

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
      //return this.props.navigation.popToTop();
    }

    this.setState({
      soruindex: sonrakisoru,
      score: skor,
    })

  }

  render() {
    const soruss = Hayvanlar[this.state.soruindex];
    
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center', justifyContent:'center', flex:1,marginTop:40}}>
        <Image
              style={{width:350,height:250}}
              source={{uri:soruss.soru}}/>
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
            Skor: {this.state.score}
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
