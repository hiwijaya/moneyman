import { StyleSheet, Dimensions, Platform } from 'react-native';


export const Colors = {
    primary: '#81cabc',
    white: '#FFFFFF',
    whiteGreen: '#F4F7F6',
    grey: '#B7B7B7',
    darkGrey: '#757575',
    black: '#000000',
}

export const Fonts = {
    h1: 26,
    h2: 22,
    h3: 18,
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
    icon18: {
        width: 18,
        height: 18,
    },
    icon24: {
        width: 24,
        height: 24,
    },
    icon84: {
        width: 84,
        height: 84,
    },
    // COMMONS
    
    sceneBox: {
        flex: 1,
        backgroundColor: Colors.whiteGreen,
    },

    googleButton: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3
    },
    googleButtonText: {
        fontWeight: 'bold',
        color: Colors.darkGrey,
        marginLeft: 10
    },

    actionbarBox: {
        height: 50,
        backgroundColor: Colors.primary,
        paddingHorizontal: PADDING_ACTIONBAR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // elevation: 5,
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
    },
    backButton: {
        paddingVertical: 15,
        paddingRight: 15,
    },
    actionbarTitle: {
        flex: 1,
        fontSize: Fonts.h3,
        fontWeight: 'bold',
    },

    accountHeaderBox: {
        height: 150,
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 50,
        elevation: 5
    }


});