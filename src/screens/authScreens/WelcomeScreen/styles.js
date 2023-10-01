import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.darkBlue,
        opacity: 0.9
    },
    welcomeTxt: {
        fontSize: "24@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "500",
        marginTop: "60@ms0.3",
        textAlign: "center"
    },
    liveSportTxt: {
        fontSize: "22@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "800",
        marginTop: "60@ms0.3",
        textAlign: "center",
        fontStyle: "italic"
    },
    liveSportDesTxt: {
        fontSize: "22@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "500",
        marginTop: "30@ms0.3",
        marginHorizontal: 10,
        textAlign: "center",
        lineHeight: "30@ms0.3"
    },
    guestTxt: {
        fontSize: "16@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "800",
        marginHorizontal: 10,
        lineHeight: "30@ms0.3",
        fontStyle: 'italic'
    },
    logoImage: {
        height: "56@ms0.3",
        width: "284@ms0.3",
        marginTop: "13@ms0.3",
        alignSelf: "center"
    },
    guestContainer: {
        flexDirection: "row",
        marginTop: "30@ms0.3",
        justifyContent: "center",
        alignItems: "center"
    },
    rightArrowImage: {
        width: "16@ms0.3",
        height: "9@ms0.3",
        tintColor: Colors.white
    },
    btnContainer: {
        marginHorizontal: "20@ms0.3"
    },
    freeBtnContainer: {
        marginTop: "70@ms0.3"
    },
    loginBtnContainer: {
        marginTop: "24@ms0.3"
    },
});
