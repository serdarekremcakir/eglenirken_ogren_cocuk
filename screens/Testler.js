import React, { Component,useState, useEffect, useRef } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    ImageBackground
} from "react-native";
import { createDrawerNavigator} from '@react-navigation/drawer';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Hayvanlar from '../data/Hayvanlar';
import Renkler from '../data/Renkler';
import Card from '../components/Card';
import Animals from '../data/Animals';
import Colors from '../data/Colors';
import firebase from '../Firebase';
import { CommonActions, useNavigation } from '@react-navigation/native';

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



  const [hayvansayi, sethayvansayi] = useState(0);
  const [renksayi, setrenksayi] = useState(0);
  const [maxskor, setmaxskor] = useState(0);

  useEffect(() => {
    let deneme = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(deneme)
      .get()
    .then(querySnapshot => {
        setmaxskor(querySnapshot.data().maxskor);
        sethayvansayi(querySnapshot.data().hayvansayi);
        setrenksayi(querySnapshot.data().renksayi);
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
      if (xxxsayi == 50 || xxxsayi == 100 || xxxsayi == 250) {
         yy == "hayvansayi" ?
      firebase.firestore().collection('Users').doc(deneme)
      .update({
        maxskor: parseInt(maxskor) + xxxsayi*5,
        hayvansayi: parseInt(hayvansayi) + 1,
       }) : 
       firebase.firestore().collection('Users').doc(deneme)
       .update({
         maxskor: parseInt(maxskor) + xxxsayi*5,
         renksayi: parseInt(hayvansayi) + 1,
        })
        
        bildirim(xxxsayi);
               
        }
    }
  }

  
    
  
    return (
      <ScrollView style = {{padding:20}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
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
      alert('Failed to get push token for push notification!');
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
      body: 'Toplam skorunuza ' + testsayi*5 + ' puan eklenmiştir.',
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

  useEffect(() => {
    let deneme = firebase.auth().currentUser.uid;
   
    firebase.firestore().collection("Users").doc(deneme)
      .get()
    .then(querySnapshot => {
        setmaxskor(querySnapshot.data().maxskor);
        setanimalsayi(querySnapshot.data().animalsayi);
        setcolorsayi(querySnapshot.data().colorsayi);
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
        maxskor: parseInt(maxskor) + xxxsayi*5,
        animalsayi: parseInt(animalsayi) + 1,
       }) : 
       firebase.firestore().collection('Users').doc(deneme)
       .update({
         maxskor: parseInt(maxskor) + xxxsayi*5,
         colorsayi: parseInt(colorsayi) + 1,
        })
        
        bildirim(xxxsayi);
               
        }
    }
  }

  
    
    return (
      <ScrollView style = {{padding:20}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
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
        <Text style={{color:'black', fontSize:25, textAlign:'center', paddingBottom:10}}>Şimdilik Diğer Dillerdeki Testlere Göz Atabilirsiniz</Text>
        <View style={{flex:1,paddingTop:20, justifyContent:'flex-start', width:"80%"}}>
        <Button onPress={() => navigation.toggleDrawer()} title="Diller"/>
        </View>
        </View>
        </ImageBackground>
     
    );
  }
}



const Drawer = createDrawerNavigator();

export default function Testler() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Türkçe" component={HomeScreen} />
        <Drawer.Screen name="İngilizce" component={HomeScreen2} />
        <Drawer.Screen name="Almanca" component={Eklenecek} />
        <Drawer.Screen name="İspanyolca" component={Eklenecek} />
        <Drawer.Screen name="İtalyanca" component={Eklenecek} />
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
    }
});