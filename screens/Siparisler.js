import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image, TouchableOpacity, FlatList, YellowBox
} from "react-native";
import firebase from '../Firebase';


export default function Market({ navigation }) {
    const [haha, sethaha] = useState(true);
    const [siparisler, setsiparisler] = useState([]);

    useEffect(() => {

        const sipariscollection = firebase.firestore().collection('siparis')
        sipariscollection.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                siparisler.push(documentSnapshot.data())
            });
            sethaha(false);
        });


    }, [])

    const Sil = (siparisid) => {
        const sipariscollection = firebase.firestore().collection('siparis')
        sipariscollection.doc(siparisid).delete();
        setsiparisler(siparisler.filter((currnet) => {
            console.log(currnet);
            return currnet.siparisid != siparisid;
        }));
    }

    /*const Yenile = () =>{
            sethaha(true);
    }*/




    const rendersiparis = (siparis) => (
        <View style={styles.container}>
            <View style={{ flex: 1, width: "100%", flexDirection: 'row', backgroundColor: 'lightgray' }}>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.siparisid}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text>{siparis.kisiuid}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.kisiad}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.kisiemail}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.kisiadres}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.urunid}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.urunisim}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{siparis.urunfiyat}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Image
                        source={{ uri: siparis.urunfotolink }}
                        //source={require('../images/urun1.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: "stretch"
                        }} />

                </View>
                <View style={styles.dikcizgi}></View>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { Sil(siparis.siparisid);  /*Yenile();*/ }

                    } style={styles.button}>
                        <Text style={styles.buttonyazi}>SİL</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );


    return (
        <View style={{ flex: 1 }}>
            <ScrollView horizontal={true}>
                <View style={{ flex: 1, flexDirection: 'column', borderWidth: 3 }}>
                    <View style={{ width: "100%", flexDirection: 'row' }}>

                        <View style={styles.container2}>
                            <Text>Siparis ID</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Musteri ID</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Musteri İsim</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Musteri Mail</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Musteri Adres</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Ürün ID</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Ürün İsim</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Ürün Fiyat</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Ürün Foto</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={{ flex: 1 }}>

                        </View>

                    </View>
                    <FlatList
                        data={siparisler}
                        keyExtractor={item => item.id}
                        style={{ flex: 1, }}
                        renderItem={({ item }) => rendersiparis(item)}
                    />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
    },
    container2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },


    button: {
        backgroundColor: '#90EE90',
        height: '100%',
        width: '100%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },

    buttonyazi: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },

    dikcizgi: {
        height: '100%',
        width: 1,
        backgroundColor: 'black',
    },


});