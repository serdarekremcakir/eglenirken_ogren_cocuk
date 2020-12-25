import React from 'react';
import firebase from '../Firebase';
import Leaderboard from 'react-native-leaderboard';
import { View,Text, Image, TouchableOpacity} from 'react-native';

export default class Lidertablosu extends React.Component { //App
  constructor(){
    super();
  }
  state = {
    data: [] ,
    userRank: 1,
}

sort = (data) => {
  
  const sorted = data && data.sort((item1, item2) => {
      return item2.maxskor - item1.maxskor;
  })
  let userRank = sorted.findIndex((item) => {
      return item.ad === this.state.ad;
  })
  this.setState({ userRank: ++userRank });
  return sorted;
}


componentDidMount(){
let deneme = firebase.auth().currentUser.uid;
firebase.firestore().collection("Users").doc(deneme)
.get()
.then(querySnapshot => {
this.setState({
  ad:querySnapshot.data().ad,
  maxskor:querySnapshot.data().maxskor
})
});


  firebase.firestore()
  .collection('Users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        this.setState({
          data:[
            ...this.state.data,
            {
          ad:doc.data().ad,
          maxskor:doc.data().maxskor}
          ]
        })

      }
    });
    this.sort(this.state.data)

  });
}


renderHeader() {
  return (
      <View colors={[, '#1da2c6', '#1695b7']}
          style={{ backgroundColor: '#1A344E',}}>
            <View>
              <TouchableOpacity style={{ height: 35, width:35,paddingLeft:10, paddingTop:10 }} onPress={() => this.props.navigation.goBack()}>
                <Image style={{width:35,height:35}} source={{uri: 'https://i.hizliresim.com/1CcP8X.png'}}/>
              </TouchableOpacity> 
            </View>

            <View style={{
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop:6,}}>
              <Text style={{
              fontSize: 35, fontStyle: 'italic',
              fontWeight:"bold",
              color:"#fb5b5a",
              marginBottom:6,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 10},
              textShadowRadius: 10}}>
                  Sıralama </Text>
              <Text style={{ fontSize: 25, color: 'white', }}>{this.state.ad}</Text>


            </View>
          
          <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              marginBottom: 15, marginTop: 15
          }}>
            <View style={{flex:3, justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
              <Text style={{ color: 'white', fontSize: 25,}}>
                  Sıralamanız: {this.state.userRank}
              </Text>
              
              <Text style={{ color: 'white', fontSize: 25,}}>
                  {this.state.maxskor} Puan
              </Text>

            </View>
              
          </View>
      </View>
  )
}

  render(){
    return (
      
<View style={{ flex: 1 }}>
      {this.renderHeader()}
        <Leaderboard 
        data={this.state.data} 
        sortBy='maxskor' 
        evenRowColor= "#edfcf9"
        labelBy='ad'/>      
        </View>
        )
  }
}