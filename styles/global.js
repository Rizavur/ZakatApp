import { StyleSheet } from 'react-native';
import { DefaultTheme, Colors } from 'react-native-paper';

export const globalStyles = StyleSheet.create({
    ZakatText: {
        fontFamily: 'roboto',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 30,
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.grey900,
        paddingBottom: 10
      },
    ownershipContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        padding: 8,
        fontSize: 16,
        borderRadius: 15,
        color: 'black',
    },
    inputOwnership: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        padding: 8,
        fontSize: 16,
        borderRadius: 15,
        color: 'black',
    },
    inputCaption: {
        fontSize: 18,
        padding: 10,
    },
    inputCaptionAccordion: {
        fontSize: 18,
        padding: 10,
        color: 'black',
    },
    inputCaption2: {
        fontSize: 18,
        padding: 10,
    },
    savingsHead: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        color: 'white',
        textAlign: 'center'
    },
    savingsHead2: {
        fontSize: 20,
        color: 'white',
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
          backgroundColor: Colors.grey900
      },
      errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginTop: 6,
        textAlign: 'center',
      },
      modalHeader: {
          color: '#24c0e3',
          fontFamily: 'oswaldBold',
          fontSize: 30,
          alignSelf: 'center',
      },
      modalInfoHeader: {
        color: '#1698b5',
        fontSize: 15,
        paddingTop: 10,
      },
      modalInfoContent: {
        color: 'white',
        textAlign: 'justify',
        fontSize: 14
      },
})


export const paperStyles = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        surface: '#aff',
        text: 'black',
        primary: 'black',

      },
}