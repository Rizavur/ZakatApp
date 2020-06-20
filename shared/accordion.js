import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button } from 'react-native';
import { Colors } from 'react-native-paper';
import FlatButton from '../shared/buttons';

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
        <Text style={styles.buttonText}>{props.title}</Text>
        {props.value === undefined ? undefined : <Text style={styles.accordionTotal}>${props.value}</Text> }
        {props.remove === true ? (<FlatButton text='Remove' onPress={props.doRemove}/>) : undefined }
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
    backgroundColor: Colors.blue900,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    marginVertical: 15,
    fontFamily: 'oswaldBold',
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    height: 30
  },
  content: {
    height: 0,
    backgroundColor: '#92cdf7',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  accordionTotal: {
    color: 'white',
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 10,
    fontSize: 16,
  },
});
