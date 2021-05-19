import React from 'react';
import firebase from '../Firebase';
import Leaderboard from '../components/Leaderboard';
import { View, Text, Image, TouchableOpacity } from 'react-native';


export default class Lidertablosu extends React.Component { //App
  constructor() {
    super();
    this.state = {
      testdata: [],
      oyundata: [],
      userRank: 1,
      lastRefresh: 0,
    }
    this.refreshScreen = this.refreshScreen.bind(this)
  }


  sort = (data) => {

    const sorted = data && data.sort((item1, item2) => {
      return item2.maxskor - item1.maxskor;
    })
    let userRank = sorted.findIndex((item) => {
      return item.ad === this.state.ad;
    })
    this.setState({ userRank: ++userRank });
    console.log("akskakkak",sorted);
    return sorted;

  }



  refreshScreen() {
    if (this.state.lastRefresh == 0) {
      this.setState({ lastRefresh: 1 });
      this.sort(this.state.oyundata);
    }
    else{
      this.setState({ lastRefresh: 0 });
      this.sort(this.state.testdata);
    }
  }

  siralamabuton(x){
    console.log("siralamabuton ici")
    if (this.state.lastRefresh == x) {
    }

    else{
      this.refreshScreen();
      console.log("siralamabuston else  ici")
    }
  }

