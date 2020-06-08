import { StyleSheet } from 'react-native';
import { DefaultTheme, configureFonts } from 'react-native-paper';

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
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        flex: 1,
        padding: 20
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
    homeContainer: {
        flex: 1,
    },
    homeText: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 16,
        marginTop: 15,
        alignContent: 'flex-start'
    },
    homeText2: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 16,
        marginTop: 15,
        alignContent: 'flex-end'
    },
    leftInputCaptionText: {
        fontSize: 18,
        alignSelf: 'center'

    },
    button: {
        marginTop: 20,
        borderRadius: 8,
        paddingLeft: 10,
        marginLeft: 20,
        marginRight: 20,
        opacity: 70,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      },
      homeBG: {
          backgroundColor: 'white'
      }
})


export const paperStyles = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        surface: 'goldenrod',
        text: 'black',
        primary: 'white',

      },
}