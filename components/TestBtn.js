import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TestBtn = ({dsb=false, xx='white',text, onPress = () => {} }) => (
  <TouchableOpacity disabled={dsb} onPress={onPress} style={[styles.button,{backgroundColor:xx}]}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default TestBtn;


const styles = StyleSheet.create({
    button: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20
    },
    text: {
      color: "black",
      fontSize: 20,
      textAlign: "center"
    },
  });