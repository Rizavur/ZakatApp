import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';

export default function Gold ({navigation}) {
    const { setAppStore, appStore } = navigation.state.params;
    const [weight, setWeight] = useState(appStore.gold.weight);
    const [value, setValue] = useState(appStore.gold.value);

    const goldNet = (getNumeric(weight) * value).toFixed(2);
    const goldZakat = ((goldNet)/100 *2.5).toFixed(2);

    return(
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
            initialValues= {{weight, value}}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.inputCaption}>MARKET VALUE OF GOLD(g):</Text>
                        <TextInput
                        onChangeText={props.handleChange('value')}
                        value = {value}
                        clearTextOnFocus
                        style={globalStyles.input}
                        placeholder='Market value per gram'
                        keyboardType= 'numeric'
                        onChange={(value) => setValue(value.nativeEvent.text)}
                        />
                        <Text style={globalStyles.inputCaption}>WEIGHT OF GOLD BAR/JEWELLERY:</Text>
                        <TextInput
                        onChangeText={props.handleChange('weight')}
                        value = {weight}
                        clearTextOnFocus
                        style={globalStyles.input}
                        placeholder='Weight in grams'
                        keyboardType= 'numeric'
                        onChange={(value) => setWeight(value.nativeEvent.text)}
                        />
                        
                        <FlatButton onPress={() => {
                            setAppStore({ ...appStore, gold: {weight, value}, 
                            results: {
                                ...appStore.results,
                                gold: {
                                    net: goldNet, 
                                    zakat: goldZakat
                                    }
                                }
                            });
                            navigation.navigate('Home')} } 
                            text='Calculate' 
                        />
                        <Text style={globalStyles.netAmt}>Net Gold Assets: ${goldNet}</Text>
                        <Text style={globalStyles.netAmt}>Gold Zakat: ${goldZakat}</Text>

                </View>
                )}
            </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}