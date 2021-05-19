import React, { useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, VirtualizedList } from 'react-native';
import firebase from '../Firebase';

export default function Siparis({route,navigation}) {

    const { id, isim, aciklama, fiyat, fotolink } = route.params;
    const [ad,setad] = useState("");
    const [email,setemail] = useState("");
    const [kisiuid,setkisiuid] = useState("");
    let [adres,setadres] = useState("");
    const [elmas,setelmas] = useState(0);

    useEffect(() => {
        let uid = firebase.auth().currentUser.uid;
       
        firebase.firestore().collection("Users").doc(uid).get()
        .then(querySnapshot => {
            setad(querySnapshot.data().ad);
            setemail(querySnapshot.data().email);
            setkisiuid(uid);
            setadres(querySnapshot.data().adres);
            setelmas(querySnapshot.data().elmas);
            console.log("Kişi bilgileri");
            console.log(kisiuid);
            console.log(ad);
            console.log(email);
            console.log(adres);
            console.log("Ürün Bilgileri");
            console.log(id);
            console.log(isim);
            console.log(fiyat);
            console.log(fotolink);
        });
    });

    const AdresEkle = () => {
       navigation.navigate('AdresEkle')
    }
    
    
    const SatinAl = () => {

        if (elmas < fiyat) {
            alert("Elmas yetersiz!")
        }

        else{

            if (adres=="Adres bilgisi yok.") {
                alert("Adres bulanamadı. Lütfen bir adres ekleyiniz.")
                console.log("adre123s:",adres);
            }

            else{
                let autoId = ''
                autoId = require('../components/Generatepushid').pushid();

                const data = {
                    siparisid: autoId,
                    kisiuid:kisiuid,
                    kisiad: ad,
                    kisiemail: email,
                    urunid:id,
                    urunisim:isim,
                    urunfiyat:fiyat,
                    urunfotolink:fotolink,
                    kisiadres:adres,
                };


                const sipariscollection = firebase.firestore().collection('siparis')
                sipariscollection.doc(autoId).set(data)
                .then(() => {
                    //autoId= '';
                    let uid = firebase.auth().currentUser.uid;
                    
                    firebase.firestore().collection('Users').doc(uid).update({
                    elmas:elmas-fiyat})
                    
                    alert("Başarıyla satın alındı.")
                    navigation.navigate('TabNavigator')  
                })
                .catch((error) => {
                    alert(error)
                });
            }
        }
            
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.foto}>
                <Image
                source={{uri:fotolink}}
                //source={require('../images/urun1.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode:"stretch"
                }}/>
        
            </View>

            <View style={styles.isimaciklama}>
                
                <View style={styles.isim}>
                    <Text style={{fontSize:17, textAlign:'center', fontWeight:'bold'}}>{isim}</Text>
                </View>

                <View style={styles.dikcizgi}></View>

                <View style={styles.aciklama}>
                    <Text>{aciklama} </Text>
                </View>
              
            </View>

            <View style={styles.adres}>

                <View style={styles.isim}>
                    <Text style={{fontSize:17, textAlign:'center', fontWeight:'bold'}}>Adres:</Text>
                </View>

                <View style={styles.aciklama}>
                    <Text>{adres} </Text>
                </View>

            </View>

            <View style={styles.adresekle}>
                <TouchableOpacity onPress={() => AdresEkle()} style={[styles.button,{backgroundColor:'#e2e2e2'}]}>
                        <Text style={styles.adresyazi}>Yeni adres ekle.</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.fiyatsatinal}>
                <View style={styles.fiyat}>
                    <Text>{fiyat}</Text>
                    <Image source= {{uri:"https://i.hizliresim.com/dlzg110.png"}}
                    style={{width:20,height:20,marginLeft:3}}/>
                </View>

                <View style={styles.satinal}>
                    <TouchableOpacity onPress={() => SatinAl()} style={styles.button}>
                        <Text style={styles.buttonyazi}>Satin Al</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#e2e2e2',
    },

    foto:{
        flex:2,
        width:'60%',
        borderWidth:3,
        margin:30,
        marginBottom:5,

    },

    isimaciklama:{
        flex:0.3,
        width:'100%',
        flexDirection:'row',
        margin:20,
        borderWidth:1,

    },

    isim:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    dikcizgi:{
        height:'100%',
        width:1.3,
        backgroundColor:'black',
    },

    aciklama:{
        flex:4,
        justifyContent:'center',
        alignItems:'center',
    },

    adres:{
        width:'100%',
        flexDirection:'row',
        flex:0.5,
        marginBottom:10,
        borderWidth:1,
    },

    adresekle:{
        flex:0.1,
        //width:'100%',
        marginBottom:20,
    },

    adresyazi:{
        color: 'black',
        fontSize: 15,
        fontStyle:'italic',
        textDecorationLine:'underline',
    },
    
    fiyatsatinal:{
        width:'100%',
        flexDirection:'row',
        flex:0.3,
        marginBottom:20,
        borderWidth:1,
       
    },

    fiyat:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },

    satinal:{
        flex:4,
        justifyContent:'center',
        alignItems:'center',
    },

    button: {
        backgroundColor: '#ed9121',
        height:'100%',
        width: '100%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },

    buttonyazi: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    }
})
