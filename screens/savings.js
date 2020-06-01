import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';

import Home from './home';


import { globalStyles } from '../styles/global';
import { call } from 'react-native-reanimated';
import { ThemeContext } from 'react-navigation';

export default function Savings ({navigation}) {
    const [lowestAmt, setLowestAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const { callback } = navigation.state.params;

    const savingsZakat = ((lowestAmt - interest)/100) * 2.5;

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {globalStyles.container}>
            <Formik
                initialValues= {{LowestAmt:0, Interest:0}}
            >
            {props => (
                <View>
                        <Text style={globalStyles.savingsHead}>Account 1</Text>
                        <Text style={globalStyles.inputCaption}>Lowest Amount In Year: </Text>
                        <TextInput
                        //onChangeText={props.handleChange('LowestAmt')}
                        //value={props.values.LowestAmt}
                        style={globalStyles.input}
                        placeholder='Enter lowest amount in year'
                        keyboardType= 'numeric'
                        onChange={(value) => setLowestAmount(value.nativeEvent.text)}
                        />
                        <Text style={globalStyles.inputCaption}>Interest earned: </Text>
                        <TextInput
                        onChange={(value) => setInterest(value.nativeEvent.text)}
                        style={globalStyles.input}
                        placeholder='Enter interest earned in year'
                        keyboardType= 'numeric'
                        />
                        <FlatButton onPress={() => {callback(savingsZakat); navigation.navigate('Home')} } text='Calculate' />

                </View>
                )}
            </Formik>
        </View>
        </TouchableWithoutFeedback>

    )}