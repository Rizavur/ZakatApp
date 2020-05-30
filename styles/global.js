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
        marginTop: 40,
        fontSize: 30,
        fontFamily: 'yellowtail'
    },
    container: {
        flex: 1,
        padding: 20,
      },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    inputCaption: {
        fontSize: 18,
        padding: 10,
    },
    savingsHead: {
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 10,
          textDecorationLine: 'underline'
    }
})