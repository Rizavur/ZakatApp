// import React, { useState } from "react";
// import Text, {NativeModules} from 'react-native';
// import { View } from "react-native-animatable";
// import FlatButton from "./buttons";

// const styles = {
//     accordionSection: {
//         flex: 1,
//       },
    
//       accordionTitle: {
//         fontSize: 14,
//         textAlign: 'left',
//         },
     
//       accordionContent: {
//         backgroundColor: 'white',
//         overflow: 'auto'
//       }
      
// }

// function Accordion(props) {
//   const [setActive, setActiveState] = useState(false);
//   const [setHeight, setHeightState] = useState(0);
//   const [setRotate, setRotateState] = useState("accordion__icon");

//   function toggleAccordion() {
//     setActiveState(setActive === true ? false : true);
//     setHeightState(
//       setActive === false ? 0 : 500;
//     );
//     console.log(setHeight);
//     setRotateState(
//       setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
//     );
//   }

//   return (
//     <View style={styles.accordionSection}>
//       <FlatButton onPress={toggleAccordion}>
//         <Text style={{...styles.accordionTitle, maxHeight: 500}}>{props.title}</Text>
//       </FlatButton>
//     </View>
//   );
// }

// export default Accordion;


import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function Accordion(props) {
  const [active, setActiveState] = useState(false);
  const [height, setHeight] = useState(0);

  function toggleAccordion() {
    setActiveState( active === false ? true : false);
    setHeight(active === true ? 0 : 200);
  }

  const show = () => {
    return (active === true? <View style={[styles.content, {height:height}]}>{form2}</View> : null);
  }

  const form2 = props.form;
  console.log(form2);

  return (
    <TouchableOpacity onPress={toggleAccordion}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
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
    backgroundColor: 'rgb(25, 25, 112)',
    marginLeft: 8,
    marginRight: 8,
    opacity: 70,
  },
  buttonText: {
    marginVertical: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    height: 30
  },
  content: {
    height: 0,
    backgroundColor: 'blue',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  }
});
