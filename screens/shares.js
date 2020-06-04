import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { globalStyles } from '../styles/global';

export default function Shares ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;

    const [perUnit, setPerUnit] = useState(appStore.shares.perUnit);
    const [noUnit, setNoUnit] = useState(appStore.shares.noUnit);

    const netShares = (perUnit * noUnit).toFixed(2);
    
    return(
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
            initialValues= {{perUnit: perUnit, noUnit: noUnit}}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Share 1</Text>
                        <Text style={globalStyles.inputCaption}>Market value per unit share of:</Text>
                        <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('perUnit')}
                        value = {perUnit}
                        onChange={(value) => setPerUnit(value.nativeEvent.text)}
                        style={globalStyles.input}
                        placeholder='Market value per unit'
                        keyboardType= 'numeric'
                        />
                        <Text style={globalStyles.inputCaption}>Enter No of units of shares:</Text>
                        <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('noUnit')}
                        value = {noUnit}
                        onChange={(value) => setNoUnit(value.nativeEvent.text)}
                        style={globalStyles.input}
                        placeholder='No of units of shares'
                        keyboardType= 'numeric'
                        />
                        
                        <FlatButton onPress={() => {setAppStore({ ...appStore, shares: {perUnit: (perUnit), noUnit: (noUnit)}});
                                                     navigation.navigate('Home')} } text='Calculate' />
                        <Text style={globalStyles.netAmt}>Net Shares Assets: ${netShares}</Text>
                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}