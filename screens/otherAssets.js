import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import { getNumeric } from '../utils/numberUtil';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';
import { IconButton, Colors } from 'react-native-paper';

export default function OtherAssets ({navigation}) {
    const { setAppStore, appStore } = navigation.state.params;

    const [goldWeight, setGoldWeight] = useState(appStore.gold.weight);
    const [goldValue, setGoldValue] = useState(appStore.gold.value);

    const [silverWeight, setSilverWeight] = useState(appStore.silver.weight);
    const [silverValue, setSilverValue] = useState(appStore.silver.value);
    
    const [surrender, setSurrender] = useState(appStore.insurance.surrender);

    const [othersAdd, setOthersAdd] = useState(appStore.others.add);
    const [othersMinus, setOthersMinus] = useState(appStore.others.minus);
    
    const goldNet = (getNumeric(goldWeight) * goldValue).toFixed(2);
    const goldZakat = ((goldNet)/100 *2.5).toFixed(2);
    
    const silverNet = (getNumeric(silverWeight) * silverValue).toFixed(2);
    const silverZakat = ((silverNet)/100 *2.5).toFixed(2);

    const insuranceNet = (getNumeric(surrender)).toFixed(2);
    const insuranceZakat = ((insuranceNet)/100 * 2.5).toFixed(2);

    const othersNet = (getNumeric(othersAdd) - getNumeric(othersMinus)).toFixed(2);
    const othersZakat = (getNumeric(othersNet)/100 *2.5).toFixed(2);


    const goldForm = () => {
        return(
            <View>
                <Formik
                    initialValues= {{goldWeight, goldValue}}
                    >
                    {props => (
                        <View>
                                <Text style={globalStyles.inputCaptionAccordion}>Market Value (per gram):</Text>
                                <TextInput
                                onChangeText={props.handleChange('value')}
                                value = {goldValue}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Market value per gram'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setGoldValue(value.nativeEvent.text)}
                                />
                                <Text style={globalStyles.inputCaptionAccordion}>Weight (in grams) :</Text>
                                <TextInput
                                onChangeText={props.handleChange('weight')}
                                value = {goldWeight}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Weight in grams'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setGoldWeight(value.nativeEvent.text)}
                                />
                        </View>
                        )}
                    </Formik>
                </View>
        )
    }

    const silverForm = () => {
        return(
            <View>
                <Formik
                    initialValues= {{silverWeight, silverValue}}
                    >
                    {props => (
                        <View>
                                <Text style={globalStyles.inputCaptionAccordion}>Market Value (per gram):</Text>
                                <TextInput
                                onChangeText={props.handleChange('value')}
                                value = {silverValue}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Market value per gram'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setSilverValue(value.nativeEvent.text)}
                                />
                                <Text style={globalStyles.inputCaptionAccordion}>Weight (in grams) :</Text>
                                <TextInput
                                onChangeText={props.handleChange('weight')}
                                value = {silverWeight}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Weight in grams'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setSilverWeight(value.nativeEvent.text)}
                                />
                        </View>
                        )}
                    </Formik>
                </View>
        )
    }

    const insuranceForm = () => {
        return(
            <View>
                <Formik
                initialValues = {{surrender: surrender}}
                >
                {props => (
                    <View>
                            <Text style={globalStyles.inputCaption}>Surrender value:</Text>
                            <TextInput
                            clearTextOnFocus
                            onChangeText={props.handleChange('surrender')}
                            value = {surrender}
                            onChange={(value) => setSurrender(value.nativeEvent.text)}
                            style={globalStyles.input}
                            placeholder='Surrender value'
                            placeholderTextColor={Colors.grey800}
                            keyboardType= 'numeric'
                            />
                    </View>
                    )}
                </Formik>
            </View>
        )
    }

    const othersForm = () => {
        return(
            <View>
                <Formik
                    initialValues= {{othersAdd, othersMinus}}
                    >
                    {props => (
                        <View>
                                <Text style={globalStyles.inputCaptionAccordion}>Add:</Text>
                                <TextInput
                                onChangeText={props.handleChange('value')}
                                value = {othersAdd}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Other Assets'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setOthersAdd(value.nativeEvent.text)}
                                />
                                <Text style={globalStyles.inputCaptionAccordion}>Minus:</Text>
                                <TextInput
                                onChangeText={props.handleChange('weight')}
                                value = {othersMinus}
                                clearTextOnFocus
                                style={globalStyles.input}
                                placeholder='Other Liabilities'
                                placeholderTextColor={Colors.grey800}
                                keyboardType= 'numeric'
                                onChange={(value) => setOthersMinus(value.nativeEvent.text)}
                                />
                        </View>
                        )}
                    </Formik>
                </View>
        )
    }

    const confirmation = () =>
    Alert.alert(
      "Reset Small Business",
      "Delete all inputs in small business?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress:  () =>
            {setGoldValue('0'); setGoldWeight('0');
            setSilverValue('0');setSilverWeight('0');
            setSurrender('0');
            setOthersAdd('0');setOthersMinus('0'); 
            setAppStore({ 
                ...appStore, 
                gold: {
                    weight: '',
                    value: ''
                },
                silver: {
                    weight: '',
                    value: ''
                },
                insurance: {
                    surrender: '',
                },
                others: {
                    add: '',
                    minus: ''
                },
                results: {
                    ...appStore.results,
                    gold: {
                        net: 0,
                        zakat: 0
                    },
                    silver: {
                        net: 0,
                        zakat: 0
                    },
                    insurance: {
                        net: 0,
                        zakat: 0
                    },
                    others: {
                        net: 0,
                        zakat: 0
                    }
                }
            })}}
      ],
      { cancelable: false }
    );

    return(
    <View style = {globalStyles.container}>
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
            <ScrollView>
                <Accordion title={'Gold'} height={200} value={goldNet} form={goldForm()}/>
                <Accordion title={'Silver'} height={200} value={silverNet} form={silverForm()}/>
                <Accordion title={'Insurance'} height={100} value={insuranceNet} form={insuranceForm()}/>
                <Accordion title={'Others'} height={200} value={othersNet} form={othersForm()}/>
            </ScrollView>
        </TouchableWithoutFeedback>
        <IconButton
                icon="check"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 10, right: 10}}
                onPress={() => {
                setAppStore(
                    { ...appStore, 
                    gold: {
                        weight: goldWeight,
                        value: goldValue,
                        },
                    silver: {
                        weight: silverWeight,
                        value: silverValue,
                        },
                    insurance: {
                        surrender: surrender,
                        },
                    others: {
                        add: othersAdd,
                        minus: othersMinus,
                        },
                    results: {
                        ...appStore.results,
                        gold: {
                            net: goldNet,
                            zakat: goldZakat,
                        },
                        silver: {
                            net: silverNet,
                            zakat: silverZakat,
                        },
                        insurance: {
                            net: insuranceNet,
                            zakat: insuranceZakat,
                        },
                        others: {
                            net: othersNet,
                            zakat: othersZakat,
                        }
                    }
                    });
                    navigation.navigate('Home')}} 
            />
            <IconButton
                icon="delete-outline"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 90, right: 10}}
                onPress={confirmation}
            />
    </View>
    )}