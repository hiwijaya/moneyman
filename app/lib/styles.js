import { StyleSheet, Dimensions, Platform } from 'react-native';


export const Colors = {
    primary: '#81cabc',
    white: '#FFFFFF',
    whiteGreen: '#F4F7F6',
    grey: '#B7B7B7',
    black: '#000000',
}

export const Fonts = {
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 16,     
    h5: 14,     // DEFAULT
    h6: 12,
};

export const Screen = Dimensions.get('window'); // Screen.width , Screen.height

const PADDING_ACTIONBAR = 15;

export const Styles = StyleSheet.create({

    // COMMONS
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon24: {
        width: 22,
        height: 22,
    },
    icon128: {
        width: 128,
        height: 128,
    },
    icon228: {
        width: 226,
        height: 226,
    },
    // COMMONS
    
    sceneBox: {
        flex: 1,
        backgroundColor: Colors.whiteGreen,
    },
    actionbarBox: {
        height: 50,
        elevation: 5,
        backgroundColor: Colors.primary,
        paddingHorizontal: PADDING_ACTIONBAR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateButtonBox: {
        paddingRight: 15,
    },
    dateButtonLabel: {
        fontSize: Fonts.h3,
        fontWeight: 'bold',
    },
    actionbarButtonBox: {
        width: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
        
    },
    actionbarButton: {
        padding: 7
    }


});