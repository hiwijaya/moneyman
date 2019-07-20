import { StyleSheet, Dimensions, Platform } from 'react-native';


export const Colors = {
    primary: '#81cabc',
    white: '#FFFFFF',
    whiteGreen: '#F4F7F6',
    lightGrey: '#f2f2f2',
    grey: '#B7B7B7',
    darkGrey: '#757575',
    black: '#000000',
    red: '#E0555E',
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
    box: {
        flex: 1
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon8: {
        width: 8,
        height: 8,
    },
    icon12: {
        width: 12,
        height: 12,
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

    calendarModalBox: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarBox: {
        height: 160,
        backgroundColor: Colors.white,
    },
    calendarYearBox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    calendarYearButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
    },
    calendarRowBox: {
        height: 50,
        flexDirection: 'row',
    },
    calendarMonthBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarMonthSelected: {
        backgroundColor: Colors.primary,
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarTextSelected: {
        fontWeight: 'bold'
    },
    
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
        elevation: 5,
    },
    periodButtonBox: {
        height: 50,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodButtonLabel: {
        fontSize: Fonts.h3,
        fontWeight: 'bold',
        marginRight: 10,
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
        height: 130,
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 50,
        elevation: 5
    },
    accountPhotoBox: {
        width: 100,
        height: 100,
        borderRadius: 35,
        position: 'absolute',
        left: 15,
        top: 60,
        elevation: 5,
        backgroundColor: Colors.darkGrey,
    },
    accountPhoto: {
        width: 100,
        height: 100,
        borderRadius: 35,
    },
    accountNameBox: {
        marginLeft: 130,
        marginTop: 20,
    },
    accountName: {
        fontSize: Fonts.h2,
        fontWeight: 'bold'
    },
    accountEmail: {
        fontSize: Fonts.h5,
    },

    accountMenuBox: {
        marginTop: 20,
        backgroundColor: Colors.white,
    },
    accountMenuItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountMenuIcon: {
        width: 24,
        height: 24,
        marginLeft: 15,
        marginRight: 30,
    },
    accountMenuTextBox: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: Colors.lightGrey
    },
    accountMenuText: {
        fontSize: Fonts.h4,
        color: Colors.darkGrey,
    },
    versionTextBox: {
        width: 70,
        height: 60,
        justifyContent: 'center',
    },
    versionText: {
        fontSize: Fonts.h5,
        color: Colors.darkGrey
    },





    signoutButton: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signoutText: {
        fontSize: Fonts.h4,
        fontWeight: 'bold',
        color: Colors.red,
    }


});