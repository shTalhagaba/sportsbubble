import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    loginTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    leftArrowIcon: {
        width: "45@ms0.3",
        height: "45@ms0.3",
        resizeMode: "cover",
    },
    powerImage: {
        width: "165@ms0.3",
        height: "75@ms0.3",
        resizeMode: "cover",
        tintColor: Colors.white
    },
    versionTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    logoutTxt: {
        fontSize: "18@ms0.3",
        fontWeight: "500",
        color: Colors.darkOrange,
        fontFamily: Fonts.Regular,
        marginStart: "16@ms0.3",
    },
    sbContainer: {
        height: '25%',
        alignItems: 'center'
    },
    mainTabContainer: {
        marginHorizontal: "20@ms0.3",
        flex: 1,
    },
    logoutIcon: {
        height: "9@ms0.3",
        width: "16@ms0.3",
    },
    innerContainer: {
        marginTop: "24@ms0.3",
    }
});
