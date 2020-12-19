import React from 'react';
import { StyleSheet,View, TouchableHighlight, Image, TouchableOpacity, Text } from 'react-native';


const Card = ({ link,text, onPress = () => {} }) => (
    <View style = {{borderWidth:1, borderColor:'gray', }}>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={onPress} >
            <Image style={styles.imageStyle} source={{uri: link}}/>
            <View style = {{borderWidth:1,  borderColor:'black',width:150}}>
            <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
        
    </View>
  );
  
  export default Card;


const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	},
	imageStyle:{
		width:150,
    height:150,
    resizeMode:'stretch',
  
    },
    
      text: {
        color: "black",
        fontSize: 15,
        textAlign: "center",
        fontWeight: 'bold',
      },
});