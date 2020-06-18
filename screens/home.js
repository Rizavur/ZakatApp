import React, { useState } from 'react';
import { ScrollView, View, Text, FlatList, TouchableHighlight } from 'react-native';
import {globalStyles, paperStyles}  from '../styles/global';
import { getNumeric } from '../utils/numberUtil';
import HomeButton from '../shared/homeButton';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export default function Home ({navigation}) {
    const [appStore, setAppStore] = useState({
        savings: {
            accounts: [
                {key: 1,
                lowestAmt: '',
                interest: ''
                },
                ]
        },
        shares: {
            accounts: [
            {
            key: 1,
            perUnit: '',
            noUnit: '',
            },
            ]
        },
        business: {
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
                }},
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
            }
        },
        gold: {
            weight: '',
            value: ''
        },
        insurance: {
            surrender: '',
        },
        results: {
            savings: {
                net: 0, 
                zakat: 0
            },
            businessSmall: {
                net: 0,
                zakat: 0
            },
            businessMedLar: {
                net: 0,
                zakat: 0
            },
            gold: {
                net: 0,
                zakat: 0
            },
            shares: {
                net: 0,
                zakat: 0
            },
            insurance: {
                net: 0,
                zakat: 0
            }
        },
    });

    const results = appStore.results;

    const Zakat = (parseFloat(results.savings.zakat) +
                parseFloat(results.businessSmall.zakat) +
                parseFloat(results.businessMedLar.zakat) +
                parseFloat(results.gold.zakat) +
                parseFloat(results.shares.zakat) +
                parseFloat(results.insurance.zakat)).toFixed(2);    

    const pressHandler = ({ text }) => {
        navigation.navigate(text, { appStore, setAppStore });
    }

    return(
        <PaperProvider theme = {paperStyles}>
        <ScrollView style={globalStyles.homeBG}>
            <Text style={globalStyles.ZakatText}>Zakat: $ {Zakat}</Text>

            {/* <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Test'})}>
                <Card.Title title="Test"/> 
                <Card.Content style={globalStyles.homeContainer}>
                    <Paragraph>Total: $</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: $</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card> */}

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Savings'})}>
                <Card.Title title="Savings"/> 
                <Card.Content style={globalStyles.homeContainer}>
                    <Paragraph>Total: ${appStore.results.savings.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.savings.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Business'})}>
                <Card.Title title="Business"/> 
                <Card.Content>
                    <Paragraph>Total: ${getNumeric(appStore.results.businessSmall.net) + getNumeric(appStore.results.businessMedLar.net)}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${getNumeric(appStore.results.businessSmall.zakat) + getNumeric(appStore.results.businessMedLar.zakat)}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Shares'})}>
                <Card.Title title="Shares"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.shares.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.shares.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Gold'})}>
                <Card.Title title="Gold"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.gold.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.gold.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            
            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Insurance'})}>
                <Card.Title title="Insurance"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.insurance.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.insurance.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>


        </ScrollView>
        </PaperProvider>
    )
    }