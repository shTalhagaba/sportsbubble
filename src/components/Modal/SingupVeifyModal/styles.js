import { Colors, Fonts } from "src/utils";
import { ScaledSheet } from "react-native-size-matters";


const styles = ScaledSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.darkBlue,
        opacity: 0.9
    },
    checkBoxContainer: {
        backgroundColor: "black",
        width: "80%",
        alignSelf: "center",
        marginTop: "120@ms0.3",
        borderWidth: "1@ms0.3",
        borderColor: Colors.white,
        borderRadius: "16@ms0.3",
    },
    verifyTxt: {
        fontSize: "24@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: "50@ms0.3",
        paddingHorizontal: "20@ms0.3",
        lineHeight: "33@ms0.3",
    },
});
export default styles;
