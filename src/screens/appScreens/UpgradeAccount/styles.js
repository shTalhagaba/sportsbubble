import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    innerContainer: {
        marginTop: "10@ms0.3"
    },
    upgradeTxt: {
        fontSize: "24@ms0.3",
        fontWeight: "900",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        maxWidth: "80%",
        alignSelf: "center",
        lineHeight: "33@ms0.3"
    },
    choosePlanTxt: {
        fontSize: "24@ms0.3",
        fontWeight: "400",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        lineHeight: "32@ms0.3",
        fontStyle: "italic"
    },
    priceTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "400",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        lineHeight: "21@ms0.3",
    },
    filterContainer: {
        backgroundColor: Colors.mediumBlue,
        marginVertical: "30@ms0.3",
        flexDirection: "row",
        paddingVertical: "30@ms0.3",
        justifyContent: "center",
    },
    filterImage: {
        height: "22@ms0.3",
        width: "24@ms0.3",
        marginTop: "5@ms0.3",
    },
    filterTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "400",
        color: Colors.white80,
        fontFamily: Fonts.Regular,
        alignSelf: "center",
        maxWidth: "70%",
        lineHeight: "28@ms0.3",
        marginStart: "16@ms0.3",
        fontStyle: "italic",
        marginTop: "-5@ms0.3"
    },
    planContainer: {
        flexDirection: "row",
        marginHorizontal: "20@ms0.3",
        marginTop: "16@ms0.3"
    },
    planInnerLeftContainer: {
        flex: 1,
        backgroundColor: Colors.mediumBlue,
        paddingVertical: "17@ms0.3",
        flexDirection: "row",
        marginRight: "8@ms0.3",
        borderRadius: "16@ms0.3",
        borderWidth: "2@ms0.3",
    },
    planInnerRightContainer: {
        flex: 1,
        backgroundColor: Colors.mediumBlue,
        paddingVertical: "17@ms0.3",
        flexDirection: "row",
        marginLeft: "8@ms0.3",
        borderRadius: "16@ms0.3",
        borderWidth: "2@ms0.3",
    },
    smsContainer: {
        flex: 1,
        paddingVertical: "17@ms0.3",
        flexDirection: "row",
        marginLeft: "8@ms0.3",
        borderRadius: "16@ms0.3",
        borderWidth: "2@ms0.3",
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
    btnContainer: {
        marginHorizontal: "20@ms0.3",
        marginTop: "40@ms0.3"
    },
    blackBtnContainer: {
        borderColor: Colors.white,
        borderWidth: "1@ms0.3",
        backgroundColor: Colors.backBlack,
        marginTop: "16@ms0.3",
        marginBottom: "20@ms0.3"
    },
});
