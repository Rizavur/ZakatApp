import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import * as yup from 'yup';
import { getNumeric } from '../utils/numberUtil';
import { IconButton, Colors } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';

export default function SmallScreen ({ route, navigation }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.small);

    //AMOUNT object
    const fields = {
        // AMOUNT ACA
        addCurrentAssets: [
        {
            text: 'Cash: ',
            placeholder: 'Cash in Hand',
            tag: 'cash',
        },
        {
            text: 'Bank Balance: ',
            placeholder: 'Bank Balance',
            tag: 'bank',
        },
        {
            text: 'Closing Stock: ',
            placeholder: 'Closing Stock',
            tag: 'stock',
        },
        {
            text: 'Trade Debtors: ',
            placeholder: 'Trade Debtors',
            tag: 'debtors',
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            tag:'amountACAothers',
        }],

        // AMOUNT LCL
        lessCurrentLiabilities: [
        {
            text: 'Trade Creditors: ',
            placeholder: 'Trade Creditors',
            tag: 'creditors',
        },
        {
            text: 'Accrued Operating Expenses: ',
            placeholder: 'Accrued Operating Expenses',
            tag: 'operatingExpenses',
        },
        {
            text: 'Others: ',
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
                <View>
                    <Text style={globalStyles.inputCaptionAccordion}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.amountACA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    placeholderTextColor={Colors.grey800}
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
                    <Text style={globalStyles.inputCaptionAccordion}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.amountLCL[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    placeholderTextColor={Colors.grey800}
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
                    <Text style={globalStyles.inputCaptionAccordion}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.adjustmentsACA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    placeholderTextColor={Colors.grey800}
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
                    <Text style={globalStyles.inputCaptionAccordion}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.adjustmentsLCA[element.tag]}
                    onChangeText={props.handleChange(element.tag)}
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    placeholderTextColor={Colors.grey800}
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
    const [ownership, setOwnership] = useState('100%');

    const ownershipSchema = yup.object({
        ownership: yup.string()
          .required('Required')
          .test('is-num-1-100', 'Percentage must be between 1 - 100', (val) => {
            return parseInt(val) <= 100 && parseInt(val) > 0;
          })
        })
   

    return(
    <View style = {globalStyles.container}>
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView>
            {/* <Formik
                initialValues = {{ownership}}
                validationSchema = {ownershipSchema}
                onSubmit={(values) => {
                    setOwnership(values);
                }}>
                {props => (
                    <View style={globalStyles.container}>
                        <View style={globalStyles.ownershipContainer}>
                        <Text style={globalStyles.savingsHead2}>Percentage Muslim Owned:</Text>
                        <TextInput 
                            onChangeText={props.handleChange('ownership')}
                            onBlur={props.handleBlur('ownership')} 
                            value={props.values.ownership}
                            keyboardType= 'numeric'
                            style={{...globalStyles.input, color: 'white', alignSelf: 'center', marginTop: 15, paddingLeft: 5}}
                            placeholder='100%'
                            placeholderTextColor={Colors.grey600}
                        />
                        </View>
                        <Text style={globalStyles.errorText}>{props.touched.ownership && props.errors.ownership}</Text>
                        <IconButton 
                        icon='check' 
                        color={Colors.blueA200}
                        onPress={props.handleSubmit} 
                        style = {{backgroundColor: 'black'}}
                        />
                    </View>
                )}
            </Formik> */}
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
                        <Text style={globalStyles.savingsHead}>Amount For The Year</Text>
                        <Accordion 
                        title= 'Add Current Assets' 
                        value = {getTotal(businessValue.amountACA)} 
                        height = {470} 
                        form={AddCurrentAssets(props)} />
                        <Accordion 
                        title ='Less Current Liabilities' 
                        value={getTotal(businessValue.amountLCL)} 
                        height={290} 
                        form={LessCurrentLiabilities(props)}/>
                
                        <Text style={globalStyles.savingsHead}>Adjustments</Text>
                        <Accordion 
                        title='Add Current Assets' 
                        value={getTotal(businessValue.adjustmentsACA)} 
                        height={290} 
                        form={AdjustmentAssets(props)}/>
                        <Accordion 
                        title='Less Current Assets' 
                        value={getTotal(businessValue.adjustmentsLCA)} 
                        height={200} 
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
                                small: businessValue},
                    results: {
                        ...appStore.results,
                        businessSmall: {
                            net: businessSmallNet,
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