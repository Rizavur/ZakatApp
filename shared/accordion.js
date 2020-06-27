import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import FlatButton from '../shared/buttons';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

export default function Accordion(props) {
  const [active, setActiveState] = useState(false);
  const [height, setHeight] = useState(0);
  const [remove, setRemove] = useState(false);

  function toggleAccordion() {
    setActiveState( active === false ? true : false);
    setHeight(active === true ? 0 : props.height);
  }

  const show = () => {
    return (active === true? <View style={[styles.content, {height:height}]}>{form2}</View> : null);
  }

  const form2 = props.form;
    
  return (
    <TouchableOpacity onPress={toggleAccordion}>
      <View style={styles.button}>
        {/* {props.title === undefined? <FilledTextField
                        baseColor = 'black'
                        tintColor = 'blue'
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}                        
                    /> :<Text style={styles.buttonText}>{props.title}</Text>} */}
        <Text style={styles.buttonText}>{props.title}</Text>
        {props.value === undefined ? undefined : <Text style={styles.accordionTotal}>${props.value}</Text> }
        {props.remove === true ? (<Text style={{position: "absolute", right:5, color: 'red', paddingVertical: 20, paddingHorizontal: 10}} onPress={props.doRemove}>Delete</Text>) : undefined }
        {show()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#a6b1e1',
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    marginVertical: 15,
    fontFamily: 'roboto',
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    height: 30
  },
  content: {
    height: 0,
    backgroundColor: '#d5ccff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  accordionTotal: {
    color: 'black',
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 10,
    fontSize: 16,
  },
});
