import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Slider } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import { getNumeric } from '../utils/numberUtil';
import { IconButton, Colors } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import _ from 'lodash';
import Accordion from '../shared/accordion';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';

export default function MedLargeScreen ({ route }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.medLarge);
    const [ownership, setOwnership] = useState(appStore.business.ownership.medLarge);

    //AMOUNT object
    const fields = {
        // AMOUNT ACA
        addCurrentAssets: [
        {
            text: 'Bank Balance',
            placeholder: 'Bank Balance',
            tag: 'bankBalance',
        },
        {
            text: 'Cash',
            placeholder: 'Cash in hand',
            tag: 'cashInHand',
        },
        {
            text: 'Fixed Deposit',
            placeholder: 'Fixed Deposit',
            tag: 'fixedDeposit',
        },
        {
            text: 'Prepaid Expenses',
            placeholder: 'Prepaid Expenses',
            tag: 'prepaidExpenses',
        },
        {
            text: 'Closing Stocks',
            placeholder: 'Closing Stocks',
            tag: 'closingStock',
        },
        {
            text: 'Trade Debtors',
            placeholder: 'Trade Debtors',
            tag: 'tradeDebtors',
        },
        {
            text: 'Loan Receivable',
            placeholder: 'Loan Receivable',
            tag: 'loanReceivable',
        },
        {
            text: 'Staff Welfare Fund',
            placeholder: 'Staff Welfare Fund',
            tag: 'staffWelfareFund',
        },
        {
            text: 'Staff Loan',
            placeholder: 'Staff Loan',
            tag: 'staffLoan',
        },
        {
            text: 'Other Deposits',
            placeholder: 'Other Deposits',
            tag: 'otherDeposits',
        },
        {
            text: 'Others',
            placeholder: 'Others',
            tag:'amountACAothers',
        }],

        // AMOUNT LCL
        lessCurrentLiabilities: [
        {
            text: 'Trade Debtors',
            placeholder: 'Trade Debtors',
            tag: 'tradeDebtors',
        },
        {
            text: 'Financial Loans',
            placeholder: 'Financial Loans',
            tag: 'financialLoans',
        },
        {
            text: 'Accrued Operating Expenses',
            placeholder: 'Accrued Operating Expenses',
            tag: 'accruedOperatingExpenses',
        },
        {
            text: 'Current Provision of Income Tax',
            placeholder: 'Current Provision of Income Tax',
            tag: 'currentProvisionOfIncomeTax',
        },
        {
            text: 'Overdraft',
            placeholder: 'Overdraft',
            tag: 'overdraft',
        },
        {
            text: "Director's fees payable",
            placeholder: "Director's fees payable",
            tag: 'directorsFeesPayable',
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
                text: 'Donation In The Last Quarter',
                placeholder: 'Donation in the last quarter',
                tag: 'donationInTheLastQuarter',
            },
            {
                text: 'Fixed Asset Purchased In Last Quarter',
                placeholder: 'Fixed Asset Purchased In Last Quarter',
                tag: 'fixedAssetPurchasedInLastQuarter',
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsACAothers',
        }],

        addCurrentLiabilities: [
            {
                text: 'Overdraft',
                placeholder: 'Overdraft',
                tag: 'overdraft',
            },
            {
                text: "Director's Fee Payable",
                placeholder: "Director's Fee Payable",
                tag: 'directorsFeePayable',
            },
            {
                text: 'Financial Loans',
                placeholder: 'Financial Loans',
                tag: 'financialLoans',
            },
            {
                text: 'Inter-Company Payables',
                placeholder: 'Inter-Company Payables',
                tag: 'interCompanyPayables',
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsACLothers',
            },
        ],

        //ADJUSTMENTS LCA
        LessCurrentAssets: [
            {
                text: 'Bank Interest Received',
                placeholder: 'Bank Interest Received',
                tag: 'bankInterestReceived',
            },
            {
                text: 'Late Payment Interest',
                placeholder: 'Late Payment Interest',
                tag: 'latePaymentInterest',
            },
            {
                text: 'Deposit For Utilities and Telephone',
                placeholder: 'Deposit For Utilities and Telephone',
                tag: 'depositForUtilitiesAndTelephone',
            },
            {
                text: 'Bad Debts',
                placeholder: 'Bad Debts',
                tag: 'badDebts',
            },
            {
                text: 'Obsolete Stocks',
                placeholder: 'Obsolete Stocks',
                tag: 'obsoleteStocks',
            },
            {
                text: 'Staff Welfare Funds',
                placeholder: 'Staff Welfare Funds',
                tag: 'staffWelfareFunds',
            },
            {
                text: 'Staff Loan',
                placeholder: 'Staff Loan',
                tag: 'staffLoan',
            },
            {
                text: 'Loan Receivable',
                placeholder: 'Loan Receivable',
                tag: 'loanReceivable',
            },
            {
                text: 'Other Deposits',
                placeholder: 'Other Deposits',
                tag: 'otherDeposits',
            },
            {
                text: 'Inter-Company Receivable',
                placeholder: 'Inter-Company Receivable',
                tag: 'interCompanyReceivable',
            },
            {
                text: 'Others',
                placeholder: 'Others',
                tag: 'adjustmentsLCAothers',
            },
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
                        inputContainerStyle = {{backgroundColor: '#eeebff'}}
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
                        inputContainerStyle = {{backgroundColor: '#eeebff'}}
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
                        value = {businessValue.adjustmentsACA[element.tag]}
                        onChangeText={props.handleChange(element.tag)}
                        inputContainerStyle = {{backgroundColor: '#eeebff'}}
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

    const AdjustmentsLiabilities = (props) => {
        return Adjustments.addCurrentLiabilities.map((element, key) => {
            return(
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = {element.text}
                        name={element.tag}
                        value = {businessValue.adjustmentsACL[element.tag]}
                        onChangeText={props.handleChange(element.tag)}
                        inputContainerStyle = {{backgroundColor: '#eeebff'}}
                        onChange={(value) => {
                            setBusinessValue({
                                ...businessValue,
                                adjustmentsACL: {
                                    ...businessValue.adjustmentsACL,
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
                        value = {businessValue.adjustmentsLCA[element.tag]}
                        onChangeText={props.handleChange(element.tag)}
                        inputContainerStyle = {{backgroundColor: '#eeebff'}}
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
               + getTotal(businessValue.adjustmentsACL)
               - getTotal(businessValue.adjustmentsLCA);
    }

    const confirmation = () =>
    Alert.alert(
      "Reset Medium/Large Business",
      "Delete all inputs in medium/large business?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress:  () =>
            {setBusinessValue({
                amountACA: {
                    bankBalance: '',
                    cashInHand: '',
                    fixedDeposit: '',
                    prepaidExpenses: '',
                    closingStock: '',
                    tradeDebtors: '',
                    loanReceivable: '',
                    staffWelfareFund: '',
                    staffLoan: '',
                    otherDeposits: '',
                    amountACAothers: '',
                },
                amountLCL: {
                    tradeDebtors: '',
                    financialLoans: '',
                    accruedOperatingExpenses: '',
                    currentProvisionOfIncomeTax: '',
                    overdraft: '',
                    directorsFeesPayable: '',
                    amountLCLothers: '',
                },
                adjustmentsACA: {
                    donationInTheLastQuarter: '',
                    fixedAssetPurchasedInLastQuarter: '',
                    adjustmentsACAothers: '',
                },
                adjustmentsACL: {
                    overdraft: '',
                    directorsFeePayable: '',
                    financialLoans: '',
                    interCompanyPayables: '',
                    adjustmentsACLothers: '',
                },
                adjustmentsLCA: {
                    bankInterestReceived: '',
                    latePaymentInterest: '',
                    depositForUtilitiesAndTelephone: '',
                    badDebts: '',
                    obsoleteStocks: '',
                    staffWelfareFunds: '',
                    staffLoan: '',
                    loanReceivable: '',
                    otherDeposits: '',
                    interCompanyReceivable: '',
                    adjustmentsLCAothers: '',
                }}
            ); setAppStore({ 
                ...appStore, 
                business: {
                    ...appStore.business,
                    medLarge: {
                        amountACA: {
                            bankBalance: '',
                            cashInHand: '',
                            fixedDeposit: '',
                            prepaidExpenses: '',
                            closingStock: '',
                            tradeDebtors: '',
                            loanReceivable: '',
                            staffWelfareFund: '',
                            staffLoan: '',
                            otherDeposits: '',
                            amountACAothers: '',
                        },
                        amountLCL: {
                            tradeDebtors: '',
                            financialLoans: '',
                            accruedOperatingExpenses: '',
                            currentProvisionOfIncomeTax: '',
                            overdraft: '',
                            directorsFeesPayable: '',
                            amountLCLothers: '',
                        },
                        adjustmentsACA: {
                            donationInTheLastQuarter: '',
                            fixedAssetPurchasedInLastQuarter: '',
                            adjustmentsACAothers: '',
                        },
                        adjustmentsACL: {
                            overdraft: '',
                            directorsFeePayable: '',
                            financialLoans: '',
                            interCompanyPayables: '',
                            adjustmentsACLothers: '',
                        },
                        adjustmentsLCA: {
                            bankInterestReceived: '',
                            latePaymentInterest: '',
                            depositForUtilitiesAndTelephone: '',
                            badDebts: '',
                            obsoleteStocks: '',
                            staffWelfareFunds: '',
                            staffLoan: '',
                            loanReceivable: '',
                            otherDeposits: '',
                            interCompanyReceivable: '',
                            adjustmentsLCAothers: '',
                        }
                }},
                results: {
                    ...appStore.results,
                    businessMedLar: {
                        net: 0,
                        zakat: 0
                    },
                }
            })}}
      ],
      { cancelable: false }
    );

    const businessMedLargeNet = (getBusinessNet()).toFixed(2);
    const businessMedLargeZakat = ((businessMedLargeNet)/100 * 2.5).toFixed(2);

    return(
    <View  style = {globalStyles.container}>
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView>
            <Formik
                initialValues= {{
                    ...businessValue.amountACA,
                    ...businessValue.amountLCL,
                    ...businessValue.adjustmentsACA,
                    ...businessValue.adjustmentsACL,
                    ...businessValue.adjustmentsLCA,
                    ownership: ownership
                }}
            >
            {props => (
                <View style = {globalStyles.container}>
                    <View style={{backgroundColor: '#a6b1e1', borderRadius: 20, marginHorizontal: 20, marginTop: 15, paddingBottom: 10}}>
                        <Text style={{...globalStyles.savingsHead, color:'black'}}>Muslim Ownership {ownership}%</Text>
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
                        height = {880} 
                        form={AddCurrentAssets(props)} />
                        <Accordion 
                        title ='Less Current Liabilities' 
                        value={getTotal(businessValue.amountLCL)} 
                        height={560} 
                        form={LessCurrentLiabilities(props)}/>
                
                        <Text style={globalStyles.savingsHead}>Adjustments</Text>
                        <Accordion 
                        title='Add Current Assets' 
                        value={getTotal(businessValue.adjustmentsACA)} 
                        height={250} 
                        form={AdjustmentAssets(props)}/>
                        <Accordion 
                        title='Add Current Liabilities' 
                        value={getTotal(businessValue.adjustmentsACL)} 
                        height={400} 
                        form={AdjustmentsLiabilities(props)}/>
                        <Accordion 
                        title='Less Current Assets' 
                        value={getTotal(businessValue.adjustmentsLCA)} 
                        height={880} 
                        form={AdjustmentsLess(props)}/>
                </View>
            )}
            </Formik>  
        </ScrollView>
        </TouchableWithoutFeedback>
        <IconButton
                icon="check"
                color='#424874'
                size={35}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 10, right: 10}}
                onPress={() => {
                setAppStore(
                    { ...appStore, 
                    business: {...appStore.business,
                                ownership: {
                                    ...appStore.business.ownership,
                                    medLarge: ownership,
                                    },
                                medLarge: businessValue },
                    results: {
                        ...appStore.results,
                        businessMedLar: {
                            net: businessMedLargeNet*(ownership/100),
                            zakat: businessMedLargeZakat,
                        }
                    }
                    });
                    route.params.navigate('Home')}}
            />
            <IconButton
                icon="delete-outline"
                color='#424874'
                size={35}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 90, right: 10}}
                onPress={confirmation}
            />
        </View>
    )}