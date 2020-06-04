import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { globalStyles } from '../styles/global';

export default function Gold ({navigation}) {
    const getNumeric = (stringVal) => {
        if (stringVal && stringVal !== ''){
            return parseInt(stringVal);
        }
        return 0;
    }

    const { setAppStore, appStore } = navigation.state.params;
    const [weight, setWeight] = useState(appStore.gold.weight);
    const goldVal = (80.24 * getNumeric(weight)).toFixed(2);

    return(
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
            initialValues= {{weight: weight}}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Market Price of Gold: $80.24 /g</Text>
                        <Text style={globalStyles.inputCaption}>Weight of Gold bar/jewellery:</Text>
                        <TextInput
                        onChangeText={props.handleChange('weight')}
                        value = {weight}
                        clearTextOnFocus
                        style={globalStyles.input}
                        placeholder='Weight in grams'
                        keyboardType= 'numeric'
                        onChange={(value) => setWeight(value.nativeEvent.text)}
                        />
                        
                        <FlatButton onPress={() => {setAppStore({ ...appStore, gold: {weight: (weight)}});
                                                     navigation.navigate('Home')} } text='Calculate' />
                        <Text style={globalStyles.netAmt}>Net Gold Assets: ${goldVal}</Text>
                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}