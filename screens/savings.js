import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';


import { globalStyles } from '../styles/global';

export default function Savings ({navigation}) {
    const getNumeric = (stringVal) => {
        if (stringVal && stringVal !== ''){
            return parseInt(stringVal);
        }
        return 0;
    }
    
    const { setAppStore, appStore } = navigation.state.params;
    const [lowestAmt, setLowestAmt] = useState(appStore.savings.lowestAmt);
    const [interest, setInterest] = useState(appStore.savings.interest);
    const savingsZakat = getNumeric(lowestAmt) - getNumeric(interest);


    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
                initialValues= {{lowestAmt: lowestAmt, interest: interest }}
            >
            {props => (
                <View>
                        <Text style={globalStyles.savingsHead}>Account 1</Text>
                        <Text style={globalStyles.inputCaption}>Lowest Amount In Year: </Text>
                        <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('lowestAmt')}
                        value = {lowestAmt}
                        style={globalStyles.input}
                        placeholder='Enter lowest amount in year'
                        keyboardType= 'numeric'
                        onChange={(value) => setLowestAmt(value.nativeEvent.text)}
                        />
                        <Text style={globalStyles.inputCaption}>Interest earned: </Text>
                        <TextInput
                        clearTextOnFocus
                        value = {interest}
                        onChange={(value) => setInterest(value.nativeEvent.text)}
                        style={globalStyles.input}
                        placeholder='Enter interest earned in year'
                        keyboardType= 'numeric'
                        />
                        <FlatButton onPress={() => {setAppStore({ ...appStore, savings: {lowestAmt: (lowestAmt), interest: (interest)}});
                                                     navigation.navigate('Home')} } text='Calculate' />
                        <Text style={globalStyles.netAmt}>Net Savings: ${savingsZakat}</Text>
                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>

    )}