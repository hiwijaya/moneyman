import { StyleSheet, Dimensions, Platform } from 'react-native';


export const Colors = {
    primary: '#81cabc',
    white: '#FFFFFF',
    whiteGreen: '#F4F7F6',
    lightGrey: '#e6e6e6',
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

// PADDING SCENE => 15

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
    icon10: {
        width: 10,
        height: 10,
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
    icon36: {
        width: 36,
        height: 36,
    },
    icon84: {
        width: 84,
        height: 84,
    },
    // COMMONS

    calendarModalBox: {
        position: 'absolute',
        top: 50,
        left: 0, 
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2
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
        paddingHorizontal: 15,
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
    },

    tabBox: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
    },
    tabSelected: {
        borderBottomWidth: 3,
        borderBottomColor: Colors.black
    },

    listIconBox: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    iconBox: {      // DEPRECATED --> cicon.js
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
    },
    deleteIconBox: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listAddBox: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    addTitleBox: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 15
    },
    addTitleInput: {
        flex: 1,
        height: 50,
    },
    addCategoryGroup: {
        alignItems: 'center',
        marginTop: 20,
    },
    addIconListBox: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    addIconBox: {
        width: (Screen.width / 4),    // TODO: calculate width to find best row item
        marginVertical: 15, 
        alignItems: 'center',
    },

    homeScroll: {
        display: 'flex',
        flex: 1,
        zIndex: 1,
    },
    homeResumeBox: {
        margin: 15,
        marginBottom: 30,
        height: 100,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        elevation: 5,
    },
    homeResumeItemBox: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeResumeValue: {
        fontSize: Fonts.h4,
        fontWeight: 'bold',
        marginTop: 5
    },
    separator: {
        width: 1,
        height: 30,
        backgroundColor: Colors.lightGrey
    },
    homeAddButton: {
        position: 'absolute',
        top: 90,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        elevation: 5
    },
    homeTransactionBox: {
        margin: 15,
        marginTop: 0,
        padding: 10,
        borderRadius: 5,
        backgroundColor: Colors.white,
        elevation: 5,
    },
    homeTransactionHeaderBox: {
        marginBottom: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
    },
    homeTransactionHeaderText: {
        fontSize: Fonts.h6,
        color: Colors.grey
    },
    homeTransactionItemBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    comboTypeBox: {
        position: 'absolute',
        left: 46,
        borderRadius: 5,
        backgroundColor: Colors.white,
        elevation: 7,
        zIndex: 2,
    },
    comboTypeItem: {
        width: 150,
        height: 50,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },

    boardBox: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        backgroundColor: Colors.white 
    },
    boardInputBox: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey
    },
    boardInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    boardKeyBox: {
        flex: 1,
        flexDirection: 'row'
    },
    boardKey: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey
    },
    boardDigit: {
        fontSize: Fonts.h3,
        fontWeight: 'bold',
    }
    
    


});