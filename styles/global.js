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
        fontFamily: 'oswaldBold',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30,
        color: '#7FFFD4'
    },
    container: {
        flex: 1,
        padding: 10,
      },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 10,
        padding: 8,
        fontSize: 16,
        borderRadius: 15,
        color: 'white'
    },
    inputCaption: {
        fontSize: 18,
        padding: 10,
    },
    inputCaptionAccordion: {
        fontSize: 18,
        padding: 10,
        color: 'white'
    },
    inputCaption2: {
        fontSize: 18,
        padding: 10,
    },
    savingsHead: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -5,
        textDecorationLine: 'underline',
    },
    savingsHead2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 20,
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
        flexDirection: 'row'
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
    homeRightZakat: {
        position: 'absolute',
        marginLeft: 160,
                 
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
        paddingBottom: 20,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      },
      homeBG: {
          backgroundColor: 'black'
      },
      
})


export const paperStyles = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        surface: '#7FFFD4',
        text: 'black',
        primary: 'black',

      },
}