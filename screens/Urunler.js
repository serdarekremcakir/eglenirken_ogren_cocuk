import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image, TouchableOpacity, FlatList, YellowBox
} from "react-native";
import firebase from '../Firebase';


export default function Urunler({ navigation }) {
    const [haha, sethaha] = useState(true);
    const [urunler, seturunler] = useState([]);

    useEffect(() => {

        const marketcollection = firebase.firestore().collection('market')
        marketcollection.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                urunler.push(documentSnapshot.data())
            });
            sethaha(false);
        });


    }, [])

    const Sil = (id) => {
        const marketcollection = firebase.firestore().collection('market')
        marketcollection.doc(id).delete();
        seturunler(urunler.filter((current) => {
            return current.id != id;
        }));
    }

    /*const Yenile = () =>{
            sethaha(true);
    }*/




    const renderurun = (urun) => (
        <View style={styles.container}>
            <View style={{ flex: 1, width: "100%", flexDirection: 'row', backgroundColor: 'lightgray' }}>
                <View style={{ flex: 2 }}>
                    <Text>{urun.id}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text>{urun.isim}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{urun.aciklama}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Text>{urun.fiyat}</Text>
                </View>
                <View style={styles.dikcizgi}></View>
                <View style={{ flex: 2 }}>
                    <Image
                        source={{ uri: urun.fotolink }}
                        //source={require('../images/urun1.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: "stretch"
                        }} />

                </View>
                <View style={styles.dikcizgi}></View>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { Sil(urun.id);  /*Yenile();*/ }

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
                            <Text>ID</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Isim</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Aciklama</Text>
                        </View>
                        <View style={styles.dikcizgi}></View>
                        <View style={styles.container2}>
                            <Text>Fiyat</Text>
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
                        data={urunler}
                        keyExtractor={item => item.id}
                        style={{ flex: 1, }}
                        renderItem={({ item }) => renderurun(item)}
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