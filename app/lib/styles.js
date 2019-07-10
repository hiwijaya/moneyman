import { StyleSheet, Dimensions, Platform } from 'react-native';


export const Colors = {
    primary: '#BAE2DA',
    white: '#FFFFFF',
    whiteGreen: '#F4F7F6',
    grey: '#B7B7B7',
    black: '#000000',
}

export const Fonts = {
    h1: 20,
    h2: 18,
    h3: 16,
    h4: 14, // DEFAULT
    h5: 12,
    h6: 10,
    h7: 8,
};

export const Screen = Dimensions.get('window'); // Screen.width , Screen.height

export const Styles = StyleSheet.create({

    // COMMONS
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon128: {
        width: 128,
        height: 128,
    }
    // COMMONS
    

});