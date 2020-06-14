
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 6,
    backgroundColor: '#7FFFD4',
    marginLeft: 20,
    marginRight: 20,
    opacity: 70,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }
});