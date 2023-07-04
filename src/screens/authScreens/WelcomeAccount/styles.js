import { Colors } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    innerContainer: {
        marginHorizontal: "20@ms0.3"
    },
    welcomeTxt: {
        fontSize: "22@ms0.3",
        fontWeight: "800",
        textAlign: "center",
        color: Colors.white
    },
    accountTxt: {
        fontSize: "24@ms0.3",
        fontWeight: "500",
        textAlign: "center",
        color: Colors.white,
        marginTop: "25@ms0.3",
        letterSpacing: "0.5@ms0.3",
        fontStyle: "italic"
    },
    sideTxt: {
        fontSize: "14@ms0.3",
        color: Colors.white,
        marginTop: "5@ms0.3",
        lineHeight: "20@ms0.3",
    },
    btnContainer: {
        marginTop: "55@ms0.3",
    },
});
