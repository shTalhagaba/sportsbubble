import { Colors } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.appColorBackground
        backgroundColor: Colors.backBlack

    },
    loginTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
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
    accountTxt: {
        fontSize: "14@ms0.3",
        textAlign: "center",
        color: Colors.white,
        marginVertical: "30@ms0.3",
    }
});
