import { Colors } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    loginTxt: {
        fontSize: "21@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    innerContainer: {
        marginHorizontal: '16@ms0.3',
        flex: 1,
    },
    signupTxt: {
        fontSize: "13@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.greenText,
        marginVertical: "5@ms0.3",
    },
    forgotTxt: {
        fontSize: "14@ms0.3",
        fontWeight: "600",
        textAlign: "center",
        color: Colors.white,
        marginVertical: "30@ms0.3",
    },
    saveBtnContainer: {
        marginTop: "40@ms0.3",
        height: '53@ms0.3',
        marginHorizontal: '0@ms0.3',
    },
    cancelBtnContainer: {
        marginTop: "16@ms0.3",
        backgroundColor: Colors.transparent,
        borderColor: Colors.darkOrange,
        borderWidth: "2@ms0.3",
        height: '53@ms0.3',
        marginHorizontal: '0@ms0.3',
    },
    btnTxt: {
        color: Colors.darkOrange,
        fontSize: '14@ms0.3',
    },
    accountTxt: {
        fontSize: "14@ms0.3",
        textAlign: "center",
        color: Colors.white,
        marginVertical: "30@ms0.3",
    },
    btnContainerTxt: {
        fontSize: '14@ms0.3',
    },
});
