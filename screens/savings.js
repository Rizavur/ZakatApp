import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons'


import { globalStyles } from '../styles/global';

export default function Savings ({navigation}) {
    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {globalStyles.container}>
            <Formik
                initialValues= {{LowestAmt:'', Interest:''}}
            >
            {props => (
                <View>
                        <Text style={globalStyles.savingsHead}>Account 1</Text>
                        <Text style={globalStyles.inputCaption}>Lowest Amount In Year: </Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder='Enter Lowest Amount In Year'
                        keyboardType= 'numeric'
                        />
                        <Text style={globalStyles.inputCaption}>Interest earned: </Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder='Interest'
                        keyboardType= 'numeric'
                        />
                        <FlatButton onPress={props.handleSubmit} text='Calculate' />

                </View>
                )}
            </Formik>
        </View>
        </TouchableWithoutFeedback>

    )}