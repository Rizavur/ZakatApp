import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';
import { getNumeric } from '../utils/numberUtil';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';
import { IconButton, Colors } from 'react-native-paper';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import {setVisibleCallback} from '../App';


export default function OtherAssets ({navigation}) {
    const { setAppStore, appStore } = navigation.state.params;
    const [ visible, setVisible ] = useState(false);
    setVisibleCallback['OtherAssets'] = setVisible;

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

    const otherAssetsNet = (getNumeric(goldNet)+ getNumeric(silverNet) + getNumeric(insuranceNet) + getNumeric(othersNet));
    const otherAssetsZakat = ((otherAssetsNet/100) *2.5).toFixed(2);

    const goldForm = () => {
        return(
            <View>
                <Formik
                    initialValues= {{goldWeight, goldValue}}
                    >
                    {props => (
                        <View style={{paddingTop:15, paddingHorizontal: 10}}>
                            <FilledTextField
                                prefix = '$'
                                baseColor = 'black'
                                tintColor = 'blue'
                                keyboardType= 'numeric'
                                label = 'Market Value (per g)'
                                value = {goldValue}
                                inputContainerStyle = {{backgroundColor: '#b3f5b3'}}
                                onChange={(value) => setGoldValue(value.nativeEvent.text)}
                            />
                            <FilledTextField
                                prefix = '$'
                                baseColor = 'black'
                                tintColor = 'blue'
                                keyboardType= 'numeric'
                                label = 'Weight (g)'
                                value = {goldWeight}
                                onChangeText={props.handleChange('weight')}
                                inputContainerStyle = {{backgroundColor: '#b3f5b3'}}
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
                    <View style={{paddingTop:15, paddingHorizontal: 10}}>
                        <FilledTextField
                            prefix = '$'
                            baseColor = 'black'
                            tintColor = 'blue'
                            keyboardType= 'numeric'
                            label = 'Surrender Value'
                            value = {surrender}
                            onChangeText={props.handleChange('surrender')}
                            inputContainerStyle = {{backgroundColor: '#b3f5b3'}}
                            onChange={(value) => setSurrender(value.nativeEvent.text)}
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
                        <View style={{paddingTop:15, paddingHorizontal: 10}}>
                            <FilledTextField
                                prefix = '$'
                                baseColor = 'black'
                                tintColor = 'blue'
                                keyboardType= 'numeric'
                                label = 'Add'
                                value = {othersAdd}
                                onChangeText={props.handleChange('surrender')}
                                inputContainerStyle = {{backgroundColor: '#b3f5b3'}}
                                onChange={(value) => setOthersAdd(value.nativeEvent.text)}
                            />
                            <FilledTextField
                                prefix = '$'
                                baseColor = 'black'
                                tintColor = 'blue'
                                keyboardType= 'numeric'
                                label = 'Minus'
                                value = {othersMinus}
                                onChangeText={props.handleChange('surrender')}
                                inputContainerStyle = {{backgroundColor: '#b3f5b3'}}
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
        <View>  
                <Modal
                isVisible={visible}
                animationType="slide"
                backgroundColor={Colors.grey900}
                style={{
                    marginVertical: 50,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
                >
                <View style={{ flex: 1, padding: 20}}>
                    <Text style={globalStyles.modalHeader}>Zakat On Other Assets</Text>
                    <ScrollView style={{marginTop: 10, paddingRight: 13, paddingLeft: 13}}>
                        <Text style={{...globalStyles.modalInfoHeader}}>Gold Bars and Gold Jewellery (Not Intended for Usage)</Text>
                                <Text style={{...globalStyles.modalInfoContent}}>Gold in the form of gold bars kept / invested in the bank and gold jewellery that is kept without the intention of usage is obligated for Zakat when the weight of the gold has reached the haul and nisab of 86 grams. Zakat is then based on 2.5% of the total weight of gold from the gold bars / jewellery.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Gold Jewellery (Intended for Usage)</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Gold jewellery intended for usage is only obligated for Zakat if the weight of a piece of the gold jewellery has reached the haul and uruf  of 860 grams. Zakat is then based on 2.5% of the total weight of gold from the piece of gold jewellery.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Insurance</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Determine the start date of the insurance plan and the date when Nisab is reached.Find out the surrender value from your insurance statement or insurance agent when Nisab is reached.Your Zakat Insurance is surrender value($) x 2.5%</Text>
                    </ScrollView>
                    <IconButton
                        icon="close"
                        color='red'
                        size={25}
                        style = {{position: 'absolute', top: 7, right: 7}}
                        onPress={() => setVisible(false)}
                    />
                </View>
                </Modal>
            </View>
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
            <ScrollView>
                <Accordion title={'Gold'} height={150} value={goldNet} form={goldForm()}/>
                {/* <Accordion title={'Silver'} height={200} value={silverNet} form={silverForm()}/> */}
                <Accordion title={'Insurance'} height={90} value={insuranceNet} form={insuranceForm()}/>
                <Accordion title={'Others'} height={150} value={othersNet} form={othersForm()}/>
            </ScrollView>
        </TouchableWithoutFeedback>
        <IconButton
                icon="check"
                color='green'
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
                        },
                        otherAssets: {
                            net: otherAssetsNet,
                            zakat: otherAssetsZakat,
                        }
                    }
                    });
                    navigation.navigate('Home')}} 
            />
            <IconButton
                icon="delete-outline"
                color='green'
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 90, right: 10}}
                onPress={confirmation}
            />
    </View>
    )}