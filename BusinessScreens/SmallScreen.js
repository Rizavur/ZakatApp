import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Slider } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import * as yup from 'yup';
import { getNumeric } from '../utils/numberUtil';
import { IconButton, Colors } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';
import _ from 'lodash';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';

export default function SmallScreen ({ route, navigation }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.small);
    const [ownership, setOwnership] = useState(appStore.business.ownership.small);

    //AMOUNT object
    const fields = {
        // AMOUNT ACA
        addCurrentAssets: [
        {
            text: 'Cash',
            placeholder: 'Cash in Hand',
            tag: 'cash',
        },
        {
            text: 'Bank Balance',
            placeholder: 'Bank Balance',
            tag: 'bank',
        },
        {
            text: 'Closing Stock',
            placeholder: 'Closing Stock',
            tag: 'stock',
        },
        {
            text: 'Trade Debtors',
            placeholder: 'Trade Debtors',
            tag: 'debtors',
        },
        {
            text: 'Others',
            placeholder: 'Others',
            tag:'amountACAothers',
        }],

        // AMOUNT LCL
        lessCurrentLiabilities: [
        {
            text: 'Trade Creditors',
            placeholder: 'Trade Creditors',
            tag: 'creditors',
        },
        {
            text: 'Accrued Operating Expenses',
            placeholder: 'Accrued Operating Expenses',
            tag: 'operatingExpenses',
        },
        {
            text: 'Others',
            placeholder: 'Others',
            tag: 'amountLCLothers',
        }]
    }

    //ADJUSTMENTS object
    const Adjustments = {
        //ADJUSTMENTS ACA
        addCurrentAssets: [
            {
                text: 'Donation in the last quarter',
                placeholder: 'Donation in the last quarter',
                tag: 'donation',

            },
            {
                text: 'Personal drawings',
                placeholder: 'Personal drawings',
                tag: 'personal',
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsACAothers',
            }
        ],
        
        //ADJUSTMENTS LCA
        LessCurrentAssets: [
            {
                text: 'Obsolete stock',
                placeholder: 'Obsolete stock',
                tag: 'adjustmentStock',
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsLCAothers',
            }
        ]
    } 

    const AddCurrentAssets = (props) => {
        return fields.addCurrentAssets.map((element, key) => {
            return (
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = {element.text}
                        name={element.tag}
                        value = {businessValue.amountACA[element.tag]}
                        onChangeText={props.handleChange(element.tag)}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}                        
                        onChange={(value) => {
                            setBusinessValue({
                                ...businessValue,
                                amountACA: {
                                    ...businessValue.amountACA,
                                    [element.tag] : value.nativeEvent.text
                                }
                            })
                        }}
                    />
                </View>
            )
        })
    }

    const LessCurrentLiabilities = (props) => {
        return fields.lessCurrentLiabilities.map((element, key) => {
            return (
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = {element.text}
                        name={element.tag}
                        value = {businessValue.amountLCL[element.tag]}
                        onChangeText={props.handleChange(element.tag)}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}                        
                        onChange={(value) => {
                        setBusinessValue({
                            ...businessValue,
                            amountLCL: {
                                ...businessValue.amountLCL,
                                [element.tag] : value.nativeEvent.text
                                }
                            })
                        }}
                    />
                </View>
            )
        })
    }

    const AdjustmentAssets = (props) => {
        return Adjustments.addCurrentAssets.map((element, key) => {
            return(
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = {element.text}
                        name={element.tag}
                        onChangeText={props.handleChange(element.tag)}
                        value = {businessValue.adjustmentsACA[element.tag]}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => {
                        setBusinessValue({
                            ...businessValue,
                            adjustmentsACA: {
                                ...businessValue.adjustmentsACA,
                                [element.tag] : value.nativeEvent.text
                            }
                        })
                    }}
                    />
                </View>
            )
        })

       
    }

    const AdjustmentsLess = (props) => {
        return Adjustments.LessCurrentAssets.map((element, key) => {
            return(
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = {element.text}
                        name={element.tag}
                        onChangeText={props.handleChange(element.tag)}
                        value = {businessValue.adjustmentsLCA[element.tag]}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => {
                        setBusinessValue({
                            ...businessValue,
                            adjustmentsLCA: {
                                ...businessValue.adjustmentsLCA,
                                [element.tag] : value.nativeEvent.text
                            }
                        })
                    }}
                    />
                </View>
            )
        })
    }

    const getTotal = (amountInputs) => {
        let total = 0;
        Object.keys(amountInputs).forEach(key => {
            total += getNumeric(amountInputs[key]);
        });
        return total;
    };

    const getBusinessNet = () => {

        return getTotal(businessValue.amountACA)
               - getTotal(businessValue.amountLCL)
               + getTotal(businessValue.adjustmentsACA)
               - getTotal(businessValue.adjustmentsLCA);
    }

    console.log(businessValue);

    const businessSmallNet = (getBusinessNet()).toFixed(2);
    const businessSmallZakat = ((businessSmallNet)/100 * 2.5).toFixed(2);

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
            {setBusinessValue({
                amountACA: {
                    cash: '',
                    bank: '',
                    stock: '',
                    debtors: '',
                    amountACAothers: '',
                },
                amountLCL: {
                    creditors: '',
                    operatingExpenses: '',
                    amountLCLothers: '',
                },
                adjustmentsACA: {
                    donation: '',
                    personal: '',
                    adjustmentsACAothers: '',
                },
                adjustmentsLCA: {
                    adjustmentStock: '',
                    adjustmentsLCAothers: '',
                }}
            ); setAppStore({ 
                ...appStore, 
                business: {
                    ...appStore.business,
                    ownership: {
                        ...appStore.business.ownership,
                        small: 100
                    },
                    small: { 
                            amountACA: {
                                cash: '',
                                bank: '',
                                stock: '',
                                debtors: '',
                                amountACAothers: '',
                            },
                            amountLCL: {
                                creditors: '',
                                operatingExpenses: '',
                                amountLCLothers: '',
                            },
                            adjustmentsACA: {
                                donation: '',
                                personal: '',
                                adjustmentsACAothers: '',
                            },
                            adjustmentsLCA: {
                                adjustmentStock: '',
                                adjustmentsLCAothers: '',
                            }
                        }
                 },
                results: {
                    ...appStore.results,
                    businessSmall: {
                        net: 0,
                        zakat: 0
                    },
                }
            })}}
      ],
      { cancelable: false }
    );

    return(
    <View style = {globalStyles.container}>
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView>
            <Formik
                initialValues= {{
                    ...businessValue.amountACA,
                    ...businessValue.amountLCL,
                    ...businessValue.adjustmentsACA,
                    ...businessValue.adjustmentsLCA,
                    ownership: ownership
                }}
            >
            {props => (
                <View style = {globalStyles.container}>
                    <View style={{backgroundColor: '#454b54', borderRadius: 20, marginHorizontal: 20, marginTop: 15}}>
                        <Text style={globalStyles.savingsHead}>Muslim Ownership {ownership}%</Text>
                        <Slider
                        style={{ width: 300, alignSelf: 'center'}}
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        value= {ownership}
                        onValueChange={_.debounce(((ownership) => setOwnership(ownership)), 33)}
                        />
                    </View>

                        <Text style={globalStyles.savingsHead}>Amount For The Year</Text>
                        <Accordion 
                        title= 'Add Current Assets' 
                        value = {getTotal(businessValue.amountACA)} 
                        height = {400} 
                        form={AddCurrentAssets(props)} />
                        <Accordion 
                        title ='Less Current Liabilities' 
                        value={getTotal(businessValue.amountLCL)} 
                        height={245} 
                        form={LessCurrentLiabilities(props)}/>
                
                        <Text style={globalStyles.savingsHead}>Adjustments</Text>
                        <Accordion 
                        title='Add Current Assets' 
                        value={getTotal(businessValue.adjustmentsACA)} 
                        height={245} 
                        form={AdjustmentAssets(props)}/>
                        <Accordion 
                        title='Less Current Assets' 
                        value={getTotal(businessValue.adjustmentsLCA)} 
                        height={170} 
                        form={AdjustmentsLess(props)}/>
                </View>
            )}
            </Formik>  
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
                    business: {...appStore.business,
                                ownership: {
                                    ...appStore.business.ownership,
                                    small: ownership,
                                    },
                                small: businessValue},
                    results: {
                        ...appStore.results,
                        businessSmall: {
                            net: businessSmallNet*(ownership/100),
                            zakat: businessSmallZakat,
                        }
                    }
                    });
                    route.params.navigate('Home')}} 
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