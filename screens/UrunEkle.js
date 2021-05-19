import React, { useState } from 'react'
import { StyleSheet,TextInput, View, Image } from 'react-native'
import firebase from '../Firebase';
import GirisKaydolBtn from '../components/GirisKaydolBtn';


export default function UrunEkle({ navigation }) {
    let [isim, setisim] = useState('')
    let [fiyat, setfiyat] = useState('')
    let [aciklama, setaciklama] = useState('')
    let [fotolink, setfotolink] = useState('')

    let autoId = ''
    autoId = require('../components/Generatepushid').pushid()

    console.log("asdasdsa",autoId);

    const urunEkle = () => {
        const veri = {
            id: autoId,
            isim: isim,
            fiyat: fiyat,
            aciklama: aciklama,
            fotolink: fotolink,
        };
        const marketcollection = firebase.firestore().collection('market')

        if(isim==''){
            alert("Ürün İsmi Boş Bırakılamaz!")
        }
        else if(fiyat==''){
            alert("Ürün Fiyatı Boş Bırakılamaz!")
        }
        else if(aciklama==''){
            alert("Ürün Açıklaması Boş Bırakılamaz!")
        }
        else if(fotolink==''){
            alert("Ürün Fotoğrafı Boş Bırakılamaz!")
        }

        else{
            marketcollection.doc(autoId).set(veri)
            .then(() => {
                alert("Ürün Eklendi.")
                navigation.navigate('TabNavigator')  
            })
            .catch((error) => {
                alert(error)
            });
        }
        
    }

    return (
        <View style={styles.container}>
            <View style = {{flex:0.7, alignItems:'center', justifyContent:'center',width:'100%'}}>
                <Image
                style={styles.image}
                source={{uri: 'https://i.hizliresim.com/bsFlwV.png'}}
                />
            </View>


            <View style={{flex:1, justifyContent:'center', alignItems:'center',width:'80%'}}> 
                <TextInput
                    style={styles.textinput}
                    placeholder='Ürün İsmi'
                    placeholderTextColor="gray"
                    onChangeText={(text) => setisim(text)}
                    value={isim}
                />

                <TextInput
                    style={styles.textinput}
                    placeholder='Ürün Fiyatı'
                    placeholderTextColor="gray"
                    onChangeText={(text) => setfiyat(text)}
                    value={fiyat}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Ürün Açıklaması'
                    placeholderTextColor="gray"
                    onChangeText={(text) => setaciklama(text)}
                    value={aciklama}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Resim URL'
                    placeholderTextColor="gray"
                    onChangeText={(text) => setfotolink(text)}
                    value={fotolink}
                />
                
                <GirisKaydolBtn onPress={() =>urunEkle()} text="Ürün Ekle"/>

                <View style={{marginBottom:10}}></View>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'pink',
    },
    
    textinput: {
        flex:1,
        width:'100%',
        backgroundColor: 'white',
        margin:16,
    },
    
    image: {
        flex: 1,
        width: '70%',
        height: '10%',
        resizeMode: 'contain',
       }

})