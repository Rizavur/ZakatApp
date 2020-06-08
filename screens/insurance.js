import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';

export default function Insurance ({navigation}) {
    const { setAppStore, appStore } = navigation.state.params;

    const [surrender, setSurrender] = useState(appStore.insurance.surrender)

    const insuranceNet = (getNumeric(surrender)).toFixed(2);
    const insuranceZakat = ((insuranceNet)/100 * 2.5).toFixed(2);

    return(
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
            initialValues = {{surrender: surrender}}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Insurance</Text>
                        <Text style={globalStyles.inputCaption}>Enter surrender value:</Text>
                        <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('surrender')}
                        value = {surrender}
                        onChange={(value) => setSurrender(value.nativeEvent.text)}
                        style={globalStyles.input}
                        placeholder='Surrender value'
                        keyboardType= 'numeric'
                        />
                        
                        <FlatButton onPress={() => {
                            setAppStore(
                                { ...appStore, 
                                insurance: {surrender: surrender},
                                results: {
                                    ...appStore.results,
                                    insurance: {
                                        net: insuranceNet,
                                        zakat: insuranceZakat,
                                    }
                                }
                                });
                                navigation.navigate('Home')} } 
                                text='Calculate' 
                        />
                        <Text style={globalStyles.netAmt}>Net Insurance Assets: ${insuranceNet}</Text>
                        <Text style={globalStyles.netAmt}>Insurance Zakat: ${insuranceZakat}</Text>
                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}