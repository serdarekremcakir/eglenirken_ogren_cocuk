import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

class GirisKaydolBtn extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}
export default GirisKaydolBtn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText:{
        color:"white",
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#4d0000",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:4,
        marginBottom:4,
        
      },
});