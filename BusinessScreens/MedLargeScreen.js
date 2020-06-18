import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';

export default function MedLargeScreen ({ route }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.medLarge);

    //AMOUNT object
    const fields = {
        // AMOUNT ACA
        addCurrentAssets: [
        {
            text: 'Bank Balance: ',
            placeholder: 'Bank Balance',
            tag: 'bankBalance',
        },
        {
            text: 'Cash: ',
            placeholder: 'Cash in hand',
            tag: 'cashInHand',
        },
        {
            text: 'Fixed Deposit: ',
            placeholder: 'Fixed Deposit',
            tag: 'fixedDeposit',
        },
        {
            text: 'Prepaid Expenses: ',
            placeholder: 'Prepaid Expenses',
            tag: 'prepaidExpenses',
        },
        {
            text: 'Closing Stocks: ',
            placeholder: 'Closing Stocks',
            tag: 'closingStock',
        },
        {
            text: 'Trade Debtors: ',
            placeholder: 'Trade Debtors',
            tag: 'tradeDebtors',
        },
        {
            text: 'Loan Receivable: ',
            placeholder: 'Loan Receivable',
            tag: 'loanReceivable',
        },
        {
            text: 'Staff Welfare Fund: ',
            placeholder: 'Staff Welfare Fund',
            tag: 'staffWelfareFund',
        },
        {
            text: 'Staff Loan: ',
            placeholder: 'Staff Loan',
            tag: 'staffLoan',
        },
        {
            text: 'Other Deposits: ',
            placeholder: 'Other Deposits',
            tag: 'otherDeposits',
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            tag:'amountACAothers',
        }],

        // AMOUNT LCL
        lessCurrentLiabilities: [
        {
            text: 'Trade Debtors: ',
            placeholder: 'Trade Debtors',
            tag: 'tradeDebtors',
        },
        {
            text: 'Financial Loans: ',
            placeholder: 'Financial Loans',
            tag: 'financialLoans',
        },
        {
            text: 'Accrued Operating Expenses: ',
            placeholder: 'Accrued Operating Expenses',
            tag: 'accruedOperatingExpenses',
        },
        {
            text: 'Current Provision of Income Tax: ',
            placeholder: 'Current Provision of Income Tax',
            tag: 'currentProvisionOfIncomeTax',
        },
        {
            text: 'Overdraft: ',
            placeholder: 'Overdraft',
            tag: 'overdraft',
        },
        {
            text: "Director's fees payable: ",
            placeholder: "Director's fees payable",
            tag: 'directorsFeesPayable',
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
                text: 'Donation In The Last Quarter: ',
                placeholder: 'Donation in the last quarter',
                tag: 'donationInTheLastQuarter',
            },
            {
                text: 'Fixed Asset Purchased In Last Quarter: ',
                placeholder: 'Fixed Asset Purchased In Last Quarter',
                tag: 'fixedAssetPurchasedInLastQuarter',
            },
            {
                text: 'Others: ',
                placeholder: 'Others',
                tag: 'adjustmentsACAothers',
        }],

        addCurrentLiabilities: [
            {
                text: 'Overdraft: ',
                placeholder: 'Overdraft',
                tag: 'overdraft',
            },
            {
                text: "Director's Fee Payable: ",
                placeholder: "Director's Fee Payable",
                tag: 'directorsFeePayable',
            },
            {
                text: 'Financial Loans: ',
                placeholder: 'Financial Loans',
                tag: 'financialLoans',
            },
            {
                text: 'Inter-Company Payables: ',
                placeholder: 'Inter-Company Payables',
                tag: 'interCompanyPayables',
            },
            {
                text: 'Others: ',
                placeholder: 'Others',
                tag: 'adjustmentsACLothers',
            },
        ],

        //ADJUSTMENTS LCA
        LessCurrentAssets: [
            {
                text: 'Bank Interest Received: ',
                placeholder: 'Bank Interest Received',
                tag: 'bankInterestReceived',
            },
            {
                text: 'Late Payment Interest: ',
                placeholder: 'Late Payment Interest',
                tag: 'latePaymentInterest',
            },
            {
                text: 'Deposit For Utilities and Telephone: ',
                placeholder: 'Deposit For Utilities and Telephone',
                tag: 'depositForUtilitiesAndTelephone',
            },
            {
                text: 'Bad Debts: ',
                placeholder: 'Bad Debts',
                tag: 'badDebts',
            },
            {
                text: 'Obsolete Stocks: ',
                placeholder: 'Obsolete Stocks',
                tag: 'obsoleteStocks',
            },
            {
                text: 'Staff Welfare Funds: ',
                placeholder: 'Staff Welfare Funds',
                tag: 'staffWelfareFunds',
            },
            {
                text: 'Staff Loan: ',
                placeholder: 'Staff Loan',
                tag: 'staffLoan',
            },
            {
                text: 'Loan Receivable: ',
                placeholder: 'Loan Receivable',
                tag: 'loanReceivable',
            },
            {
                text: 'Other Deposits: ',
                placeholder: 'Other Deposits',
                tag: 'otherDeposits',
            },
            {
                text: 'Inter-Company Receivable: ',
                placeholder: 'Inter-Company Receivable',
                tag: 'interCompanyReceivable',
            },
            {
                text: 'Others: ',
                placeholder: 'Others',
                tag: 'adjustmentsLCAothers',
            },
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

    const AdjustmentsLiabilities = (props) => {
        return Adjustments.addCurrentLiabilities.map((element, key) => {
            return(
                <View>
                    <Text style={globalStyles.inputCaptionAccordion}>{element.text}</Text>
                    <TextInput
                    value = {businessValue.adjustmentsACL[element.tag]}
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
               + getTotal(businessValue.adjustmentsACL)
               - getTotal(businessValue.adjustmentsLCA);
    }

    const businessMedLargeNet = (getBusinessNet()).toFixed(2);
    const businessMedLargeZakat = ((businessMedLargeNet)/100 * 2.5).toFixed(2);

    return(
        
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik
                initialValues= {{
                    ...businessValue.amountACA,
                    ...businessValue.amountLCL,
                    ...businessValue.adjustmentsACA,
                    ...businessValue.adjustmentsACL,
                    ...businessValue.adjustmentsLCA
                }}
            >
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Amount For The Year:</Text>
                        <Accordion 
                        title= '(+) Add Current Assets' 
                        value = {getTotal(businessValue.amountACA)} 
                        height = {1020} 
                        form={AddCurrentAssets(props)} />
                        <Accordion 
                        title ='(-) Less Current Liabilities' 
                        value={getTotal(businessValue.amountLCL)} 
                        height={650} 
                        form={LessCurrentLiabilities(props)}/>
                
                        <Text style={globalStyles.savingsHead2}>Adjustments:</Text>
                        <Accordion 
                        title='(+) Add Current Assets' 
                        value={getTotal(businessValue.adjustmentsACA)} 
                        height={310} 
                        form={AdjustmentAssets(props)}/>
                        <Accordion 
                        title='(+) Add Current Liabilities' 
                        value={getTotal(businessValue.adjustmentsACL)} 
                        height={470} 
                        form={AdjustmentsLiabilities(props)}/>
                        <Accordion 
                        title='(-) Less Current Assets' 
                        value={getTotal(businessValue.adjustmentsLCA)} 
                        height={1030} 
                        form={AdjustmentsLess(props)}/>
                </View>
            )}
            </Formik>  

            <FlatButton onPress={() => {
                setAppStore(
                    { ...appStore, 
                    business: {...appStore.business,
                                medLarge: businessValue },
                    results: {
                        ...appStore.results,
                        businessMedLar: {
                            net: businessMedLargeNet,
                            zakat: businessMedLargeZakat,
                        }
                    }
                    });
                    route.params.navigate('Home')}} 
                    text='Calculate' />
            <Text style={globalStyles.netAmt}>Net Business Assets: ${businessMedLargeNet}</Text>
            <Text style={globalStyles.netAmt}>Business Zakat: ${businessMedLargeZakat}</Text>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}