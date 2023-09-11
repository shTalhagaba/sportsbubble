import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    headerTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "800",
        textAlign: "center",
        color: Colors.white
    },
    desTxt: {
        fontSize: "17@ms0.3",
        fontWeight: "500",
        alignSelf: "center",
        color: Colors.white,
        marginTop: "16@ms0.3",
        maxWidth: "75%",
        lineHeight: "25@ms0.3",
        textAlign: "center"
    },
    // searchContainer: {
    //     height: "56@ms0.3",
    //     paddingRight: "15@ms0.3",
    // },
    innerContainer: {
        marginHorizontal: "15@ms0.3",
        marginTop: "5@ms0.3"
    },
    listContainer: {
        marginVertical: "4@ms0.3",
        paddingVertical: "6@ms0.3",
        borderRadius: "16@ms0.3",
        backgroundColor: "#2B3B50",
        paddingHorizontal: "6@ms0.3"
    },
    innerListContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    imageIcon: {
        height: "44@ms0.3",
        width: "44@ms0.3",
    },
    userNameContainer: {
        paddingStart: "15@ms0.3",
        justifyContent: "center",
        flex: 1
    },
    titleTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "800",
        lineHeight: "25@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        textTransform: 'uppercase',
    },
    uncheckBox: {
        height: "19@ms0.3",
        width: "19@ms0.3",
        borderWidth: "1.3@ms0.3",
        borderRadius: "20@ms0.3",
        marginRight: "18@ms0.3",
        justifyContent: "center"
    },
    tickImage: {
        height: "11@ms0.3",
        width: "11@ms0.3",
        tintColor: Colors.darkOrange,
        alignSelf: "center"
    },
    doneButton: {
        position: 'absolute',
        bottom: "40@ms0.3",
        marginHorizontal: "20@ms0.3",
    },

    searchContainer: {
        flexDirection: 'row',
        height: '53@ms0.3',
        borderRadius: '15@ms0.3',
        justifyContent: 'center',
        backgroundColor: Colors.mediumBlue,
        marginBottom: '8@ms0.3',
        alignSelf: "center",
        alignItems: "center"
    },
    searchImage: {
        height: '18@ms0.3',
        width: '18@ms0.3',
        marginStart: '10@ms0.3',
        tintColor: Colors.white,
    },
    searchImageTwo: {
        height: '12@ms0.3',
        width: '12@ms0.3',
        marginStart: '5@ms0.3',
        tintColor: Colors.white,
        opacity: 0.7
    },
    searchTxt: {
        letterSpacing: 0.75,
        color: Colors.white,
        fontSize: '14@ms0.3',
        flex: 1,
        fontWeight: '500',
        fontFamily: Fonts.Regular,
        marginStart: 10,
        opacity: 0.7
    },
    inputField: {
        letterSpacing: 0.75,
        color: Colors.white,
        fontSize: '16@ms0.3',
        flex: 1,
        fontWeight: '600',
        padding: '0@ms0.3',
        fontFamily: Fonts.Regular,
        marginStart: '10@ms0.3',
    },
    crossImage: {
        height: '12@ms0.3',
        width: '12@ms0.3',
        marginHorizontal: '10@ms0.3',
        tintColor: Colors.white,
    },
});
