import React, { useState } from 'react';
import { ScrollView, View, Text, FlatList, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import {globalStyles, paperStyles}  from '../styles/global';
import { getNumeric } from '../utils/numberUtil';
import HomeButton from '../shared/homeButton';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export default function savingsInfo () {
        return (
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              visible={true}
              transparent={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>
      
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
      

          </View>
        );
      };
      
const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
},
textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
},
modalText: {
    marginBottom: 15,
    textAlign: "center"
}
});      