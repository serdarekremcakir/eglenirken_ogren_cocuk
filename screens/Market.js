import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image, TouchableOpacity, FlatList
} from "react-native";
import firebase from '../Firebase';
import GirisKaydolBtn from '../components/GirisKaydolBtn';

export default function Market({navigation}){
    const [haha, sethaha] = useState(true);
    const [esyalar, setesyalar] = useState([]);
    const [refresh, setrefresh] = useState(true);

    useEffect(() => {
      const marketcollection = firebase.firestore().collection('market')
      marketcollection.get()
      .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        esyalar.push(documentSnapshot.data())
      });

      console.log('asdsasds');
      sethaha(false);
      console.log('2133323');
    });
    }, [])



    
    const renderurun = (urun) => (
        <View style={styles.cardview}>
            <View style={{ flex: 4 ,width: '100%', height:'100%'}}>
              <Image
              source={{uri: urun.fotolink}}
              //source={{uri: "https://i.hizliresim.com/Ektc07.jpg"}}
              //source={require('../images/urun1.jpg')}
              style={{
                  width: '100%',
                  height: '100%',
                  resizeMode:"stretch"}}/>
            </View>

            <View style={styles.isimview}>
              <Text style={{textAlign:'center',fontWeight: 'bold', flexShrink:1, textDecorationLine:'underline'}}>{urun.isim}  isim</Text>
            </View>
    
            <View style={styles.aciklamaview}>
              <Text style={{ fontSize: 15, textAlign:'center' }}>{urun.aciklama} aciklama</Text>
            </View>
    
            <View style={{flex:1,flexDirection:'row',borderTopWidth:2}}>
                <View style={styles.paraview}>
                    <Text style={{ fontSize: 15 }}>{urun.fiyat}</Text>
                    <Image source= {{uri:"https://i.hizliresim.com/dlzg110.png"}}
                    style={{width:20,height:20,marginLeft:3}}/>
                </View>
                
                <View style={styles.satinalview}>
                    <TouchableOpacity onPress={() => navigation.navigate('Siparis', { id: urun.id, isim: urun.isim,  aciklama: urun.aciklama ,fiyat: urun.fiyat, fotolink: urun.fotolink})} 
                    style={styles.satinalbtn}>
                        <Text style={{textAlign:'center'}}>Satın Al</Text>
                        <Image
                        source={require('../images/sepetAdd.png')}
                        style={{height:15,width:20,paddingBottom:7}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      );


    return (
        <View style={{ flex: 1}}>
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#e2e2e2'}}>
                        <FlatList
                        data={esyalar}
                        numColumns={2}
                        keyExtractor={item =>  item.id}
                        style={{ flex:1,}}
                        renderItem={({item}) => renderurun(item)}
                        scrollEnabled={false}/>
                </View>
            </ScrollView>
        </View>
        );
}

const styles = StyleSheet.create({


    cardview:{
        flex: 1/2,
        height: 250, 
        marginHorizontal: 15, 
        marginVertical: 15,
        borderWidth: 3,
        flexDirection:'column',

    },

    isimview:{
        flex:0.8,
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 7, 
    },

    aciklamaview:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 7, 
        marginBottom: 7,
    },

    paraview:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },

    satinalview:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end' 
    },

    satinalbtn: {
        flex:1,
        flexDirection:'column',
        borderLeftWidth: 3,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:'100%',
        borderRadius:30,
        padding:5
    }
});