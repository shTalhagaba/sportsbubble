import { Colors, Fonts } from "src/utils";
import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkBlue90,
    },
    mainView: {
        flex: 1,
    },
    checkBoxContainer: {
        backgroundColor: Colors.backBlack,
        width: "80%",
        alignSelf: "center",
        marginTop: "160@ms0.3",
        borderWidth: "1@ms0.3",
        borderColor: Colors.white,
        borderRadius: "16@ms0.3",
    },
    headerTxt: {
        fontSize: "22@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "800",
        textAlign: "center",
        paddingHorizontal: "20@ms0.3",
        marginTop: "24@ms0.3",
        lineHeight: "30@ms0.3",
    },
    desTxt: {
        fontSize: "20@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "500",
        textAlign: "center",
        marginTop: "15@ms0.3",
        paddingHorizontal: "20@ms0.3",
        lineHeight: "28@ms0.3",
    },
    blackBtnContainer: {
        flex: 1,
        backgroundColor: Colors.backBlack,
        borderWidth: "2@ms0.3",
        borderColor: Colors.white
    },
    orangeBtnContainer: {
        flex: 1,
        backgroundColor: Colors.backBlack,
        borderWidth: "2@ms0.3",
        borderColor: Colors.darkOrange
    },
    blackBtnContainer2: {
        backgroundColor: Colors.backBlack,
        borderWidth: "2@ms0.3",
        borderColor: Colors.white,
        height: "53@ms0.3",
    },
    buttonStyle: {
        height: "53@ms0.3",
    },
    buttonTxt: {
        fontSize: "14@ms0.3",
    },
    rowBtn: {
        flexDirection: "row",
        marginHorizontal: "10@ms0.3",
        paddingBottom: "30@ms0.3",
    },
    columnBtn: {
        marginHorizontal: "15@ms0.3",
        paddingBottom: "30@ms0.3",
    },
    orangeTxt: {
        color: Colors.darkOrange
    }
});
export default styles;
