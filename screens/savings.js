import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, NavigatorIOS } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';

import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';

export default function Savings ({navigation}) {
    
    const { setAppStore, appStore } = navigation.state.params;
    const [lowestAmt, setLowestAmt] = useState(appStore.savings.lowestAmt);
    const [interest, setInterest] = useState(appStore.savings.interest);

    const savingsNet = (getNumeric(lowestAmt) - getNumeric(interest)).toFixed(2);
    const savingsZakat = ((savingsNet)/100 * 2.5).toFixed(2);

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
                        <FlatButton onPress={() => {
                            setAppStore({ 
                                ...appStore, 
                                savings: { lowestAmt, interest}, 
                                results: {
                                    ...appStore.results,
                                    savings: {
                                        net: savingsNet, 
                                        zakat: savingsZakat
                                    }
                                }
                            });
                            navigation.navigate('Home')} } 
                            text='Calculate' 
                        />
                        <Text style={globalStyles.netAmt}>Net Savings: ${savingsNet}</Text>
                        <Text style={globalStyles.netAmt}>Savings Zakat: ${savingsZakat}</Text>
                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>

    )
}