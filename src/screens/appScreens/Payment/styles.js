import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    innerContainer: {
        marginTop: "10@ms0.3",
        marginHorizontal: "16@ms0.3"
    },
    checkoutTxt: {
        fontSize: "24@ms0.3",
        fontWeight: "800",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        alignSelf: "center",
        lineHeight: "33@ms0.3"
    },
    payusingTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "400",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        alignSelf: "center",
        marginHorizontal: "16@ms0.3"
    },
    appleContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        borderWidth: "2@ms0.3",
        borderColor: Colors.white,
        marginRight: "8@ms0.3",
        borderRadius: "16@ms0.3",
        paddingVertical: "10@ms0.3",
        alignItems: "center"
    },
    payContainer: {
        flexDirection: "row",
        marginTop: "13@ms0.3",
    },
    line: {
        flex: 1,
        backgroundColor: Colors.white,
        height: "1@ms0.3",
    },
    payusingContainer: {
        flexDirection: "row",
        paddingVertical: "20@ms0.3",
        alignItems: "center"
    },
    googleContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        borderWidth: "2@ms0.3",
        borderColor: Colors.white,
        marginLeft: "8@ms0.3",
        borderRadius: "16@ms0.3",
        paddingVertical: "10@ms0.3",
        alignItems: "center"
    },
    payIcon: {
        height: "35@ms0.3",
        width: "75@ms0.3"
    },
    uncheckBox: {
        height: "18@ms0.3",
        width: "18@ms0.3",
        borderWidth: "1@ms0.3",
        borderColor: Colors.white,
        borderRadius: "18@ms0.3",
        marginHorizontal: "15@ms0.3"
    },
    checkBox: {
        height: "18@ms0.3",
        width: "18@ms0.3",
        marginHorizontal: "15@ms0.3"
    },
    payListContainer: {
        backgroundColor: Colors.mediumBlue,
        paddingVertical: "17@ms0.3",
        marginLeft: "8@ms0.3",
        borderRadius: "16@ms0.3",
        borderWidth: "2@ms0.3",
        flexDirection: "row"
    },
    payTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "400",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        lineHeight: "21@ms0.3",
        paddingRight: 24
    },
    cardInformationTxt: {
        fontSize: "24@ms0.3",
        fontWeight: "500",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        lineHeight: "32@ms0.3",
        marginTop: "24@ms0.3",
        fontStyle: "italic"
    },
    paymentList: {
        height: "56@ms0.3",
    },
    cvvContainer: {
        flex: 1,
        marginLeft: "4@ms0.3",
    },
    expiryContainer: {
        flex: 1,
        marginRight: "4@ms0.3",
    },
    saveCardContainer: {
        flex: 1,
        paddingVertical: "14@ms0.3",
        flexDirection: "row",
        marginLeft: "1@ms0.3",
        // borderRadius: "16@ms0.3",
        // borderWidth: "2@ms0.3",
    },
    saveCardTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "400",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        lineHeight: "21@ms0.3",
    },
    btnContainer: {
        // marginTop: "40@ms0.3"
        marginBottom: "40@ms0.3"
    },
    customInputStyle: {
        fontSize: "16@ms0.3",
    },
    ContactTextInputContainer: {
        marginTop: "10@ms0.3",
    }
});
