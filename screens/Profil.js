import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Button
} from "react-native";
import firebase from '../Firebase';
import GirisKaydolBtn from '../components/GirisKaydolBtn';
class Profil extends Component {
    constructor(){
        super();
      }
      state={
        kullaniciAdi:'',
        email:"",
        sifre:"",
        maxskor:0,
        hayvansayi:0,
        renksayi:0,
        animalsayi:0,
        colorsayi:0,
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
            email:querySnapshot.data().email
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
            email:querySnapshot.data().email
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

      Lidertablosu(){
        this.props.navigation.navigate('Lidertablosu');

      }

    render() {
        return (
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={5}
          source={{uri: 'https://i.pinimg.com/originals/f2/1e/f1/f21ef1b22dafc3e553302ab920f84d20.jpg'}}
        >
          
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: 'https://incomarinspection.com/wp-content/uploads/2017/04/Unknown-Profile.png'}}
            />
            <Text style={styles.userNameText}>{this.state.kullaniciAdi}</Text>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {this.state.email}
                </Text>
              </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{ flexDirection:'row'}} />
            <View style={styles.separator} />
          </View>

          <View style={{alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.2)'}}>
              <Text style={styles.istatistikText}>İstatistikler</Text>
          </View>
        <View style={styles.hehe}>
          
          <View>
              <Text style={styles.userCityText}>Hayvanlar Testi Tamamlama Sayısı: {this.state.hayvansayi}</Text>
              <Text style={styles.userCityText}>Renkler Testi Tamamlama Sayısı: {this.state.renksayi}</Text>
              <Text style={styles.userCityText}>Animal Testi Tamamlama Sayısı: {this.state.animalsayi}</Text>
              <Text style={styles.userCityText}>Color Testi Tamamlama Sayısı: {this.state.colorsayi}</Text>
          </View>
          <View style={{paddingTop:30}}>
              <Text style={styles.toplampuanText}>Toplam Puan: {this.state.maxskor}</Text>
          </View>
            
          <View style={{alignItems:'center',justifyContent:'center',paddingTop:20, width:"80%"}}>
             <GirisKaydolBtn onPress={() => this.Cikisyap()} text="CIKIS"/> 
             <GirisKaydolBtn onPress={() => this.Lidertablosu()} text="Tablo"/> 
          </View>
        </View>
        
        </ImageBackground>
    )
  }

    
}
export default Profil;

const styles = StyleSheet.create({
    headerBackgroundImage: {
      
      flex:1,
      paddingTop: 30,
    },
    headerColumn:{
        backgroundColor:'transparent',
        alignItems:'center',
        
    },
    userImage: {
        borderColor: 'black',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
      },
    
      userNameText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 5,
        textAlign: 'center',
        paddingTop:5
      },

      userCityRow: {
        backgroundColor: 'transparent',
        paddingBottom:10,
      },

      userCityText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine:'underline',
        paddingTop:3
      },

      hehe:{      
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
      separator:{
        borderColor: 'black',
        borderWidth: 0.8,
        flex:1,
        flexDirection: 'row',
      },
      istatistikText:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 5,
        textAlign: 'center',
        paddingTop:25
      },
      toplampuanText:{
          textAlign: 'center',
          color: 'black',
          fontSize: 24,
          fontWeight: 'bold',
          paddingTop:3
      }
    
});