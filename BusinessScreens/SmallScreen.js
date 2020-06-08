import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';

export default function SmallScreen ({ route, navigation }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.small);

    //AMOUNT object
    const fields = {
        // AMOUNT ACA
        addCurrentAssets: [{
            text: 'Cash: ',
            placeholder: 'Cash in Hand',
            tag: 'cash',
            key: 1
        },
        {
            text: 'Bank Balance: ',
            placeholder: 'Bank Balance',
            tag: 'bank',
            key: 2
        },
        {
            text: 'Closing Stock: ',
            placeholder: 'Closing Stock',
            tag: 'stock',
            key: 3
        },
        {
            text: 'Trade Debtors: ',
            placeholder: 'Trade Debtors',
            tag: 'debtors',
            key: 4
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            tag:'amountACAothers',
            key: 5
        }],

        // AMOUNT LCL
        lessCurrentLiabilities: [{
            text: 'Trade Creditors: ',
            placeholder: 'Trade Creditors',
            tag: 'creditors',
            key: 6
        },
        {
            text: 'Accrued Operating Expenses: ',
            placeholder: 'Accrued Operating Expenses',
            tag: 'operatingExpenses',
            key: 7
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            tag: 'amountLCLothers',
            key: 8
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
                key: 9
            },
            {
                text: 'Personal drawings',
                placeholder: 'Personal drawings',
                tag: 'personal',
                key: 10
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsACAothers',
                key: 11
        }],
        
        //ADJUSTMENTS LCA
        LessCurrentAssets: [
            {
                text: 'Obsolete stock',
                placeholder: 'Obsolete stock',
                tag: 'adjustmentStock',
                key: 12
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsLCAothers',
                key: 13
            }
        ]
    } 

   
    const AddCurrentAssets = (props) => {
        return fields.addCurrentAssets.map((element, key) => {
            return (
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.amountACA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
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
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.amountLCL[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
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
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.adjustmentsACA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
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
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.adjustmentsLCA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
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

    const getBusinessNet = () => {
        const getTotal = (amountInputs) => {
            let total = 0;
            Object.keys(amountInputs).forEach(key => {
                total += getNumeric(amountInputs[key]);
            });
            return total;
        };

        return getTotal(businessValue.amountACA)
               - getTotal(businessValue.amountLCL)
               + getTotal(businessValue.adjustmentsACA)
               - getTotal(businessValue.adjustmentsLCA);
    }

    const businessSmallNet = (getBusinessNet()).toFixed(2);
    const businessSmallZakat = ((businessSmallNet)/100 * 2.5).toFixed(2);

    return(
        
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
                initialValues= {{
                    ...businessValue.amountACA,
                    ...businessValue.amountLCL,
                    ...businessValue.adjustmentsACA,
                    ...businessValue.adjustmentsLCA
                }}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Amount For The Year:</Text>

                        <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
                        {AddCurrentAssets(props)}
            
                        <Text style={globalStyles.inputCaption}>(-) Less Currrent Liabilities:</Text>
                        {LessCurrentLiabilities(props)}
                
                        <Text style={globalStyles.savingsHead2}>Adjustments:</Text>
                        <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
                        {AdjustmentAssets(props)}
        
                        <Text style={globalStyles.inputCaption}>(-) Less Current Assets:</Text>
                        {AdjustmentsLess(props)}
                    </View>
            )}
            </Formik>  

            <FlatButton onPress={() => {
                setAppStore(
                    { ...appStore, 
                    business: {small: businessValue },
                    results: {
                        ...appStore.results,
                        businessSmall: {
                            net: businessSmallNet,
                            zakat: businessSmallZakat,
                        }
                    }
                    });
                    route.params.navigate('Home')}} 
                    text='Calculate' />
            <Text style={globalStyles.netAmt}>Net Business Assets: ${businessSmallNet}</Text>
            <Text style={globalStyles.netAmt}>Business Zakat: ${businessSmallZakat}</Text>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}