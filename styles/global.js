import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    TestView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ZakatText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 30,
        fontFamily: 'yellowtail'
    },
    container: {
        flex: 1,
        padding: 20,
      },
    input: {
        flex:1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        borderRadius: 20,
    },
    inputCaption: {
        fontSize: 18,
        padding: 10,
        textDecorationLine: 'underline'
    },
    inputCaption2: {
        fontSize: 18,
        padding: 10,
    },
    savingsHead: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    savingsHead2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        margin: 20,
        textDecorationLine: 'underline',
    },
    netAmt: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 50
    },
    homeText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15
    },

    leftInputCaptionText: {
        fontSize: 18,
        alignSelf: 'center'

    }
})