  odulleridagit(){

        this.sort(this.state.testdata);
        this.sort(this.state.oyundata);
        console.log("butondan önce elmas sayisi:",this.state.testdata[0].elmas)
        console.log("elmas sayisi:",this.state.testdata[1].elmas)
        console.log("elmas sayisi:",this.state.testdata[2].elmas)

        firebase.firestore().collection('Users').doc(this.state.testdata[0].id)
        .update({elmas: parseInt(this.state.testdata[0].elmas) + 500 })
        firebase.firestore().collection('Users').doc(this.state.testdata[1].id)
        .update({elmas: parseInt(this.state.testdata[1].elmas) + 250})
        firebase.firestore().collection('Users').doc(this.state.testdata[2].id)
        .update({elmas: parseInt(this.state.testdata[2].elmas) + 125})


        var serdar = this.state.testdata;
        serdar[0].elmas = serdar[0].elmas + 500;
        serdar[1].elmas = serdar[1].elmas + 250;
        serdar[2].elmas = serdar[2].elmas + 125;
        this.setState({testdata:serdar})

        var ekrem = this.state.oyundata;
        for(var i=0; i<3; i++){
          for(var x=0; x<3; x++){
            if (ekrem[i].id == serdar[x].id) {
              ekrem[i].elmas = serdar[x].elmas;
            }
          }
          this.setState({oyundata:ekrem})
        }


        console.log("testdata",this.state.testdata[0])

        console.log("güncelle sonra elmas sayisi:",this.state.testdata[0].elmas)
        console.log("elmas sayisi:",this.state.testdata[1].elmas)
        console.log("elmass ssayisi:",this.state.testdata[2].elmas)
    

        console.log("butondan önce elmas sayisi:",this.state.oyundata[0].elmas)
        console.log("elmas sayisi:",this.state.oyundata[1].elmas)
        console.log("elmas sayisi:",this.state.oyundata[2].elmas)
      
      firebase.firestore().collection('Users').doc(this.state.oyundata[0].id)
        .update({elmas: parseInt(this.state.oyundata[0].elmas) + 500 })
        firebase.firestore().collection('Users').doc(this.state.oyundata[1].id)
        .update({elmas: parseInt(this.state.oyundata[1].elmas) + 250 })
        firebase.firestore().collection('Users').doc(this.state.oyundata[2].id)
        .update({elmas: parseInt(this.state.oyundata[2].elmas) + 125 })
        
        firebase.firestore().collection("Users").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              doc.ref.update({
                  maxskor:0,
                  esleskor:0,
              });
          });
      });
        
    

  }

  guncelle(){
    
  }


  componentDidMount() {
      let uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("Users").doc(uid
      )
        .get()
        .then(querySnapshot => {
          this.setState({
            ad: querySnapshot.data().ad,
            maxskor: querySnapshot.data().maxskor,
            esleskor: querySnapshot.data().esleskor,
            profilfoto: querySnapshot.data().profilfoto,
            id: querySnapshot.data().id,
            //elmas: querySnapshot.data().elmas,
          })
        });


    firebase.firestore().collection('Users').get().then(snapshot => {
      snapshot.forEach(doc => {
          if (doc && doc.exists) {
            this.setState({
              testdata: [
                ...this.state.testdata,
                {
                  ad: doc.data().ad,
                  maxskor: doc.data().maxskor,
                  profilfoto: doc.data().profilfoto,
                  id: doc.data().id,
                  elmas: doc.data().elmas,
                }
              ],
              oyundata: [
                ...this.state.oyundata,
                {
                  ad: doc.data().ad,
                  maxskor: doc.data().esleskor,
                  profilfoto: doc.data().profilfoto,
                  id: doc.data().id,
                  elmas: doc.data().elmas,
                }
              ]
            })

            this.sort(this.state.testdata);
            console.log("didmonutestdata:",this.state.testdata)
            console.log("didmountoyundata:",this.state.oyundata)
          }
        });
        //this.sort(this.state.testdata)
      });
  }


  renderHeader() {
    return (
      <View colors={[, '#1da2c6', '#1695b7']}
        style={{ backgroundColor: '#1A344E', }}>
        <View style={{ flex: 0.3, flexDirection: 'row', }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 50, marginLeft: 10, marginTop:10 }} onPress={() => this.props.navigation.goBack()}>
              <Image style={{ resizeMode: 'stretch', flex: 1 }} source={{ uri: 'https://i.hizliresim.com/1CcP8X.png' }} />
            </TouchableOpacity>
          </View>
          {this.state.id == "PxDgvIK7ucYqBXdC6Ayvj4wMf4D2" || "admin" ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#4d0000' }} onPress={() => this.odulleridagit()}>
              <Text style={{ color: "#ffaa00" }}>Ödül dağıt, sıralamayı sıfırla</Text>
            </TouchableOpacity>
          </View>:null}
        </View>


        <View style={{
          flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{
            fontSize: 35, fontStyle: 'italic',
            fontWeight: "bold",
            color: "#fb5b5a",
            marginBottom: 6,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 10 },
            textShadowRadius: 10
          }}>
            Sıralama </Text>


           <View style={{width:'80%',flexDirection:'row',flex:1,justifyContent:'space-evenly',marginBottom:10}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Image
              source = {{uri:this.state.profilfoto}}
              style = {{width:75,height:50,marginBottom:3,borderRadius:40,borderWidth:3,borderColor:"#FFF"}}/>
              <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20,color:'white' }}>{this.state.ad}</Text>
            </View>
            
            
              
            
          </View>

          <View style={{ flexDirection: 'row', flex:1,backgroundColor:'#1695b7',width:'80%',alignItems: 'center', justifyContent: 'center', marginBottom:10}}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 2 }} onPress={() => this.siralamabuton(0)}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Testler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderLeftWidth: 0 }} onPress={() => this.siralamabuton(1)}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Oyunlar</Text>
            </TouchableOpacity>
           
          </View>



        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
          marginBottom: 15,  marginTop: 15,borderWidth:2,borderColor :'white'
        }}>
          <View style={{ flex: 3, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 25, }}>
              Sıralamanız: {this.state.userRank}
            </Text>

            <Text style={{ color: 'white', fontSize: 25, }}>
              {this.state.maxskor} Puan
              </Text>
          </View>

        </View>
      </View>
    )
  }


  render() {
    return (

      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <Leaderboard
          data= {this.state.lastRefresh == 0 ? this.state.testdata : this.state.oyundata}
          sortBy='maxskor'
          evenRowColor="#edfcf9"
          icon='profilfoto'
          labelBy='ad' />
      </View>
    )
  }
}