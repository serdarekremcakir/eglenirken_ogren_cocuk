import React, { Component,useState, useEffect, useRef } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions 
} from "react-native";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';
import Card from '../components/Card';
import Animals from '../data/Animals';
import Colors from '../data/Colors';
import firebase from '../Firebase';
import Profil from './Profil';
import EsleKazan from './EsleKazan'
import { CommonActions, useNavigation,NavigationContainer } from '@react-navigation/native';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen() {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  function eklenecek(){
    alert("Test daha sonra eklenecek")
  }

  const [hayvansayi, sethayvansayi] = useState(-1);
  const [renksayi, setrenksayi] = useState(-1);
  const [maxskor, setmaxskor] = useState(-1);
  const [elmas, setelmas] = useState(-1);

  useEffect(() => {
    let deneme = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(deneme).get()
    .then(querySnapshot => {
        
        sethayvansayi(querySnapshot.data().hayvansayi);
        setrenksayi(querySnapshot.data().renksayi);
        setmaxskor(querySnapshot.data().maxskor);
        setelmas(querySnapshot.data().elmas);
    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  });

  function testegit(soru){
    let deneme = firebase.auth().currentUser.uid;
    if (soru == Hayvanlar) {
        kontrol(hayvansayi, "hayvansayi")
        navigation.navigate('Test', {sorular:soru})
    }
    
    if (soru == Renkler) {
       kontrol(renksayi, "renksayi")
        navigation.navigate('Test', {sorular:soru})
    }

    function kontrol(xxxsayi,yy){
      console.log("kontrol fonksiyonu içi hayvansayi", hayvansayi);
      console.log("elmas sayısı",elmas);
      if (xxxsayi == 50 || xxxsayi == 100 || xxxsayi == 250) {
         yy == "hayvansayi" ?
      firebase.firestore().collection('Users').doc(deneme)
      .update({
        elmas: parseInt(elmas) + (xxxsayi*5),
        hayvansayi: parseInt(hayvansayi) + 1,
       }) : 
       firebase.firestore().collection('Users').doc(deneme)
       .update({
         elmas: parseInt(elmas) + (xxxsayi*5),
         renksayi: parseInt(hayvansayi) + 1,
        })
        console.log("xxxsayi:", xxxsayi)
        
        bildirim(xxxsayi);
               
        }
    }
  }
    return (
      <ScrollView style = {{padding:20,backgroundColor:'#e2e2e2'}}>
        <Button onPress={() => navigation.toggleDrawer()} title="MENU"/>
          <View style={styles.Cardlar}>
            <Card
            link="https://i.hizliresim.com/XdF4vJ.jpg"
            onPress={() => testegit(Hayvanlar)}
            text="Hayvanlar"/>
            <Card
            link="https://i.hizliresim.com/Ektc07.jpg"
            onPress={() => testegit(Renkler)}
            text="Renkler"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Yakında"/>
          </View>
          <View style ={{paddingBottom:30}}></View>
       </ScrollView> 
      );
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function bildirim(testsayi) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tebrikler bu testi " + testsayi+   " kez tamamladınız.",
      body: 'Hesabınıza ' + testsayi*5 + ' elmas eklenmiştir.',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
function HomeScreen2() {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  function eklenecek(){
    alert("Test will be added later")
  }


  const [colorsayi, setcolorsayi] = useState(0);
  const [animalsayi, setanimalsayi] = useState(0);
  const [maxskor, setmaxskor] = useState(0);
  const [elmas, setelmas] = useState(0);

  useEffect(() => {
    let deneme = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(deneme)
      .get()
    .then(querySnapshot => {
        setmaxskor(querySnapshot.data().maxskor);
        setanimalsayi(querySnapshot.data().animalsayi);
        setcolorsayi(querySnapshot.data().colorsayi);
        setelmas(querySnapshot.data().elmas);

    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };

  });

  function testegit(soru){
    let deneme = firebase.auth().currentUser.uid;
    if (soru == Animals) {
        kontrol(animalsayi, "animalsayi")
        navigation.navigate('Test', {sorular:soru})
    }
    
    if (soru == Colors) {
       kontrol(colorsayi, "colorsayi")
        navigation.navigate('Test', {sorular:soru})
    }
    function kontrol(xxxsayi,yy){
      if (xxxsayi == 50 || xxxsayi == 100 || xxxsayi == 250) {
         yy == "animalsayi" ?
      firebase.firestore().collection('Users').doc(deneme)
      .update({
        elmas: parseInt(elmas) + (xxxsayi*5),
        animalsayi: parseInt(animalsayi) + 1,
       }) : 
       firebase.firestore().collection('Users').doc(deneme)
       .update({
         elmas: parseInt(elmas) + (xxxsayi*5),
         colorsayi: parseInt(colorsayi) + 1,
        })
        
        bildirim(xxxsayi);
               
        }
    }
  }

  
    
    return (
      <ScrollView style = {{padding:20,backgroundColor:'#e2e2e2'}}>
        <Button onPress={() => navigation.toggleDrawer()} title="MENU"/>
          <View style={styles.Cardlar}>
            <Card
            link="https://i.hizliresim.com/XdF4vJ.jpg"
            onPress={() => testegit(Animals)}
            text="Animals"/>
            <Card
            link="https://i.hizliresim.com/Ektc07.jpg"
            onPress={() => testegit(Colors)}
            text="Colors"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
          </View>
          <View style={styles.Cardlar}>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
            <Card
            link='https://ae01.alicdn.com/kf/HTB1OI0VQbvpK1RjSZPiq6zmwXXaT.jpg_q50.jpg'
            onPress={() =>eklenecek()} 
            text="Soon"/>
          </View>
          <View style ={{paddingBottom:30}}></View>
       </ScrollView> 
      );
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
        <Text style={{color:'black', fontSize:25, textAlign:'center', paddingBottom:10}}>Şimdilik Diğer Test ve Oyunlara Göz Atabilirsiniz</Text>
        <View style={{flex:1,paddingTop:20, justifyContent:'flex-start', width:"80%"}}>
        <Button onPress={() => navigation.toggleDrawer()} title="MENU"/>
        </View>
        </View>
        </ImageBackground>
     
    );
  }
}



function CustomDrawerContent(props) {
  const [ad, setad] = useState("");
  const [email, setemail] = useState("");
  const [profilfoto, setprofilfoto] = useState("");
  const [id, setid] = useState("");
  const [elmas, setelmas] = useState(0);

  let deneme = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Users").doc(deneme)
          .get()
        .then(querySnapshot => {

          setad(querySnapshot.data().ad);
          setemail(querySnapshot.data().email);
          setprofilfoto(querySnapshot.data().profilfoto);
          setid(querySnapshot.data().id);
          setelmas(querySnapshot.data().elmas);

        });

  function CikisYap(){
    //props.navigation.closeDrawer();
    firebase.auth().signOut().then(() => props.navigation.navigate('Giris'))
  }

  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={{uri:"https://wallpapercave.com/wp/wp2564226.png"}}
        style={{width:undefined,padding:16}}>

          <View style={{flexDirection:'row',flex:1,justifyContent:'space-evenly'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Image
              source = {{uri:profilfoto}}
              style = {styles.profil}/>
            </View>
            
            <View style={{flexDirection:'column',flex:1,justifyContent:'center',marginRight:10}}>
              <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20 }}>{ad}</Text>
              <Text style={{textAlign:'center',textDecorationLine:'underline' ,fontSize:13}}>{email}</Text>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:40,marginTop:5,backgroundColor:'#e2e2e2'}}>
                <Text>{elmas}</Text>
                <Image source= {{uri:"https://i.hizliresim.com/dlzg110.png"}}
                style={{width:30,height:30,marginLeft:3}}
                />

              </View>
            </View>

          </View>
        </ImageBackground>
      <ImageBackground
      source={{uri:"https://i.hizliresim.com/bsFlwV.png"}}
      style={{flex:1}}
      imageStyle= {{opacity:0.1,resizeMode:'cover'}}>
        
      <DrawerItemList {...props} />
      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }} />
      <DrawerItem label="Çıkış Yap" onPress={() => CikisYap()} />
      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }} />
      </ImageBackground>




      {id == "admin" ?
      <ImageBackground
      source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkm1uE-ZfpdeKYN-WCAuzMN_nw8wPLP6hjeA&usqp=CAU"}}
      style={{flex:1,}}
      imageStyle= {{opacity:0.5}}>
      <View style={{ flex:1,paddingTop:15,paddingBottom:20}}>
        <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Admin Menu</Text>
        <View style={{ height: 1, width: '100%', backgroundColor: 'black' }} />
        <DrawerItem labelStyle={{color:'black'}} label="Urun Ekle" style={{borderWidth:2,marginTop:13}} onPress={() => props.navigation.navigate('UrunEkle')} />
        <DrawerItem labelStyle={{color:'black'}} label="Siparisler" style={{borderWidth:2}} onPress={() => props.navigation.navigate('Siparisler')} />
        <DrawerItem labelStyle={{color:'black'}} label="Urunler" style={{borderWidth:2}} onPress={() => props.navigation.navigate('Urunler')} />
      </View></ImageBackground> : null}
     



    </DrawerContentScrollView>
  );
}



const Drawer = createDrawerNavigator();

export default function Testler() {
  const [giris, setgiris] = useState(false);
  var user = firebase.auth().currentUser;
  


  return (
      <Drawer.Navigator drawerContentOptions={{
        activeTintColor: '#ffaa00',activeBackgroundColor:'#4d0000',}} drawerContent={props => <CustomDrawerContent {...props}/>}>
        
        <Drawer.Screen name="Türkçe" component={HomeScreen}/>
        <Drawer.Screen name="İngilizce" component={HomeScreen2} />
        <Drawer.Screen name="Almanca" component={Eklenecek} />
        
        <Drawer.Screen name="İspanyolca" component={Eklenecek} />
        <Drawer.Screen name="İtalyanca" component={Eklenecek} />

        <Drawer.Screen name="Esle Kazan" component={EsleKazan} />


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
    },

    profil:{
      width:100,
      height:100,
      borderRadius:40,
      borderWidth:3,
      borderColor:"#FFF"
    },

});
