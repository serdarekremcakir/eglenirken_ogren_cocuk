import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from "react-native";
import firebase from '../Firebase';
import GirisKaydolBtn from '../components/GirisKaydolBtn';
import { ScrollView } from "react-native-gesture-handler";
let width = Dimensions.get('window').width;
class Profil extends Component {
  
    constructor(){
        super();
      }
      state={
        kullaniciAdi:'',
        email:"",
        sifre:"",
        profilfoto:"",
        maxskor:0,
        hayvansayi:0,
        renksayi:0,
        animalsayi:0,
        colorsayi:0,
        elmas:0
      }

      componentDidUpdate(){
          this.Yenile();
      }

      componentDidMount(){
        let deneme = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Users").doc(deneme)
          .get()
        .then(querySnapshot => {
          this.setState({
            kullaniciAdi:querySnapshot.data().ad,
            maxskor:querySnapshot.data().maxskor,
            hayvansayi:querySnapshot.data().hayvansayi,
            renksayi:querySnapshot.data().renksayi,
            animalsayi:querySnapshot.data().animalsayi,
            colorsayi:querySnapshot.data().colorsayi,
            email:querySnapshot.data().email,
            profilfoto:querySnapshot.data().profilfoto,
            elmas:querySnapshot.data().elmas,
          })
        });
      }

      Yenile(){
        let deneme = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Users").doc(deneme)
          .get()
        .then(querySnapshot => {
          this.setState({
            
            kullaniciAdi:querySnapshot.data().ad,
            maxskor:querySnapshot.data().maxskor,
            hayvansayi:querySnapshot.data().hayvansayi,
            renksayi:querySnapshot.data().renksayi,
            animalsayi:querySnapshot.data().animalsayi,
            colorsayi:querySnapshot.data().colorsayi,
            email:querySnapshot.data().email,
            profilfoto:querySnapshot.data().profilfoto,
          })
        });
      }
    
       Cikisyap() {
        try {
          //firebase.auth().signOut();
          this.props.navigation.navigate('Giris');
        } catch (err) {
          alert('There is something wrong!', err.message);
        }
      }

      FotoEkle(x){
        let deneme = firebase.auth().currentUser.uid;

      firebase.firestore().collection('Users').doc(deneme)
      .update({
        profilfoto:x
       })

      }

      Lidertablosu(){
        this.props.navigation.navigate('Lidertablosu');

      }

      

    render() {
        return (
          <View style={{flex:1,backgroundColor:'white'}}>
                <ImageBackground style={{flex:1}} blurRadius={5} source={{uri: 'https://i.pinimg.com/originals/f2/1e/f1/f21ef1b22dafc3e553302ab920f84d20.jpg'}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Image style={{borderRadius:85,borderWidth:3,width:'40%',height:'90%',resizeMode:'stretch'}}source={{uri: this.state.profilfoto}}/>
                    </View>
                    <View style={{flex:0.5,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:25,fontWeight:'bold'}}>{this.state.kullaniciAdi}</Text>
                        <Text style={{fontSize:20, fontWeight:'bold', textDecorationLine:'underline'}}>{this.state.email}</Text>
                    </View>

                    <View style={{flex:0.5,flexDirection:'row',alignItems:"center",justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={styles.fototouch} onPress={() => this.FotoEkle("https://l24.im/puInEK")} >
                            <Image style={{flex:1,borderRadius:85,resizeMode:'stretch'}} source={{uri: "https://l24.im/puInEK"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.FotoEkle("https://l24.im/l87D")} style={styles.fototouch}>
                            <Image style={{flex:1,borderRadius:85,resizeMode:'stretch'}} source={{uri: "https://l24.im/l87D"}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.FotoEkle("https://l24.im/XQAeEud")} style={styles.fototouch}>
                            <Image style={{flex:1,borderRadius:85,resizeMode:'stretch'}} source={{uri: "https://l24.im/XQAeEud"}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.FotoEkle("https://l24.im/NGWt")} style={styles.fototouch}>
                            <Image style={{flex:1,borderRadius:85,resizeMode:'stretch'}} source={{uri: "https://l24.im/NGWt"}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{textDecorationLine:'underline'}}>Profil fotoğrafınızı yukarıdaki fotoğraflardan seçebilirsiniz.</Text>
                    </View>

               
                    <View style={{flex:2,flexDirection:'column',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.2)',marginTop:5}}>
                    <View style={{width:'100%',height:3,borderWidth:1,backgroundColor:'black'}}></View>
                        <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
                            
                            <Text style={styles.toplampuanText}> ISTATISTIKLER</Text>
                            
                        </View>
                        <View style={{width:'100%',height:3,borderWidth:1,backgroundColor:'black'}}></View>
                        <View style={{flex:2, flexDirection:'column', alignItems:'center', justifyContent:'center',}}>
                            <Text style={styles.sayitext}>Hayvanlar Testi Tamamlama Sayısı: {this.state.hayvansayi}</Text>
                            <Text style={styles.sayitext}>Renkler Testi Tamamlama Sayısı: {this.state.renksayi}</Text>
                            <Text style={styles.sayitext}>Animal Testi Tamamlama Sayısı: {this.state.animalsayi}</Text>
                            <Text style={styles.sayitext}>Color Testi Tamamlama Sayısı: {this.state.colorsayi}</Text>

                        </View>

                        <View style={{flex:1.2,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Text style={styles.toplampuanText}>Toplam Test Puanı: {this.state.maxskor}</Text>
                            <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.toplampuanText}>Toplam Elmas: {this.state.elmas}</Text>
                                <Image source= {{uri:"https://i.hizliresim.com/dlzg110.png"}}
                                style={{width:30,height:30,marginLeft:3}}/>
                            </View>
                            
                        </View>

                    </View>
                    <View style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
                        <GirisKaydolBtn onPress={() => this.Lidertablosu()} text="Haftanın Enleri"/> 

                    </View>
                    </ImageBackground>
            </View>
          
    )
  }

    
}
export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fototouch:{
      width:'20%',
      height:'80%',
      borderRadius:85,
      borderWidth:3,
      borderColor:'white'
  },

  sayitext:{
      fontSize:18,
      textAlign:'center'
  },
  toplampuanText:{
      fontSize:20,
      fontWeight:'bold'
  }
});