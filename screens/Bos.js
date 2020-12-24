import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Bos extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Bos sayfaaaa</Text>
            </View>
        );
    }
}
export default Bos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});